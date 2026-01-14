import { useCallback, useEffect, useState } from "react";
import {
  getDashboardSummary,
  type DashboardSummary,
} from "@/services/dashboardServices";

export const useDashboardSummary = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async (signal?: AbortSignal) => {
    console.log("Fetching dashboard summary...");

    setLoading(true);
    setError(null);
    try {
      const data = await getDashboardSummary(signal ? { signal } : undefined);
      if (signal?.aborted) return;
      setSummary(data);
    } catch (err) {
      if (
        signal?.aborted ||
        (err instanceof Error && err.message === "aborted")
      )
        return;
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchSummary(controller.signal);
    return () => controller.abort();
  }, [fetchSummary]);

  return { summary, loading, error, refetch: fetchSummary };
};
