"use client";

import { cn } from "@/utils";

type EmotionScore = {
  label: string;
  score: number;
};

export default function Expressions({
  values = {},
}: {
  values?: Record<string, number>;
}) {
  // Filter out low scores and sort by score
  const significantEmotions = Object.entries(values)
    .filter(([_, score]) => score > 0.1)
    .sort(([_, a], [_, b]) => b - a)
    .slice(0, 3)
    .map(([label, score]) => ({
      label,
      score,
    }));

  if (significantEmotions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 px-3 pb-3">
      {significantEmotions.map(({ label, score }) => (
        <div
          key={label}
          className={cn(
            "px-2 py-0.5 text-xs rounded-full",
            "bg-primary/10 text-primary-foreground/50"
          )}
        >
          {label} ({Math.round(score * 100)}%)
        </div>
      ))}
    </div>
  );
}
