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
      className={"grow rounded-md overflow-auto p-4 bg-gradient-to-br from-teal-50/50 to-blue-50/50"}
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
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "p-4 backdrop-blur-sm",
                    "border rounded-2xl shadow-sm",
                    msg.type === "user_message" 
                      ? "ml-auto bg-white/80 border-teal-100" 
                      : "bg-blue-50/80 border-blue-100"
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
                  <div className="flex items-center gap-2 mb-2">
                    {msg.type === "user_message" ? (
                      <User className="h-5 w-5 text-teal-500" />
                    ) : (
                      <Bot className="h-5 w-5 text-blue-500" />
                    )}
                    <div
                      className={cn(
                        "text-sm font-medium",
                        msg.type === "user_message" 
                          ? "text-teal-700" 
                          : "text-blue-700"
                      )}
                    >
                      {msg.type === "user_message" ? "You" : "Health AI"}
                    </div>
                  </div>
                  <div className={cn(
                    "text-gray-700 leading-relaxed",
                    "prose prose-sm max-w-none"
                  )}>
                    {msg.message.content}
                  </div>
                  <Expressions values={{ ...msg.models.prosody?.scores }} />
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
