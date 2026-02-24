import { useCallback, useEffect, useState } from "react";
import type { LogEntry } from "@/types/logs";
import type { PaginationMeta } from "@/types/api";
import { getLogs } from "../services/logs.service";

type UseLogsOptions = {
  page?: number;
  limit?: number;
  filters?: {
    search?: string;
    action?: string;
    status?: string;
    from?: string;
    to?: string;
  };
};

const defaultPagination: PaginationMeta = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

export const useLogs = (options: UseLogsOptions = {}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [page, setPage] = useState(options.page ?? 1);
  const [limit, setLimit] = useState(options.limit ?? 20);
  const [pagination, setPagination] = useState<PaginationMeta>(defaultPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getLogs({
        page,
        limit,
        ...(options.filters ?? {}),
      });
      setLogs(response.data);
      setPagination(response.pagination ?? defaultPagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load logs");
      setLogs([]);
      setPagination(defaultPagination);
    } finally {
      setLoading(false);
    }
  }, [limit, options.filters, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return {
    data: logs,
    logs,
    pagination,
    page,
    limit,
    setPage,
    setLimit: updateLimit,
    loading,
    error,
    refetch: load,
  };
};
