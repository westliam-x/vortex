import { useCallback, useEffect, useState } from "react";
import type { Invoice } from "@/lib/invoices";
import { createInvoice, fetchInvoices } from "@/services/invoiceServices";

export const useInvoices = (options: { autoFetch?: boolean } = {}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchInvoices(signal ? { signal } : undefined);
      if (signal?.aborted) return;
      setInvoices(data);
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(err instanceof Error ? err.message : "Failed to load invoices");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (options.autoFetch === false) return;
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load, options.autoFetch]);

  const create = useCallback(async (payload: Invoice) => {
    const created = await createInvoice(payload);
    setInvoices((prev) => [created, ...prev]);
    return created;
  }, []);

  return { invoices, loading, error, refetch: load, create };
};
