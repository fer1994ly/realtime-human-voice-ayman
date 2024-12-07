"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useEffect } from "react";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  // optional: use configId from environment variable
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  // Cleanup function for media streams
  useEffect(() => {
    // Resume audio context if it was suspended
    const resumeAudioContext = async () => {
      if (window.activeAudioContext?.state === 'suspended') {
        await window.activeAudioContext.resume();
      }
    };

    window.addEventListener('click', resumeAudioContext);
    window.addEventListener('touchstart', resumeAudioContext);

    return () => {
      window.removeEventListener('click', resumeAudioContext);
      window.removeEventListener('touchstart', resumeAudioContext);

      // Cleanup streams and audio context
      if (window.activeStream) {
        window.activeStream.getTracks().forEach(track => track.stop());
        window.activeStream = null;
      }
      if (window.activeAudioContext) {
        window.activeAudioContext.close();
        window.activeAudioContext = null;
      }
    };
  }, []);

  return (
    <div
      className={
        "relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]"
      }
    >
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
        onError={(error) => {
          console.error("Voice provider error:", error);
          // Stop the media stream if there's an error
          if (window.activeStream) {
            window.activeStream.getTracks().forEach(track => track.stop());
            window.activeStream = null;
          }
          if (window.activeAudioContext) {
            window.activeAudioContext.close();
            window.activeAudioContext = null;
          }
        }}
      >
        <Messages ref={ref} />
        <Controls />
        <StartCall />
      </VoiceProvider>
    </div>
  );
}
