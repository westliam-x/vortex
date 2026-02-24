import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import type { DiscoverDeveloper } from "../types";

type DiscoverApiProfile = {
  id: string;
  ownerId: string;
  name: string;
  headline: string;
  rolesOffered: DiscoverDeveloper["roles"];
  techStack: string[];
  timezone: string;
  rating: number;
  verifiedReviews: number;
  completedProjects: number;
};

type DiscoverApiResponse = {
  profiles: DiscoverApiProfile[];
};

export const fetchDiscoverDevelopers = async (): Promise<DiscoverDeveloper[]> => {
  const response = await makeRequest<DiscoverApiResponse>({
    url: API_ROUTES.SIGNAL.DISCOVER,
    method: "GET",
  });

  return (response.profiles ?? []).map((profile) => ({
    id: profile.id || profile.ownerId,
    name: profile.name,
    headline: profile.headline,
    roles: profile.rolesOffered ?? [],
    stack: profile.techStack ?? [],
    timezone: profile.timezone,
    reputation: profile.rating ?? 0,
    verifiedReviews: profile.verifiedReviews ?? 0,
    completedProjects: profile.completedProjects ?? 0,
  }));
};
