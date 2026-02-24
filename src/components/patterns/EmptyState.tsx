import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import type { ButtonProps } from "@/components/ui/Button";
import { cn } from "@/lib";

export type PatternAction = Omit<ButtonProps, "children"> & {
  label: string;
};

type EmptyStateProps = {
  title: string;
  description: string;
  primaryAction: PatternAction;
  secondaryAction?: PatternAction;
  icon?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  primaryAction,
  secondaryAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center",
        className
      )}
    >
      {icon ? <div className="mb-4 text-[var(--muted)]">{icon}</div> : null}
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">{description}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Button {...primaryAction}>{primaryAction.label}</Button>
        {secondaryAction ? (
          <Button {...secondaryAction}>{secondaryAction.label}</Button>
        ) : null}
      </div>
    </div>
  );
}

export type { EmptyStateProps };
