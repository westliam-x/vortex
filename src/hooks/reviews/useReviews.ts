import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/types/reviews";
import { fetchReviews } from "@/services/reviewServices";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
  setLoading(true);
  setError(null);

  try {
    const res = await fetchReviews(signal ? { signal } : undefined);
    if (signal?.aborted) return;

    const reviews = res ?? [];
    setReviews(reviews);

  } catch (err) {
    if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
    setError(err instanceof Error ? err.message : "Failed to load reviews");
  } finally {
    if (!signal?.aborted) setLoading(false);
  }
}, []);


  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);
  return { reviews, loading, error, refetch: load };
};
