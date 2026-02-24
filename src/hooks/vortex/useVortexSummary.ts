import { useCallback, useEffect, useState } from "react";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import gracefulApiError from "@/shared/utils/gracefulApiError";

type VortexSummaryResponse = {
  project: {
    id?: string;
    _id?: string;
    title?: string;
    status?: string;
    budget?: number;
    deadline?: string;
    clientId?: { id?: string; _id?: string; name?: string } | string;
  };
  messageCount: number;
  fileCount: number;
  shareEnabled: boolean;
  shareExpiresAt?: string | null;
};

export const useVortexSummary = (projectId?: string) => {
  const [summary, setSummary] = useState<VortexSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async (signal?: AbortSignal) => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await makeRequest<VortexSummaryResponse>({
        url: `${API_ROUTES.VORTEX.SUMMARY}/${projectId}/summary`,
        method: "GET",
        config: signal ? { signal } : undefined,
      });
      setSummary(response);
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(gracefulApiError());
      setSummary(null);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetchSummary(controller.signal);
    return () => controller.abort();
  }, [projectId, fetchSummary]);

  return { summary, loading, error, fetchSummary };
};
