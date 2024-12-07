"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const [isEnding, setIsEnding] = useState(false);
  const router = useRouter();

  const handleEndCall = useCallback(async () => {
    try {
      setIsEnding(true);
      await disconnect();
      
      // Clean up any active media streams
      if (window.activeStream) {
        window.activeStream.getTracks().forEach(track => track.stop());
      }
      
      // Clean up audio context
      if (window.activeAudioContext) {
        await window.activeAudioContext.close();
      }

      // Force a hard refresh of the page
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Error ending call:', error);
    }
  }, [disconnect]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center",
        "bg-gradient-to-t from-card via-card/90 to-card/0",
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
            }
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className={"size-4"} />
              ) : (
                <Mic className={"size-4"} />
              )}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-current"} />
            </div>

            <Button
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-base font-semibold",
                "bg-red-600 hover:bg-red-700 active:bg-red-800",
                "text-white",
                "transform transition-all duration-200",
                "shadow-lg hover:shadow-xl active:shadow-md",
                "scale-100 hover:scale-105 active:scale-95",
                "rounded-xl",
                "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600 disabled:hover:scale-100"
              )}
              onClick={handleEndCall}
              disabled={isEnding}
            >
              <span className="relative">
                <Phone
                  className={"size-5 transition-transform group-active:scale-90"}
                  strokeWidth={2.5}
                  stroke={"currentColor"}
                />
              </span>
              <span className="relative inline-block">
                {isEnding ? "Ending..." : "End Consultation"}
              </span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
