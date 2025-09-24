import { Review } from "@/types/reviews";
import ReviewRow from "./ReviewRow";

interface Props {
  reviews: Review[];
}

const ReviewTable = ({ reviews }: Props) => {
  return (
    <div className="overflow-x-auto border border-[#2F2F41] rounded-xl shadow-md">
      <table className="min-w-full text-sm text-gray-300">
        {/* Table Head */}
        <thead>
          <tr className="bg-[#141421] border-b border-[#2F2F41]">
            <th className="py-3 px-4 text-left font-medium">Rating</th>
            <th className="py-3 px-4 text-left font-medium">Comment</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Date</th>
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-[#2F2F41]">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewRow key={review.id} review={review} />
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-6 px-4 text-center text-gray-500 italic"
              >
                No reviews available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
