import React, { createContext, useContext, useCallback, useState } from 'react';

type VoiceContextType = {
  status: {
    value: 'disconnected' | 'connecting' | 'connected';
  };
  connect: () => Promise<void>;
  disconnect: () => void;
  sendAudio: (audioData: Float32Array) => Promise<void>;
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

  const connect = useCallback(async () => {
    try {
      setStatus({ value: 'connecting' });
      setStatus({ value: 'connected' });
    } catch (error) {
      console.error('Connection error:', error);
      setStatus({ value: 'disconnected' });
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [onError]);

  const disconnect = useCallback(() => {
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
      
      writeString(0, 'RIFF');
      view.setUint32(4, 32 + audioData.length * 2, true);
      writeString(8, 'WAVE');
      writeString(12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, 16000, true);
      view.setUint32(28, 32000, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
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
        onMessage?.(result.text.trim());
      }
    } catch (error) {
      console.error('Error sending audio:', error);
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [status.value, auth.value, onMessage, onError]);

  return (
    <VoiceContext.Provider value={{ status, connect, disconnect, sendAudio }}>
      {children}
    </VoiceContext.Provider>
  );
} 