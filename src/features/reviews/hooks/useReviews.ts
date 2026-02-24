import { useCallback, useEffect, useState } from "react";
import type { Review } from "@/types/reviews";
import { fetchReviews } from "../services/reviews.service";
import type { PaginationMeta } from "@/types/api";

type UseReviewsOptions = {
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

export const useReviews = (options: UseReviewsOptions = {}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(options.page ?? 1);
  const [limit, setLimit] = useState(options.limit ?? 20);
  const [pagination, setPagination] = useState<PaginationMeta>(defaultPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchReviews({
        page,
        limit,
        filters: options.filters,
        config: signal ? { signal } : undefined,
      });
      if (signal?.aborted) return;
      setReviews(response.data ?? []);
      setPagination(response.pagination ?? defaultPagination);
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(err instanceof Error ? err.message : "Failed to load reviews");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [limit, options.filters, page]);


  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const updateLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return {
    data: reviews,
    reviews,
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
