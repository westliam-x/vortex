import type { DiscoverDeveloper } from "../types";

const mockDevelopers: DiscoverDeveloper[] = [
  {
    id: "dev-1",
    name: "Amina Cole",
    headline: "Backend engineer focused on resilient API architecture.",
    roles: ["Backend", "DevOps"],
    stack: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    timezone: "America/New_York",
    reputation: 4.9,
    verifiedReviews: 18,
    completedProjects: 31,
  },
  {
    id: "dev-2",
    name: "Jules Park",
    headline: "Frontend engineer building high-quality product interfaces.",
    roles: ["Frontend", "UI/UX"],
    stack: ["React", "Next.js", "TypeScript", "Figma"],
    timezone: "Europe/London",
    reputation: 4.8,
    verifiedReviews: 14,
    completedProjects: 25,
  },
  {
    id: "dev-3",
    name: "Diego Vega",
    headline: "Product-minded PM for fast moving software teams.",
    roles: ["PM"],
    stack: ["Notion", "Linear", "Analytics"],
    timezone: "America/Los_Angeles",
    reputation: 4.7,
    verifiedReviews: 9,
    completedProjects: 20,
  },
  {
    id: "dev-4",
    name: "Kemi Alade",
    headline: "Full-stack engineer with emphasis on platform reliability.",
    roles: ["Backend", "Frontend", "DevOps"],
    stack: ["Node.js", "React", "Kubernetes", "GCP"],
    timezone: "UTC",
    reputation: 5.0,
    verifiedReviews: 22,
    completedProjects: 40,
  },
  {
    id: "dev-5",
    name: "Noah Byrne",
    headline: "Design systems engineer for multi-product teams.",
    roles: ["Frontend", "UI/UX"],
    stack: ["React", "Storybook", "Tailwind", "TypeScript"],
    timezone: "America/Chicago",
    reputation: 4.6,
    verifiedReviews: 11,
    completedProjects: 19,
  },
];

export const fetchDiscoverDevelopers = async (): Promise<DiscoverDeveloper[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockDevelopers;
};
