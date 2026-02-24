import { useCallback, useEffect, useState } from "react";
import type { TeamMember } from "@/types/team";
import { fetchTeam, removeTeamMember, updateTeamRole } from "../services/team.service";
import type { PaginationMeta } from "@/types/api";

type UseTeamOptions = {
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

export const useTeam = (options: UseTeamOptions = {}) => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [page, setPage] = useState(options.page ?? 1);
  const [limit, setLimit] = useState(options.limit ?? 20);
  const [pagination, setPagination] = useState<PaginationMeta>(defaultPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTeam({
        page,
        limit,
        filters: options.filters,
        config: signal ? { signal } : undefined,
      });
      if (signal?.aborted) return;
      setTeam(response.data);
      setPagination(response.pagination ?? defaultPagination);
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(err instanceof Error ? err.message : "Failed to load team");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [limit, options.filters, page]);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const changeRole = useCallback(async (memberId: string, role: TeamMember["role"]) => {
    const updated = await updateTeamRole(memberId, role);
    setTeam((prev) => prev.map((m) => (m.id === memberId ? updated : m)));
  }, []);

  const removeMember = useCallback(async (memberId: string) => {
    await removeTeamMember(memberId);
    setTeam((prev) => prev.filter((m) => m.id !== memberId));
  }, []);

  const updateLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return {
    data: team,
    team,
    pagination,
    page,
    limit,
    setPage,
    setLimit: updateLimit,
    loading,
    error,
    refetch: load,
    changeRole,
    removeMember,
  };
};
