import { AxiosError } from "axios";
import { axiosInstance } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import type { ApiResponse } from "@/types/api";

export const BLAAIZ_UNAVAILABLE = "BLAAIZ_UNAVAILABLE";

export type BlaaizStatus = {
  connected: boolean;
  env?: "dev" | "prod";
};

export type BlaaizCollectionPayload = {
  projectId: string;
  invoiceId?: string;
  customer: {
    email: string;
    phone: string;
    name: string;
  };
  walletId: string;
  amount: number;
  currency: string;
  method: string;
  reference: string;
};

export type BlaaizCollectionResult = {
  payment_url: string;
  collection_id: string;
};

export type BlaaizVirtualAccountPayload = {
  wallet_id: string;
  account_name: string;
  customer_id: string;
};

export type BlaaizVirtualAccountResult = {
  id?: string;
  account_number?: string;
  account_name?: string;
  bank_name?: string;
};

const extractApiData = <T,>(response: { data: ApiResponse<T> }) => response.data.data;

export const fetchBlaaizStatus = async (): Promise<BlaaizStatus> => {
  const response = await axiosInstance.get<ApiResponse<BlaaizStatus>>(API_ROUTES.INTEGRATIONS.BLAAIZ_STATUS);
  return extractApiData(response);
};

export const createBlaaizCollection = async (
  payload: BlaaizCollectionPayload
): Promise<BlaaizCollectionResult> => {
  try {
    const response = await axiosInstance.post<ApiResponse<BlaaizCollectionResult>>(
      API_ROUTES.INTEGRATIONS.BLAAIZ_COLLECTIONS,
      payload
    );
    return extractApiData(response);
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: { code?: string; message?: string } }>;
    if (axiosError.response?.status === 503) {
      const unavailableError = new Error("Service unavailable. Retry soon.");
      unavailableError.name = BLAAIZ_UNAVAILABLE;
      throw unavailableError;
    }
    throw new Error(
      axiosError.response?.data?.error?.message ||
        axiosError.message ||
        "Failed to initiate collection."
    );
  }
};

export const createBlaaizVirtualAccount = async (
  payload: BlaaizVirtualAccountPayload
): Promise<BlaaizVirtualAccountResult> => {
  try {
    const response = await axiosInstance.post<ApiResponse<BlaaizVirtualAccountResult>>(
      API_ROUTES.INTEGRATIONS.BLAAIZ_VIRTUAL_BANK_ACCOUNTS,
      payload
    );
    return extractApiData(response);
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: { code?: string; message?: string } }>;
    if (axiosError.response?.status === 503) {
      const unavailableError = new Error("Service unavailable. Retry soon.");
      unavailableError.name = BLAAIZ_UNAVAILABLE;
      throw unavailableError;
    }
    throw new Error(
      axiosError.response?.data?.error?.message ||
        axiosError.message ||
        "Failed to generate virtual account."
    );
  }
};
