import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";
import type { Invoice } from "@/lib/invoices";
import type { AxiosRequestConfig } from "axios";

const normalizeInvoice = (invoice: Invoice & { _id?: string }) => {
  if (!invoice.id && invoice._id) {
    return { ...invoice, id: invoice._id };
  }
  return invoice;
};

export const fetchInvoices = async (config?: AxiosRequestConfig): Promise<Invoice[]> => {
  const response = await makeRequest<{ invoices: Invoice[] }>({
    url: API_ROUTES.INVOICES.BASE,
    method: "GET",
    config,
  });
  return (response.invoices ?? []).map(normalizeInvoice);
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
