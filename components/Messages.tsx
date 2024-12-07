"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();

  const getRoleName = (role: string) => {
    if (role === "assistant") return "Dr. Ly's AI";
    if (role === "user") return "Patient";
    return role;
  };

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
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "bg-card shadow-sm",
                    "border border-blue-100 rounded-2xl",
                    msg.type === "user_message" 
                      ? "ml-auto bg-blue-50" 
                      : "bg-white"
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
                  <div
                    className={cn(
                      "text-sm font-medium leading-none pt-4 px-4",
                      msg.type === "user_message" 
                        ? "text-blue-700" 
                        : "text-blue-600"
                    )}
                  >
                    {getRoleName(msg.message.role)}
                  </div>
                  <div className={"pb-3 px-4 mt-2 text-gray-700"}>
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
