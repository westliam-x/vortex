import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { LogEntry } from "@/types/logs";

export const getLogs = async (): Promise<LogEntry[]> => {
  return await makeRequest<LogEntry[]>({
    url: API_ROUTES.LOGS.GET,
    method: "GET",
  });
};
