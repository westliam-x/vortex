"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib";

type ErrorStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

const ErrorState = ({ title, description, action, className }: ErrorStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-[var(--error)]">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
};

export default ErrorState;
