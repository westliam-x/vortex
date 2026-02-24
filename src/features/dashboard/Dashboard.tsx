"use client";

import {
  DashboardStats,
  ProjectOverview,
  QuickActions,
  RecentActivity,
  RecentComments,
  ReviewHighlight,
} from "./components";
import { useDashboardSummary } from "./hooks/useDashboardSummary";
import { useReviews } from "@/features/reviews";
import { PageHeader } from "@/components/layout";

const Dashboard = () => {
  const { summary, loading: summaryLoading } = useDashboardSummary();
  const { reviews } = useReviews();
  const highlight = reviews.find((review) => review.status === "Approved") ?? reviews[0] ?? null;

  return (
    <main className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Monitor delivery health, activity, and client feedback."
      />
      <DashboardStats stats={summary?.stats} loading={summaryLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity logs={summary?.recentActivity ?? []} loading={summaryLoading} />
        <RecentComments messages={summary?.recentMessages ?? []} loading={summaryLoading} />
      </div>


      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <ProjectOverview projects={summary?.recentProjects ?? []} loading={summaryLoading} />
        <ReviewHighlight review={highlight} />
        {/* <QuickActions /> */}
      </div>
    </main>
  );
};

export default Dashboard;
