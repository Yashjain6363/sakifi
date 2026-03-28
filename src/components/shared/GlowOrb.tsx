"use client";

import { cn } from "@/lib/utils";

interface GlowOrbProps {
  color?: "rose" | "violet" | "gold" | "emerald" | "amber" | "pink";
  size?: "sm" | "md" | "lg" | "xl";
  intensity?: "low" | "medium" | "high";
  className?: string;
}

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-72 h-72",
  xl: "w-96 h-96",
};

const colorMap = {
  rose: "bg-glow-rose",
  violet: "bg-glow-violet",
  gold: "bg-glow-gold",
  emerald: "bg-glow-emerald",
  amber: "bg-glow-amber",
  pink: "bg-glow-pink",
};

const intensityMap = {
  low: "opacity-30",
  medium: "opacity-50",
  high: "opacity-70",
};

export function GlowOrb({
  color = "rose",
  size = "md",
  intensity = "low",
  className,
}: GlowOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none select-none animate-glow-pulse",
        sizeMap[size],
        colorMap[color],
        intensityMap[intensity],
        className
      )}
      aria-hidden="true"
    />
  );
}
