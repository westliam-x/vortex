import VerifiedReviewCard from "@/shared/components/VerifiedReviewCard";
import type { WidgetReview } from "../types";

type WidgetReviewRowProps = {
  review: WidgetReview;
};

export default function WidgetReviewRow({ review }: WidgetReviewRowProps) {
  return (
    <VerifiedReviewCard
      rating={review.rating}
      body={review.comment}
      projectName={review.projectName}
      clientName={review.clientName}
      verified={review.verified}
      createdAt={review.createdAt}
      compact
      verificationSubtext="Linked to completed invoice"
    />
  );
}

export type { WidgetReviewRowProps };
