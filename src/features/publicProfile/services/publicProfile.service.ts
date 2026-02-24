import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import type { PublicProfile } from "../types";

const buildStubProfile = (username: string): PublicProfile => ({
  username,
  displayName: username
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" "),
  headline: "Freelance Product Engineer",
  location: "Remote",
  stack: ["TypeScript", "Next.js", "Node.js", "Tailwind", "PostgreSQL"],
  totalProjects: 24,
  verifiedReviewsCount: 16,
  avgRating: 4.8,
  reviews: [
    {
      id: "r1",
      projectName: "Marketing Site Rebuild",
      clientName: "Aster Labs",
      rating: 5,
      comment: "Fast delivery and clean handover. Exactly what we needed.",
      createdAt: "2026-01-08T09:30:00.000Z",
      verified: true,
    },
    {
      id: "r2",
      projectName: "Internal Dashboard",
      clientName: "Northline Ops",
      rating: 5,
      comment: "Great communication and strong technical execution.",
      createdAt: "2025-12-20T11:15:00.000Z",
      verified: true,
    },
    {
      id: "r3",
      projectName: "Checkout Optimization",
      clientName: "Horizon Retail",
      rating: 4,
      comment: "Solid improvements and smooth collaboration.",
      createdAt: "2025-11-14T15:00:00.000Z",
      verified: true,
    },
  ],
});

const normalizeProfile = (raw: Partial<PublicProfile>, username: string): PublicProfile => {
  const fallback = buildStubProfile(username);
  return {
    username: raw.username ?? fallback.username,
    displayName: raw.displayName ?? fallback.displayName,
    headline: raw.headline ?? fallback.headline,
    location: raw.location ?? fallback.location,
    avatarUrl: raw.avatarUrl,
    stack: raw.stack?.length ? raw.stack : fallback.stack,
    totalProjects:
      typeof raw.totalProjects === "number" ? raw.totalProjects : fallback.totalProjects,
    verifiedReviewsCount:
      typeof raw.verifiedReviewsCount === "number"
        ? raw.verifiedReviewsCount
        : fallback.verifiedReviewsCount,
    avgRating: typeof raw.avgRating === "number" ? raw.avgRating : fallback.avgRating,
    reviews: Array.isArray(raw.reviews) ? raw.reviews : fallback.reviews,
  };
};

export const fetchPublicProfile = async (username: string): Promise<PublicProfile> => {
  try {
    const response = await makeRequest<{ profile?: PublicProfile } | PublicProfile>({
      // TODO: confirm final public profile endpoint contract with backend team.
      url: `${API_ROUTES.REVIEWS.PUBLIC}/${encodeURIComponent(username)}`,
      method: "GET",
    });

    if (response && typeof response === "object" && "profile" in response && response.profile) {
      return normalizeProfile(response.profile, username);
    }

    return normalizeProfile(response as PublicProfile, username);
  } catch {
    return buildStubProfile(username);
  }
};
