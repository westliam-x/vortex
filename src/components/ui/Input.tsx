"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
  const borderClass = error ? "border-[var(--danger)]" : "border-[var(--border)]";
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] disabled:opacity-50",
        borderClass,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
