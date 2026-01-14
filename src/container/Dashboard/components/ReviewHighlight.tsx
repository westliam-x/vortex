"use client";

import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui";

const ReviewHighlight = () => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <Star size={20} className="text-[var(--warning)]" />
        <h2 className="text-[var(--text)] text-lg font-semibold">
          Featured review
        </h2>
      </div>

      <blockquote className="relative italic text-[var(--text-muted)] leading-relaxed mb-4">
        <Quote className="absolute -top-3 -left-3 h-5 w-5 text-[var(--accent)]/60" />
        Vortex kept approvals and assets in one place. We shipped faster and
        stayed aligned with every decision.
      </blockquote>

      <div className="flex items-center justify-between text-xs text-[var(--text-subtle)]">
        <span>Jordan Lee</span>
        <span className="px-3 py-1 rounded-full bg-[var(--surface-2)] text-[var(--text-subtle)] text-[11px] font-medium">
          Client Portal MVP
        </span>
      </div>
    </Card>
  );
};

export default ReviewHighlight;
