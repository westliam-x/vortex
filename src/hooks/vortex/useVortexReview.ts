import { useCallback, useEffect, useState } from "react";
import type { Review } from "@/types/reviews";
import { fetchProjectReview, updateReviewStatus as updateReviewStatusRequest } from "@/services/reviewServices";

export const useVortexReview = (projectId?: string) => {
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReview = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjectReview(projectId);
      setReview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load review");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    fetchReview();
  }, [projectId, fetchReview]);

  const updateReviewStatus = useCallback(
    async (action: "approve" | "reject") => {
      if (!projectId) return;
      await updateReviewStatusRequest(projectId, action);
      await fetchReview();
    },
    [projectId, fetchReview]
  );

  return { review, loading, error, fetchReview, updateReviewStatus };
};
