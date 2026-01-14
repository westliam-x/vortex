"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]",
      className
    )}
    {...props}
  />
);

export default Card;
