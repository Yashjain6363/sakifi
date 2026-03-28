"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Fade edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-DEFAULT via-transparent to-obsidian-DEFAULT" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian-DEFAULT via-transparent to-obsidian-DEFAULT" />
    </div>
  );
}
