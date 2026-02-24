import VerifiedReviewCard from "@/shared/components/VerifiedReviewCard";
import type { PublicProfileReview } from "../types";

type ReviewCardProps = {
  review: PublicProfileReview;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <VerifiedReviewCard
      rating={review.rating}
      body={review.comment}
      projectName={review.projectName}
      clientName={review.clientName}
      verified={review.verified}
      createdAt={review.createdAt}
      verificationSubtext="Linked to completed invoice"
    />
  );
}

export type { ReviewCardProps };
