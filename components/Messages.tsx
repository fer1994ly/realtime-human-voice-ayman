"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef, useEffect } from "react";
import { User, Bot } from "lucide-react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();

  useEffect(() => {
    messages.forEach(msg => {
      if (msg.type === "user_message") {
        console.log("User:", msg.message.content);
      } else if (msg.type === "assistant_message") {
        console.log("AI Assistant:", msg.message.content);
      }
    });
  }, [messages]);

  return (
    <motion.div
      layoutScroll
      className={"grow overflow-auto p-4 bg-white h-[calc(100vh-200px)]"}
      ref={ref}
    >
      <motion.div
        className={"max-w-2xl mx-auto w-full flex flex-col gap-4"}
      >
        <AnimatePresence mode={"popLayout"}>
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "p-4",
                    "border rounded-2xl",
                    "shadow-md",
                    msg.type === "user_message" 
                      ? "ml-auto bg-teal-50 border-teal-200" 
                      : "bg-blue-50 border-blue-200"
                  )}
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                    scale: 0.95,
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {msg.type === "user_message" ? (
                      <User className="h-5 w-5 text-teal-600" />
                    ) : (
                      <Bot className="h-5 w-5 text-blue-600" />
                    )}
                    <div
                      className={cn(
                        "text-base font-medium",
                        msg.type === "user_message" 
                          ? "text-teal-800" 
                          : "text-blue-800"
                      )}
                    >
                      {msg.type === "user_message" ? "You" : "24-Hour Health Assistant"}
                    </div>
                  </div>
                  <div className={cn(
                    "text-gray-800 leading-relaxed text-base mb-3",
                    "prose prose-sm max-w-none"
                  )}>
                    {msg.message.content}
                  </div>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <Expressions values={{ ...msg.models.prosody?.scores }} />
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
