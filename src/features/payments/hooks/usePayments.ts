import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProjectPayments, type PaymentEvent } from "../services/payments.service";
import type { PaginationMeta } from "@/types/api";

export const usePayments = (projectId?: string, fallbackTotal = 0) => {
  const [payments, setPayments] = useState<{
    total: number;
    currency: string;
    events: PaymentEvent[];
  }>({ total: fallbackTotal, currency: "USD", events: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  const fallbackRef = useRef<number>(fallbackTotal ?? 0);

  useEffect(() => {
    fallbackRef.current = fallbackTotal ?? 0;
  }, [fallbackTotal]);

  const fetchPayments = useCallback(
    async (signal?: AbortSignal) => {
      if (!projectId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProjectPayments(projectId, signal, page, limit);
        setPayments({
          total: response.totals?.total ?? fallbackRef.current,
          currency: response.currency ?? "USD",
          events: response.data ?? [],
        });
        setPagination(
          response.pagination ?? {
            page,
            limit,
            total: 0,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
          }
        );
      } catch (err) {
        if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
        setError(err instanceof Error ? err.message : "Failed to load payments");
        setPayments({
          total: fallbackRef.current,
          currency: "USD",
          events: [],
        });
        setPagination({
          page,
          limit,
          total: 0,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        });
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [limit, page, projectId]
  );

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetchPayments(controller.signal);
    return () => controller.abort();
  }, [projectId, fetchPayments]);

  const paid = payments.events.reduce((sum, event) => {
    return event.status === "posted" ? sum + event.amount : sum;
  }, 0);
  const outstanding = payments.total - paid;
  const progress = payments.total > 0 ? Math.round((paid / payments.total) * 100) : 0;

  const updateLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return {
    payments,
    paid,
    outstanding,
    progress,
    loading,
    error,
    pagination,
    page,
    limit,
    setPage,
    setLimit: updateLimit,
    fetchPayments,
  };
};
