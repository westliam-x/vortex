import { Review } from "@/types/reviews";
import ReviewRow from "./ReviewRow";

interface Props {
  reviews: Review[];
  locked: boolean;
}

const ReviewTable = ({ reviews, locked }: Props) => {
  return (
    <div className="overflow-x-auto border border-[var(--border)] rounded-xl">
      <table className="min-w-full text-sm text-[var(--text-muted)]">
        {/* Table Head */}
        <thead>
          <tr className="bg-[var(--surface-2)] border-b border-[var(--border)]">
            <th className="py-3 px-4 text-left font-medium text-[var(--text-subtle)]">Rating</th>
            <th className="py-3 px-4 text-left font-medium text-[var(--text-subtle)]">Comment</th>
            <th className="py-3 px-4 text-left font-medium text-[var(--text-subtle)]">Status</th>
            <th className="py-3 px-4 text-left font-medium text-[var(--text-subtle)]">Date</th>
            <th className="py-3 px-4 text-left font-medium text-[var(--text-subtle)]">Visibility</th>
            <th className="py-3 px-4 text-left font-medium text-[var(--text-subtle)]">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-[var(--border)]">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewRow key={review.id} review={review} locked={locked} />
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-6 px-4 text-center text-[var(--text-subtle)] italic"
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
