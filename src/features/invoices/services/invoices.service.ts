import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";
import type { Invoice } from "@/lib/invoices";
import type { AxiosRequestConfig } from "axios";
import type { PaginationMeta } from "@/types/api";

const normalizeInvoice = (invoice: Invoice & { _id?: string }) => {
  if (!invoice.id && invoice._id) {
    return { ...invoice, id: invoice._id };
  }
  return invoice;
};

type InvoiceListParams = {
  page: number;
  limit: number;
  filters?: {
    search?: string;
    status?: string;
    dateFilter?: string;
  };
  config?: AxiosRequestConfig;
};

type PaginatedInvoicesResponse = {
  data: Invoice[];
  pagination: PaginationMeta;
};

export const fetchInvoices = async ({
  page = 1,
  limit = 20,
  filters,
  config,
}: Partial<InvoiceListParams> = {}): Promise<PaginatedInvoicesResponse> => {
  const response = await makeRequest<PaginatedInvoicesResponse>({
    url: API_ROUTES.INVOICES.BASE,
    method: "GET",
    config: {
      ...config,
      params: {
        page,
        limit,
        ...(filters ?? {}),
      },
    },
  });
  return {
    data: (response.data ?? []).map(normalizeInvoice),
    pagination: response.pagination,
  };
};

export const createInvoice = async (payload: Invoice): Promise<Invoice> => {
  const response = await makeRequest<{ invoice: Invoice }>({
    url: API_ROUTES.INVOICES.BASE,
    method: "POST",
    data: payload,
  });
  return normalizeInvoice(response.invoice);
};

export const updateInvoice = async (id: string, payload: Partial<Invoice>): Promise<Invoice> => {
  const response = await makeRequest<{ invoice: Invoice }>({
    url: `${API_ROUTES.INVOICES.BASE}/${id}`,
    method: "PATCH",
    data: payload,
  });
  return normalizeInvoice(response.invoice);
};
