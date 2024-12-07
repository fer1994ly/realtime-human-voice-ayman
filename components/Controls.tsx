"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Heart } from "lucide-react";
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
    <AnimatePresence mode={"wait"}>
      <motion.div
        className={cn(
          "fixed bottom-0 left-0 right-0",
          "flex items-center justify-center",
          "p-4 pb-8 bg-gradient-to-t from-white to-transparent dark:from-gray-900"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div
          className={cn(
            "flex items-center gap-4",
            "p-4 rounded-2xl",
            "bg-white dark:bg-gray-800",
            "shadow-lg shadow-teal-500/10",
            "border border-teal-100 dark:border-teal-900"
          )}
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
            className="bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/50 dark:hover:bg-teal-900"
          >
            {isMuted ? (
              <MicOff className={"size-4 text-teal-600 dark:text-teal-400"} />
            ) : (
              <Mic className={"size-4 text-teal-600 dark:text-teal-400"} />
            )}
          </Toggle>

          <div className={"relative grid h-8 w-48 shrink grow-0"}>
            <MicFFT fft={micFft} className={"fill-teal-500/20"} />
          </div>

          <Button
            className={cn(
              "flex items-center gap-2 px-6 py-3 text-base font-semibold",
              "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600",
              "text-white",
              "transform transition-all duration-200",
              "shadow-lg hover:shadow-xl active:shadow-md",
              "scale-100 hover:scale-105 active:scale-95",
              "rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
            onClick={handleEndCall}
            disabled={isEnding}
          >
            <span className="relative">
              <Heart
                className={"size-5 transition-transform group-active:scale-90"}
                strokeWidth={2.5}
                stroke={"currentColor"}
              />
            </span>
            <span className="relative inline-block">
              {isEnding ? "Ending..." : "End Consultation"}
            </span>
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
