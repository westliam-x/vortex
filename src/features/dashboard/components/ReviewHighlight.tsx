"use client";

import { Quote, Star } from "lucide-react";
import { Card, EmptyState } from "@/components/ui";
import type { Review } from "@/types/reviews";

const ReviewHighlight = ({ review }: { review: Review | null }) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <Star size={20} className="text-[var(--warning)]" />
        <h2 className="text-[var(--text)] text-lg font-semibold">
          Featured review
        </h2>
      </div>

      {review ? (
        <>
          <blockquote className="relative italic text-[var(--text-muted)] leading-relaxed mb-4">
            <Quote className="absolute -top-3 -left-3 h-5 w-5 text-[var(--accent)]/60" />
            {review.comment}
          </blockquote>

          <div className="flex items-center justify-between text-xs text-[var(--text-subtle)]">
            <span>{review.clientName ?? "Verified client"}</span>
            <span className="px-3 py-1 rounded-full bg-[var(--surface-2)] text-[var(--text-subtle)] text-[11px] font-medium">
              {typeof review.projectId === "object" && review.projectId
                ? review.projectId.name
                : "Project"}
            </span>
          </div>
        </>
      ) : (
        <EmptyState
          title="No reviews yet"
          description="Client reviews will appear here once approved."
        />
      )}
    </Card>
  );
};

export default ReviewHighlight;
