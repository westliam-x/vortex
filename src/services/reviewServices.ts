import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";
import type { Review } from "@/types/reviews";
import type { AxiosRequestConfig } from "axios";

const normalizeReview = (review: Review & { _id?: string }) => {
  if (!review.id && review._id) {
    return { ...review, id: review._id };
  }
  return review;
};

export const fetchReviews = async (config?: AxiosRequestConfig): Promise<Review[]> => {
  const response = await makeRequest<{ reviews: Review[] }>({
    url: API_ROUTES.REVIEWS.LIST,
    method: "GET",
    config,
  });
  return (response.reviews ?? []).map(normalizeReview);
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
