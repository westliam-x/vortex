"use client";

import { ReviewTable } from "./components";
import { DashboardLayout } from "@/layouts";
import { Card, EmptyState } from "@/components/ui";
import { PageHeader } from "@/components/layout";
import { LockKeyhole } from "lucide-react";
import { useReviews } from "@/features/reviews";
import { useProjects } from "@/features/projects";

const ReviewsPage = () => {
  const { reviews, loading: reviewsLoading } = useReviews();
  const { projects } = useProjects();
  const projectClosed = projects.some((project) => project.status === "Completed");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Client Reviews"
          subtitle="Reviews unlock after project closure and require client approval before public display."
        />

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
