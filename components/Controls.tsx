"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone, Heart, Stethoscope } from "lucide-react";
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
      
      if (window.activeStream) {
        window.activeStream.getTracks().forEach(track => track.stop());
      }
      
      if (window.activeAudioContext) {
        await window.activeAudioContext.close();
      }

      window.location.replace(window.location.href);
      setTimeout(() => {
        window.location.reload(true);
      }, 100);
    } catch (error) {
      console.error('Error ending consultation:', error);
      window.location.reload(true);
    }
  }, [disconnect]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full md:p-6 p-4 flex items-center justify-center",
        "bg-gradient-to-t from-background via-background/90 to-transparent"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className={cn(
              "p-4 md:p-6 bg-card border border-primary/20 rounded-2xl shadow-lg",
              "flex flex-col md:flex-row items-center gap-4 md:gap-6",
              "max-w-3xl w-full mx-auto"
            )}
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Toggle
                pressed={!isMuted}
                onPressedChange={() => {
                  if (isMuted) {
                    unmute();
                  } else {
                    mute();
                  }
                }}
                className={cn(
                  "h-12 w-12 md:h-14 md:w-14 rounded-xl",
                  "bg-primary/5 hover:bg-primary/10 data-[state=on]:bg-primary/10",
                  "border-2 border-primary/20",
                  "transition-all duration-200"
                )}
              >
                {isMuted ? (
                  <MicOff className="size-5 md:size-6 text-primary" />
                ) : (
                  <Mic className="size-5 md:size-6 text-primary" />
                )}
              </Toggle>

              <div className="flex-1 md:w-48">
                <div className="text-sm text-primary font-medium mb-1">Voice Activity</div>
                <div className="relative h-8 w-full">
                  <MicFFT fft={micFft} className="fill-primary/40" />
                </div>
              </div>
            </div>

            <Button
              className={cn(
                "flex items-center gap-3 px-6 py-4 w-full md:w-auto",
                "text-base md:text-lg font-medium",
                "bg-destructive/10 hover:bg-destructive/20 text-destructive",
                "border-2 border-destructive/20",
                "transform transition-all duration-200",
                "rounded-xl md:rounded-2xl",
                "focus:outline-none focus:ring-2 focus:ring-destructive/40 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={handleEndCall}
              disabled={isEnding}
            >
              <Stethoscope 
                className={cn(
                  "size-5 md:size-6",
                  "animate-pulse text-destructive"
                )}
              />
              <span className="relative inline-block">
                {isEnding ? "Ending Consultation..." : "End Medical Consultation"}
              </span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
