"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    const borderClass = error ? "border-[var(--danger)]" : "border-[var(--border)]";
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-lg border bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] disabled:opacity-50",
          borderClass,
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
