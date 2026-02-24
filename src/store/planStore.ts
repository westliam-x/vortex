import { create } from "zustand";

export type PlanId = "free" | "pro" | "business";
export type PlanFeatureKey = "voraEnabled" | "signalEnabled" | "analyticsAdvanced" | "projectsLimit" | "teamLimit";

export type PlanFeatures = {
  projectsLimit: number;
  teamLimit: number;
  voraEnabled: boolean;
  signalEnabled: boolean;
  analyticsAdvanced: boolean;
};

const PLAN_FEATURES: Record<PlanId, PlanFeatures> = {
  free: {
    projectsLimit: 3,
    teamLimit: 1,
    voraEnabled: false,
    signalEnabled: false,
    analyticsAdvanced: false,
  },
  pro: {
    projectsLimit: Number.POSITIVE_INFINITY,
    teamLimit: 5,
    voraEnabled: true,
    signalEnabled: true,
    analyticsAdvanced: false,
  },
  business: {
    projectsLimit: Number.POSITIVE_INFINITY,
    teamLimit: Number.POSITIVE_INFINITY,
    voraEnabled: true,
    signalEnabled: true,
    analyticsAdvanced: true,
  },
};

type PlanStore = {
  currentPlan: PlanId;
  features: PlanFeatures;
  setCurrentPlan: (plan?: string | null) => void;
};

const toPlan = (plan?: string | null): PlanId => {
  if (plan === "pro" || plan === "business" || plan === "free") {
    return plan;
  }
  return "free";
};

export const usePlanStore = create<PlanStore>((set) => ({
  currentPlan: "free",
  features: PLAN_FEATURES.free,
  setCurrentPlan: (plan) => {
    const nextPlan = toPlan(plan);
    set({
      currentPlan: nextPlan,
      features: PLAN_FEATURES[nextPlan],
    });
  },
}));

