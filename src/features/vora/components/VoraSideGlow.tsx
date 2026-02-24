"use client";

import { cn } from "@/lib";

type VoraSideGlowProps = {
  active: boolean;
};

const leftGlowStyle = {
  background:
    "linear-gradient(to right, color-mix(in oklab, var(--blue) 20%, transparent), transparent)",
};

const rightGlowStyle = {
  background:
    "linear-gradient(to left, color-mix(in oklab, var(--mint) 20%, transparent), transparent)",
};

export default function VoraSideGlow({ active }: VoraSideGlowProps) {
  return (
    <>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-y-0 left-0 z-30 w-28 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
        style={leftGlowStyle}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-y-0 right-0 z-30 w-28 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
        style={rightGlowStyle}
      />
    </>
  );
}

export type { VoraSideGlowProps };
