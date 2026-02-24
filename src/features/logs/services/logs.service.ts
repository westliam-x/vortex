import API_ROUTES from "@/endpoints/routes";
import type { LogEntry } from "@/types/logs";
import { makeRequest } from "@/api/request";
import type { PaginationMeta } from "@/types/api";

type LogsQuery = {
  page: number;
  limit: number;
  search?: string;
  action?: string;
  status?: string;
  from?: string;
  to?: string;
};

type PaginatedLogsResponse = {
  data: LogEntry[];
  pagination: PaginationMeta;
};

export const getLogs = async (query: Partial<LogsQuery> = {}): Promise<PaginatedLogsResponse> => {
  const response = await makeRequest<PaginatedLogsResponse>({
    url: API_ROUTES.LOGS.GET,
    method: "GET",
    config: {
      params: {
        page: query.page ?? 1,
        limit: query.limit ?? 20,
        ...(query ?? {}),
      },
    },
  });

  return {
    data: response.data ?? [],
    pagination: response.pagination,
  };
};
