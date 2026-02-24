import API_ROUTES from "@/endpoints/routes";
import type { LogEntry } from "@/types/logs";
import { safeRequest } from "@/lib";
import { mockLogs } from "@/data/mock";

export const getLogs = async (): Promise<LogEntry[]> => {
  const response = await safeRequest<LogEntry[] | { logs: LogEntry[] }>(
    {
      url: API_ROUTES.LOGS.GET,
      method: "GET",
    },
    mockLogs
  );

  if (Array.isArray(response)) {
    return response;
  }

  if (response && Array.isArray(response.logs)) {
    return response.logs;
  }

  return [];
};
