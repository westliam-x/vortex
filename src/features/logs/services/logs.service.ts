import API_ROUTES from "@/endpoints/routes";
import type { LogEntry } from "@/types/logs";
import { makeRequest } from "@/api/request";

type LogsQuery = {
  action?: string;
  status?: string;
  from?: string;
  to?: string;
};

export const getLogs = async (query?: LogsQuery): Promise<LogEntry[]> => {
  const response = await makeRequest<{ data: LogEntry[] }>({
    url: API_ROUTES.LOGS.GET,
    method: "GET",
    config: query ? { params: query } : undefined,
  });

  return response.data ?? [];
};
