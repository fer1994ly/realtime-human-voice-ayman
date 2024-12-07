"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";
import { UserCircle2, Stethoscope } from "lucide-react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();

  return (
    <motion.div
      layoutScroll
      className={"grow rounded-md overflow-auto p-4"}
      ref={ref}
    >
      <motion.div
        className={"max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24"}
      >
        <AnimatePresence mode={"popLayout"}>
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              const isUser = msg.type === "user_message";
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[85%] md:w-[80%]",
                    "flex gap-3",
                    isUser ? "ml-auto flex-row-reverse" : ""
                  )}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  <div className="flex-shrink-0 mt-1">
                    {isUser ? (
                      <UserCircle2 className="w-8 h-8 text-primary/60" />
                    ) : (
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex-1 bg-card border rounded-2xl shadow-sm",
                      isUser ? "border-primary/20" : "border-primary/10",
                      "overflow-hidden"
                    )}
                  >
                    <div
                      className={cn(
                        "text-xs font-medium leading-none pt-3 px-4",
                        isUser ? "text-primary/60" : "text-primary/50"
                      )}
                    >
                      {isUser ? "Patient" : "Dr. Ly's Assistant"}
                    </div>
                    <div className={"py-2 px-4 text-foreground/90"}>
                      {msg.message.content}
                    </div>
                    <div className="px-4 pb-2">
                      <Expressions values={{ ...msg.models.prosody?.scores }} />
                    </div>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;
