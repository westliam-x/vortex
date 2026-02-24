"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib";

type BadgeTone = "default" | "success" | "warning" | "error" | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  variant?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  default: "border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)]",
  success: "border-transparent bg-[var(--success)] text-[var(--on-accent)]",
  warning: "border-transparent bg-[var(--warning)] text-[var(--on-accent)]",
  error: "border-transparent bg-[var(--danger)] text-[var(--text)]",
  info: "border-transparent bg-[var(--blue)] text-[var(--text)]",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, variant, ...props }, ref) => {
    const selectedTone = variant ?? tone ?? "default";
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
          toneClasses[selectedTone],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
