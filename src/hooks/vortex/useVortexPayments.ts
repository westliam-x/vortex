import { useCallback, useState } from "react";
import API_ROUTES from "@/endpoints/routes";
import { safeRequest } from "@/lib";

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

  const fetchPayments = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await safeRequest<{
        events: PaymentEvent[];
        totals: { total: number };
        currency: string;
      }>(
        {
          url: `${API_ROUTES.PAYMENTS.BASE}/${projectId}`,
          method: "GET",
        },
        {
          events: [],
          totals: { total: fallbackTotal },
          currency: "USD",
        }
      );
      setPayments({
        total: response.totals?.total ?? fallbackTotal,
        currency: response.currency ?? "USD",
        events: response.events ?? [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load payments");
    } finally {
      setLoading(false);
    }
  }, [projectId, fallbackTotal]);

  const paid = payments.events.reduce((sum, event) => {
    return event.status === "posted" ? sum + event.amount : sum;
  }, 0);
  const outstanding = payments.total - paid;
  const progress =
    payments.total > 0 ? Math.round((paid / payments.total) * 100) : 0;

  return { payments, paid, outstanding, progress, loading, error, fetchPayments };
};
