import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";
import type { AxiosRequestConfig } from "axios";
import type { LogEntry } from "@/types/logs";
import type { VortexMessage } from "@/types/vortex";

export type SummaryProject = {
  id: string;
  title: string;
  status: "Pending" | "In Progress" | "Completed" | "Archived";
  clientId?: { name?: string } | string | null;
  createdAt: string;
  updatedAt?: string;
};

export type DashboardSummary = {
  stats: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    totalClients: number;
    revenueByCurrency: Record<string, number>;
    revenueWindowDays: number;
  };
  recentActivity: LogEntry[];
  recentMessages: VortexMessage[];
  recentProjects: SummaryProject[];
};

export const getDashboardSummary = async (config?: AxiosRequestConfig): Promise<DashboardSummary> => {
  const response = await makeRequest<DashboardSummary>({
    url: API_ROUTES.DASHBOARD.SUMMARY,
    method: "GET",
    config,
  });
  return response;
};
