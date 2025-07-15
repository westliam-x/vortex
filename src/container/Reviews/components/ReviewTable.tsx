import { Review } from "@/types/reviews";
import ReviewRow from "./ReviewRow";

interface Props {
  reviews: Review[];
}

const ReviewTable = ({ reviews }: Props) => {
  return (
    <div className="overflow-x-auto border border-[#2F2F41] rounded-lg">
      <table className="min-w-full bg-[#1E1E2E] text-sm">
        <thead>
          <tr className="border-b border-[#2F2F41] text-left text-gray-300">
            <th className="py-3 px-4">Rating</th>
            <th className="py-3 px-4">Comment</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <ReviewRow key={review.id} review={review} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
