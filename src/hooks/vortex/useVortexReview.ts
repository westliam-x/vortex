import { useCallback, useState } from "react";
import API_ROUTES from "@/endpoints/routes";
import { safeRequest } from "@/lib";
import { makeRequest } from "@/api/request";
import type { Review } from "@/types/reviews";
import { mockReviews } from "@/data/mock";

export const useVortexReview = (projectId?: string) => {
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProjectId = (p: unknown): string | null => {
    if (!p) return null;
    if (typeof p === "string") return p;

    if (typeof p === "object") {
      const obj = p as Record<string, unknown>;
      const id = obj.id ?? obj._id;
      return typeof id === "string" ? id : null;
    }

    return null;
  };

  const fetchReview = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await safeRequest<{ reviews?: Review[] }>(
        {
          url: API_ROUTES.REVIEWS.LIST,
          method: "GET",
        },
        { reviews: mockReviews }
      );
      const reviews = response.reviews ?? [];
      const matched =
        reviews.find(
          (item) => String(getProjectId(item.projectId)) === String(projectId)
        ) ?? null;
      setReview(matched);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load review");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const updateReviewStatus = useCallback(
    async (action: "approve" | "reject") => {
      if (!projectId) return;
      await makeRequest({
        url: `${API_ROUTES.REVIEWS.APPROVE}/${projectId}/${action}`,
        method: "PATCH",
      });
      await fetchReview();
    },
    [projectId, fetchReview]
  );

  return { review, loading, error, fetchReview, updateReviewStatus };
};
