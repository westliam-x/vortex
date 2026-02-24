import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";
import type { Review } from "@/types/reviews";
import type { AxiosRequestConfig } from "axios";
import type { PaginationMeta } from "@/types/api";

const normalizeReview = (review: Review & { _id?: string }) => {
  if (!review.id && review._id) {
    return { ...review, id: review._id };
  }
  return review;
};

type ReviewListParams = {
  page: number;
  limit: number;
  filters?: {
    search?: string;
    status?: string;
    sort?: string;
  };
  config?: AxiosRequestConfig;
};

type PaginatedReviewsResponse = {
  data: Review[];
  pagination: PaginationMeta;
};

export const fetchReviews = async ({
  page = 1,
  limit = 20,
  filters,
  config,
}: Partial<ReviewListParams> = {}): Promise<PaginatedReviewsResponse> => {
  const response = await makeRequest<PaginatedReviewsResponse>({
    url: API_ROUTES.REVIEWS.LIST,
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
    data: (response.data ?? []).map(normalizeReview),
    pagination: response.pagination,
  };
};

export const fetchProjectReview = async (
  projectId: string,
  config?: AxiosRequestConfig
): Promise<Review | null> => {
  const response = await makeRequest<{ review: Review | null }>({
    url: `${API_ROUTES.REVIEWS.PROJECT}/${projectId}`,
    method: "GET",
    config,
  });
  return response.review ? normalizeReview(response.review) : null;
};

export const updateReviewStatus = async (projectId: string, action: "approve" | "reject") => {
  await makeRequest({
    url: `${API_ROUTES.REVIEWS.APPROVE}/${projectId}/${action}`,
    method: "PATCH",
  });
};
