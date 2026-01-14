"use client";

import { ReviewTable } from "./components";
import { DashboardLayout } from "@/layouts";
import { Card, EmptyState } from "@/components/ui";
import { LockKeyhole } from "lucide-react";
import { useReviews } from "@/hooks/reviews/useReviews";
import { useProjectsList } from "@/hooks/projects/useProjectsList";

const ReviewsPage = () => {
  const { reviews, loading: reviewsLoading } = useReviews();
  const { projects } = useProjectsList();
  const projectClosed = projects.some((project) => project.status === "Completed");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text)]">Client reviews</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Reviews unlock after project closure and require client approval before public display.
          </p>
        </div>

        {!projectClosed ? (
          <Card className="p-10">
            <EmptyState
              title="Reviews are locked"
              description="Close a project to unlock the review workflow."
              icon={<LockKeyhole size={28} />}
            />
          </Card>
        ) : (
          <Card>
            <ReviewTable reviews={reviews} locked={!projectClosed || reviewsLoading} />
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ReviewsPage;
