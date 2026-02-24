"use client";

import { SectionCard } from "@/components/patterns";
import type { PublicProfileReview } from "../types";
import ReviewCard from "./ReviewCard";

type VerifiedReviewsProps = {
  reviews: PublicProfileReview[];
};

export default function VerifiedReviews({ reviews }: VerifiedReviewsProps) {
  return (
    <SectionCard title="Verified Reviews" description="Feedback from completed client projects">
      <div className="space-y-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </SectionCard>
  );
}

export type { VerifiedReviewsProps };
