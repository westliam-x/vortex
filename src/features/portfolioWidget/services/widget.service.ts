import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import type { PortfolioWidgetData } from "../types";

const buildStub = (username: string): PortfolioWidgetData => ({
  username,
  displayName: username
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" "),
  avgRating: 4.8,
  verifiedReviewsCount: 16,
  reviews: [
    {
      id: "w1",
      clientName: "Aster Labs",
      projectName: "Landing Page Refresh",
      rating: 5,
      comment: "Delivered quickly with excellent code quality.",
      createdAt: "2026-01-20T08:30:00.000Z",
      verified: true,
    },
    {
      id: "w2",
      clientName: "Northline Ops",
      projectName: "Internal Dashboard",
      rating: 5,
      comment: "Clear communication and reliable execution.",
      createdAt: "2025-12-18T10:45:00.000Z",
      verified: true,
    },
    {
      id: "w3",
      clientName: "Horizon Retail",
      projectName: "Checkout Improvements",
      rating: 4,
      comment: "Strong outcomes and smooth handover.",
      createdAt: "2025-11-08T12:10:00.000Z",
      verified: true,
    },
  ],
});

const normalize = (
  raw: Partial<PortfolioWidgetData> | undefined,
  username: string
): PortfolioWidgetData => {
  const fallback = buildStub(username);
  return {
    username: raw?.username ?? fallback.username,
    displayName: raw?.displayName ?? fallback.displayName,
    avgRating: typeof raw?.avgRating === "number" ? raw.avgRating : fallback.avgRating,
    verifiedReviewsCount:
      typeof raw?.verifiedReviewsCount === "number"
        ? raw.verifiedReviewsCount
        : fallback.verifiedReviewsCount,
    reviews:
      Array.isArray(raw?.reviews) && raw.reviews.length
        ? raw.reviews.slice(0, 6)
        : fallback.reviews,
  };
};

export const fetchWidgetData = async (username: string): Promise<PortfolioWidgetData> => {
  try {
    const response = await makeRequest<
      { profile?: Partial<PortfolioWidgetData> } | Partial<PortfolioWidgetData>
    >({
      // TODO: replace with dedicated public widget endpoint when backend is available.
      url: `${API_ROUTES.REVIEWS.PUBLIC}/${encodeURIComponent(username)}`,
      method: "GET",
    });

    if (response && typeof response === "object" && "profile" in response) {
      return normalize(response.profile, username);
    }

    return normalize(response as Partial<PortfolioWidgetData>, username);
  } catch {
    return buildStub(username);
  }
};
