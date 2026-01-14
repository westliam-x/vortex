"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "success" | "warning" | "error" | "info";
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-[var(--surface-2)] text-[var(--text-subtle)]",
  success: "bg-[rgba(34,197,94,0.18)] text-[var(--success)]",
  warning: "bg-[rgba(245,158,11,0.18)] text-[var(--warning)]",
  error: "bg-[rgba(239,68,68,0.18)] text-[var(--error)]",
  info: "bg-[rgba(96,165,250,0.18)] text-[var(--info)]",
};

const Badge = ({ className, tone = "default", ...props }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      toneClasses[tone],
      className
    )}
    {...props}
  />
);

export default Badge;
