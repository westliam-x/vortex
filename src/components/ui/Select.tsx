"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40",
          className
        )}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

export default Select;
