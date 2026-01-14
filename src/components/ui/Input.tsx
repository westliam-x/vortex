"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
