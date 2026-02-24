"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib";

type WidgetShellProps = {
  children: ReactNode;
  className?: string;
};

export default function WidgetShell({ children, className }: WidgetShellProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[600px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export type { WidgetShellProps };
