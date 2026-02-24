"use client";

import { forwardRef, useMemo, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib";

export type TabItem = {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};

type TabsProps = HTMLAttributes<HTMLDivElement> & {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, items, value, defaultValue, onValueChange, ...props }, ref) => {
    const initialValue = useMemo(() => {
      return defaultValue ?? items.find((item) => !item.disabled)?.value ?? "";
    }, [defaultValue, items]);

    const [internalValue, setInternalValue] = useState(initialValue);
    const activeValue = value ?? internalValue;
    const activeItem = items.find((item) => item.value === activeValue) ?? items[0];

    const setValue = (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <div className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
          {items.map((item) => {
            const active = item.value === activeItem?.value;
            return (
              <button
                key={item.value}
                type="button"
                disabled={item.disabled}
                onClick={() => setValue(item.value)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors disabled:opacity-50",
                  active
                    ? "bg-[var(--blue)] text-[var(--text)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          {activeItem?.content}
        </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
