"use client";

import { Badge } from "@/components/ui";

type WidgetHeaderProps = {
  displayName: string;
  avgRating: number;
  verifiedReviewsCount: number;
};

export default function WidgetHeader({
  displayName,
  avgRating,
  verifiedReviewsCount,
}: WidgetHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
      <div>
        <h1 className="text-base font-semibold text-[var(--text)]">{displayName}</h1>
        <p className="text-xs text-[var(--muted)]">
          {avgRating.toFixed(1)}/5 rating • {verifiedReviewsCount} verified reviews
        </p>
      </div>
      <Badge tone="success">Verified on Vortex</Badge>
    </div>
  );
}

export type { WidgetHeaderProps };
