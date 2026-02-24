"use client";

import { format } from "date-fns";
import { Button, Badge } from "@/components/ui";
import { Review } from "@/types/reviews";
import RatingStars from "./ReviewsStar";

interface Props {
  review: Review;
  locked: boolean;
}

const ReviewRow = ({ review, locked }: Props) => {
  const canModerate = review.status === "Pending" && !locked;
  const canFeature = review.status === "Approved" && !review.featured && review.clientApproved;

  return (
    <tr className="border-b border-[var(--border)]">
      <td className="py-3 px-4">
        <RatingStars rating={review.rating} />
      </td>
      <td className="py-3 px-4 text-[var(--text-muted)]">
        {review.comment.length > 60 ? `${review.comment.slice(0, 60)}...` : review.comment}
      </td>
      <td className="py-3 px-4">
        <Badge
          tone={
            review.status === "Approved"
              ? "success"
              : review.status === "Rejected"
              ? "error"
              : "warning"
          }
        >
          {review.status}
        </Badge>
      </td>
      <td className="py-3 px-4 text-[var(--text-subtle)]">
        {format(new Date(review.createdAt), "dd MMM yyyy")}
      </td>
      <td className="py-3 px-4 text-[var(--text-subtle)]">
        {review.clientApproved ? "Client approved" : "Awaiting client approval"}
      </td>
      <td className="py-3 px-4 flex gap-2">
        {canModerate ? (
          <>
            <Button size="xs">Approve</Button>
            <Button size="xs" variant="destructive">
              Reject
            </Button>
          </>
        ) : null}
        <Button size="xs" variant="ghost">
          Delete
        </Button>
        {canFeature ? (
          <Button size="xs" variant="outline">
            Feature
          </Button>
        ) : null}
      </td>
    </tr>
  );
};

export default ReviewRow;
