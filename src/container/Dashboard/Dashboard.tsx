"use client";
import { DashboardLayout } from "@/layouts";
import {
  DashboardStats,
  ProjectOverview,
  QuickActions,
  RecentActivity,
  RecentComments,
  ReviewHighlight,
} from "./components";
import { useDashboardSummary } from "@/hooks/dashboard/useDashboardSummary";
import { useReviews } from "@/hooks/reviews/useReviews";
  const Dashboard = () => {
  const { summary, loading: summaryLoading } = useDashboardSummary();
  const { reviews } = useReviews();
  const highlight = reviews.find((review) => review.status === "Approved") ?? reviews[0] ?? null;

  return (
    <DashboardLayout>
      <main className="md:p-6 space-y-6">
        <DashboardStats stats={summary?.stats} loading={summaryLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity logs={summary?.recentActivity ?? []} loading={summaryLoading} />
          <RecentComments messages={summary?.recentMessages ?? []} loading={summaryLoading} />
        </div>

        <ProjectOverview projects={summary?.recentProjects ?? []} loading={summaryLoading} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReviewHighlight review={highlight} />
          <QuickActions />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
