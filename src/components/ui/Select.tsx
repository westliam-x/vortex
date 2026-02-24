"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, error, ...props }, ref) => {
  const borderClass = error ? "border-[var(--danger)]" : "border-[var(--border)]";
  return (
    <select
      ref={ref}
      className={cn(
        "w-full rounded-lg border bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] disabled:opacity-50",
        borderClass,
        className
      )}
      {...props}
    />
  );
});

Select.displayName = "Select";

export default Select;
