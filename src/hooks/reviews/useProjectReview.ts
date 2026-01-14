import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/types/reviews";
import { fetchProjectReview, updateReviewStatus } from "@/services/reviewServices";

export const useProjectReview = (projectId?: string) => {
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!projectId || inFlightRef.current) return;
      inFlightRef.current = true;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProjectReview(projectId, signal ? { signal } : undefined);
        if (signal?.aborted) return;
        setReview(data);
      } catch (err) {
        if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
        setError(err instanceof Error ? err.message : "Failed to load review");
      } finally {
        inFlightRef.current = false;
        if (!signal?.aborted) setLoading(false);
      }
    },
    [projectId]
  );

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const updateStatus = useCallback(
    async (action: "approve" | "reject") => {
      if (!projectId) return;
      await updateReviewStatus(projectId, action);
      await load();
    },
    [projectId, load]
  );

  return { review, loading, error, refetch: load, updateStatus };
};
