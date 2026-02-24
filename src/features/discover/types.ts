export type DiscoverRole = "Backend" | "Frontend" | "UI/UX" | "DevOps" | "PM";

export type DiscoverDeveloper = {
  id: string;
  name: string;
  headline: string;
  roles: DiscoverRole[];
  stack: string[];
  timezone: string;
  reputation: number;
  verifiedReviews: number;
  completedProjects: number;
};

export type DiscoverFiltersState = {
  role: DiscoverRole | "All";
  stack: string | "All";
  timezone: string | "All";
};

export const defaultDiscoverFilters: DiscoverFiltersState = {
  role: "All",
  stack: "All",
  timezone: "All",
};
