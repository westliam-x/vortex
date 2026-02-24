import type { ReactNode } from "react";
import { cn } from "@/lib";

export type PlanningItemTone = "neutral" | "good" | "warning" | "danger";

export type PlanningItemProps = {
  title: string;
  meta?: string;
  description?: string;
  tone?: PlanningItemTone;
  rightSlot?: ReactNode;
  className?: string;
};

const toneStyles: Record<PlanningItemTone, string> = {
  neutral: "border-[var(--border)]",
  good: "border-[var(--mint)]/40",
  warning: "border-[var(--warning)]/40",
  danger: "border-[var(--danger)]/40",
};

export default function PlanningItem({
  title,
  meta,
  description,
  tone = "neutral",
  rightSlot,
  className,
}: PlanningItemProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-[var(--surface2)] px-3 py-2.5",
        toneStyles[tone],
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--text)]">{title}</p>
          {meta ? <p className="mt-1 text-xs text-[var(--muted)]">{meta}</p> : null}
          {description ? <p className="mt-2 text-xs text-[var(--muted)]">{description}</p> : null}
        </div>
        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </div>
    </div>
  );
}
