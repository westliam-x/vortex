import type { ReactNode } from "react";
import { cn } from "@/lib";
import Button, { type ButtonProps } from "@/components/ui/Button";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  primaryAction?: Omit<ButtonProps, "children"> & { label: string };
  secondaryActions?: Array<Omit<ButtonProps, "children"> & { label: string }>;
  rightSlot?: ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  subtitle,
  primaryAction,
  secondaryActions = [],
  rightSlot,
  className,
}: PageHeaderProps) {
  const hasActions = Boolean(rightSlot || primaryAction || secondaryActions.length);

  return (
    <header
      className={cn(
        "flex flex-col gap-3 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-[var(--text)] sm:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p> : null}
      </div>
      {hasActions ? (
        <div className="flex shrink-0 items-center gap-2">
          {rightSlot}
          {secondaryActions.slice(0, 2).map(({ label, ...buttonProps }, index) => (
            <Button key={`${label}-${index}`} {...buttonProps}>
              {label}
            </Button>
          ))}
          {primaryAction ? (
            <Button {...primaryAction}>{primaryAction.label}</Button>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
