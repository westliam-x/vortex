"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

const EmptyState = ({ title, description, action, icon, className }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center",
        className
      )}
    >
      {icon ? <div className="mb-4 text-[var(--accent)]">{icon}</div> : null}
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
