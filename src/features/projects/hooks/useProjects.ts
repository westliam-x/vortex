import { useCallback, useEffect, useState } from "react";
import { Project } from "@/types/project";
import { fetchProjects } from "../services/projects.service";
import type { PaginationMeta } from "@/types/api";

type UseProjectsOptions = {
  page?: number;
  limit?: number;
  filters?: {
    search?: string;
    status?: string;
    sort?: string;
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

export const useProjects = (options: UseProjectsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(options.page ?? 1);
  const [limit, setLimit] = useState(options.limit ?? 20);
  const [pagination, setPagination] = useState<PaginationMeta>(defaultPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProjects({
        page,
        limit,
        filters: options.filters,
      });
      setProjects(response.data);
      setPagination(response.pagination ?? defaultPagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [limit, options.filters, page]);

  useEffect(() => {
    load();
  }, [load]);

  const updateLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return {
    data: projects,
    projects,
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
