import { useCallback, useEffect, useRef, useState } from "react";
import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";

type PaymentEvent = {
  _id?: string;
  id?: string;
  amount: number;
  currency: string;
  note?: string;
  occurredAt?: string;
  status: "posted" | "void";
};

export const useVortexPayments = (projectId?: string, fallbackTotal = 0) => {
  const [payments, setPayments] = useState<{
    total: number;
    currency: string;
    events: PaymentEvent[];
  }>({ total: fallbackTotal, currency: "USD", events: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fallbackRef = useRef<number>(fallbackTotal ?? 0);
  
    useEffect(() => {
      fallbackRef.current = fallbackTotal ?? 0;
    }, [fallbackTotal]);


  const fetchPayments = useCallback(async (signal?: AbortSignal) => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await makeRequest<{
        events: PaymentEvent[];
        totals: { total: number };
        currency: string;
      }>({
        url: `${API_ROUTES.PAYMENTS.BASE}/${projectId}`,
        method: "GET",
        config: signal ? { signal } : undefined,
      });
      setPayments({
        total: response.totals?.total ?? fallbackRef.current,
        currency: response.currency ?? "USD",
        events: response.events ?? [],
      });
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(err instanceof Error ? err.message : "Failed to load payments");
      setPayments({
        total: fallbackRef.current,
        currency: "USD",
        events: [],
      });
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [projectId]);

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
  const progress =
    payments.total > 0 ? Math.round((paid / payments.total) * 100) : 0;

  return { payments, paid, outstanding, progress, loading, error, fetchPayments };
};
