import { useVoice } from "./VoiceProvider";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";

export default function StartCall() {
  const { status, connect, disconnect, sendAudio } = useVoice();
  const [error, setError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioChunksRef = useRef<Float32Array[]>([]);

  const initializeAudio = async (stream: MediaStream) => {
    try {
      // Create AudioContext
      const audioContext = new AudioContext({
        sampleRate: 16000, // Required for Whisper
        latencyHint: 'interactive'
      });
      audioContextRef.current = audioContext;
      window.activeAudioContext = audioContext;

      // Create source from stream
      const source = audioContext.createMediaStreamSource(stream);

      // Create ScriptProcessor for audio processing
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      processor.onaudioprocess = async (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        audioChunksRef.current.push(new Float32Array(inputData));
        
        // When we have enough data (about 1 second), send it
        if (audioChunksRef.current.length >= Math.ceil(audioContext.sampleRate / 4096)) {
          // Concatenate chunks
          const totalLength = audioChunksRef.current.reduce((acc, chunk) => acc + chunk.length, 0);
          const concatenated = new Float32Array(totalLength);
          let offset = 0;
          
          audioChunksRef.current.forEach(chunk => {
            concatenated.set(chunk, offset);
            offset += chunk.length;
          });
          
          // Send to Hugging Face
          try {
            await sendAudio(concatenated);
          } catch (err) {
            console.error('Error sending audio:', err);
          }
          
          // Clear chunks
          audioChunksRef.current = [];
        }
      };

      // Connect the nodes
      source.connect(processor);
      processor.connect(audioContext.destination);

      return audioContext;
    } catch (err) {
      console.error('Audio initialization error:', err);
      throw err;
    }
  };

  const handleConnect = useCallback(async () => {
    try {
      setError(null);
      
      // Request microphone permission first
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000 // Required for Whisper
        } 
      });
      
      // Initialize audio processing
      await initializeAudio(stream);
      
      // Connect
      await connect();
      
      // Keep the stream active
      window.activeStream = stream;
    } catch (err) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
      
      // Clean up any existing stream and audio context
      if (window.activeStream) {
        window.activeStream.getTracks().forEach(track => track.stop());
        window.activeStream = null;
      }
      if (audioContextRef.current) {
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
      }
    }
  }, [connect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
      audioChunksRef.current = [];
    };
  }, [disconnect]);

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={"fixed inset-0 p-4 flex flex-col items-center justify-center bg-background"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              className="flex flex-col items-center gap-4"
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className={"z-50 flex items-center gap-1.5"}
                onClick={handleConnect}
                disabled={status.value === "connecting"}
              >
                <span>
                  <Phone
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span>
                  {status.value === "connecting" ? "Connecting..." : "Start Call"}
                </span>
              </Button>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}
              
              {status.value === "connecting" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-center"
                >
                  Please allow microphone access when prompted
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
