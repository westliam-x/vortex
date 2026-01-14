import { makeRequest, type RequestParams } from "@/api/request";

export async function safeRequest<T>(
  params: RequestParams,
  fallback: T
): Promise<T> {
  try {
    return await makeRequest<T>(params);
  } catch {
    return fallback;
  }
}
