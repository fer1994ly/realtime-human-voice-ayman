"use client";

import { useLayoutEffect, useState } from "react";
import HealthAILogo from "./logos/Hume";
import { Button } from "./ui/button";
import { Moon, Sun, Heart } from "lucide-react";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={
        "px-6 py-3 flex items-center h-16 z-50 bg-gradient-to-r from-teal-50 to-blue-50 border-b border-teal-100 shadow-sm"
      }
    >
      <div className="flex items-center gap-2">
        <HealthAILogo className={"h-8 w-auto"} />
        <Heart className="h-5 w-5 text-teal-500 animate-pulse" />
      </div>
      <div className={"ml-auto flex items-center gap-3"}>
        <Button
          onClick={toggleDark}
          variant={"outline"}
          className={"flex items-center gap-2 border-teal-200 hover:border-teal-300 hover:bg-teal-50"}
        >
          <span>
            {isDarkMode ? (
              <Sun className={"size-4 text-amber-500"} />
            ) : (
              <Moon className={"size-4 text-blue-500"} />
            )}
          </span>
          <span className="text-gray-700">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </Button>
      </div>
    </div>
  );
};
