import React, { createContext, useContext, useCallback, useState, useRef } from 'react';

type Message = {
  type: 'user_message' | 'assistant_message';
  message: {
    role: string;
    content: string;
  };
  models: {
    prosody?: {
      scores: Record<string, number>;
    };
  };
};

type VoiceContextType = {
  status: {
    value: 'disconnected' | 'connecting' | 'connected';
  };
  connect: () => Promise<void>;
  disconnect: () => void;
  sendAudio: (audioData: Float32Array) => Promise<void>;
  isMuted: boolean;
  mute: () => void;
  unmute: () => void;
  micFft: number[];
  messages: Message[];
};

const VoiceContext = createContext<VoiceContextType | null>(null);

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

type VoiceProviderProps = {
  children: React.ReactNode;
  auth: {
    type: 'accessToken';
    value: string;
  };
  onMessage?: (message: string) => void;
  onError?: (error: Error) => void;
};

export function VoiceProvider({ children, auth, onMessage, onError }: VoiceProviderProps) {
  const [status, setStatus] = useState<VoiceContextType['status']>({ value: 'disconnected' });
  const [isMuted, setIsMuted] = useState(false);
  const [micFft, setMicFft] = useState<number[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const connect = useCallback(async () => {
    try {
      setStatus({ value: 'connecting' });

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000
        } 
      });

      // Create and configure AudioContext
      const audioContext = new AudioContext({
        sampleRate: 16000,
        latencyHint: 'interactive'
      });
      window.activeAudioContext = audioContext;

      // Create audio source from stream
      const source = audioContext.createMediaStreamSource(stream);

      // Create analyser for FFT
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.5;
      analyserRef.current = analyser;

      // Create processor node
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      // Connect nodes
      source.connect(analyser);
      analyser.connect(processor);
      processor.connect(audioContext.destination);

      // Set up FFT visualization
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateFFT = () => {
        if (status.value === 'connected') {
          analyser.getByteFrequencyData(dataArray);
          const fftData = Array.from(dataArray).map(val => val / 255);
          setMicFft(fftData);
          requestAnimationFrame(updateFFT);
        }
      };
      updateFFT();

      // Store stream for later cleanup
      window.activeStream = stream;
      
      setStatus({ value: 'connected' });
    } catch (error) {
      console.error('Connection error:', error);
      setStatus({ value: 'disconnected' });
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [onError]);

  const disconnect = useCallback(() => {
    // Stop FFT visualization
    setMicFft([]);

    // Cleanup audio nodes
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    // Cleanup stream and context
    if (window.activeStream) {
      window.activeStream.getTracks().forEach(track => track.stop());
      window.activeStream = null;
    }
    if (window.activeAudioContext) {
      window.activeAudioContext.close();
      window.activeAudioContext = null;
    }

    setStatus({ value: 'disconnected' });
  }, []);

  const mute = useCallback(() => {
    setIsMuted(true);
    if (window.activeStream) {
      window.activeStream.getAudioTracks().forEach(track => {
        track.enabled = false;
      });
    }
  }, []);

  const unmute = useCallback(() => {
    setIsMuted(false);
    if (window.activeStream) {
      window.activeStream.getAudioTracks().forEach(track => {
        track.enabled = true;
      });
    }
  }, []);

  const sendAudio = useCallback(async (audioData: Float32Array) => {
    if (status.value !== 'connected') {
      throw new Error('Not connected');
    }

    try {
      // Convert audio data to WAV format with proper headers
      const wavBuffer = new ArrayBuffer(44 + audioData.length * 2);
      const view = new DataView(wavBuffer);
      
      // WAV header
      const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      };
      
      const numChannels = 1;
      const sampleRate = 16000;
      const bytesPerSample = 2;
      
      writeString(0, 'RIFF');
      view.setUint32(4, 32 + audioData.length * 2, true);
      writeString(8, 'WAVE');
      writeString(12, 'fmt ');
      view.setUint32(16, 16, true);                                    // Subchunk1Size
      view.setUint16(20, 1, true);                                     // AudioFormat (PCM)
      view.setUint16(22, numChannels, true);                          // NumChannels
      view.setUint32(24, sampleRate, true);                           // SampleRate
      view.setUint32(28, sampleRate * numChannels * bytesPerSample, true); // ByteRate
      view.setUint16(32, numChannels * bytesPerSample, true);         // BlockAlign
      view.setUint16(34, bytesPerSample * 8, true);                   // BitsPerSample
      writeString(36, 'data');
      view.setUint32(40, audioData.length * 2, true);
      
      // Convert audio data to 16-bit PCM
      const offset = 44;
      for (let i = 0; i < audioData.length; i++) {
        const s = Math.max(-1, Math.min(1, audioData[i]));
        view.setInt16(offset + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }

      // Create form data with WAV file
      const formData = new FormData();
      formData.append('audio', new Blob([wavBuffer], { type: 'audio/wav' }), 'audio.wav');

      // Send to Hugging Face endpoint
      const response = await fetch('https://api-inference.huggingface.co/models/openai/whisper-large-v3', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.value}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.text && result.text.trim()) {
        setMessages(prev => [...prev, {
          type: 'user_message',
          message: {
            role: 'user',
            content: result.text.trim()
          },
          models: {
            prosody: {
              scores: {} // You would get this from your prosody analysis
            }
          }
        }]);
        onMessage?.(result.text.trim());
      }

    } catch (error) {
      console.error('Error sending audio:', error);
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [status.value, auth.value, onMessage, onError]);

  return (
    <VoiceContext.Provider value={{ 
      status, 
      connect, 
      disconnect, 
      sendAudio,
      isMuted,
      mute,
      unmute,
      micFft,
      messages
    }}>
      {children}
    </VoiceContext.Provider>
  );
} 