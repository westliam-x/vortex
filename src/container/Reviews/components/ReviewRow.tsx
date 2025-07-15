
import { format } from "date-fns";
import { Button } from "@/components";
import { Review } from "@/types/reviews";
import RatingStars from "./ReviewsStar";

interface Props {
  review: Review;
}

const ReviewRow = ({ review }: Props) => {
  return (
    <tr key={review.id} className="border-b border-[#2F2F41]">
      <td className="py-3 px-4">
        <RatingStars rating={review.rating} />
      </td>
      <td className="py-3 px-4">
        {review.comment.length > 60 ? `${review.comment.slice(0, 60)}...` : review.comment}
      </td>
      <td className="py-3 px-4">
        <span
          className={
            review.status === "Approved"
              ? "text-green-400"
              : review.status === "Rejected"
              ? "text-red-400"
              : "text-yellow-400"
          }
        >
          {review.status}
        </span>
      </td>
      <td className="py-3 px-4">
        {format(new Date(review.createdAt), "dd MMM yyyy")}
      </td>
      <td className="py-3 px-4 flex gap-2">
        {review.status === "Pending" && (
          <>
            <Button size="xs" variant="primary">Approve</Button>
            <Button size="xs" variant="destructive">Reject</Button>
          </>
        )}
        <Button size="xs" variant="ghost">Delete</Button>
        {review.status === "Approved" && !review.featured && (
          <Button size="xs" variant="outline">Feature</Button>
        )}
      </td>
    </tr>
  );
};

export default ReviewRow;
