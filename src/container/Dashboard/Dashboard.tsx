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
  const Dashboard = () => {
  

  return (
    <DashboardLayout>
      <main className="md:p-6 space-y-6">
        <DashboardStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivity />
          <RecentComments />
        </div>

        <ProjectOverview />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReviewHighlight />
          <QuickActions />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
