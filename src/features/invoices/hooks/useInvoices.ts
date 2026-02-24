import { useCallback, useEffect, useState } from "react";
import type { Invoice } from "@/lib/invoices";
import { createInvoice, fetchInvoices } from "../services/invoices.service";
import type { PaginationMeta } from "@/types/api";

type UseInvoicesOptions = {
  autoFetch?: boolean;
  page?: number;
  limit?: number;
  filters?: {
    search?: string;
    status?: string;
    dateFilter?: string;
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

export const useInvoices = (options: UseInvoicesOptions = {}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [page, setPage] = useState(options.page ?? 1);
  const [limit, setLimit] = useState(options.limit ?? 20);
  const [pagination, setPagination] = useState<PaginationMeta>(defaultPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchInvoices({
        page,
        limit,
        filters: options.filters,
        config: signal ? { signal } : undefined,
      });
      if (signal?.aborted) return;
      setInvoices(response.data);
      setPagination(response.pagination ?? defaultPagination);
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(err instanceof Error ? err.message : "Failed to load invoices");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [limit, options.filters, page]);

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

  const updateLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return {
    data: invoices,
    invoices,
    pagination,
    page,
    limit,
    setPage,
    setLimit: updateLimit,
    loading,
    error,
    refetch: load,
    create,
  };
};
