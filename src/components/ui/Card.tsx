"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-[var(--text)]",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

export default Card;
