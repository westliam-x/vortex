import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";

export type PaymentEvent = {
  _id?: string;
  id?: string;
  amount: number;
  currency: string;
  note?: string;
  occurredAt?: string;
  status: "posted" | "void";
};

export type PaymentsResponse = {
  data: PaymentEvent[];
  totals: { total: number };
  currency: string;
};

export const fetchProjectPayments = async (
  projectId: string,
  signal?: AbortSignal
): Promise<PaymentsResponse> => {
  return makeRequest<PaymentsResponse>({
    url: `${API_ROUTES.PAYMENTS.BASE}/${projectId}`,
    method: "GET",
    config: signal ? { signal } : undefined,
  });
};
