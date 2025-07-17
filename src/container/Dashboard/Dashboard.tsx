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
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { useEffect } from "react";
const Dashboard = () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await makeRequest({
          url: API_ROUTES.AUTH.PROFILE,
          method: "GET",
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

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
