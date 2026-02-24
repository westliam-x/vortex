"use client";

import { usePlanStore, type PlanFeatureKey } from "@/store/planStore";

export const useFeature = (featureKey: PlanFeatureKey): { enabled: boolean } => {
  const currentPlan = usePlanStore((state) => state.currentPlan);
  const features = usePlanStore((state) => state.features);

  if (featureKey === "teamLimit") {
    return { enabled: currentPlan !== "free" };
  }

  if (featureKey === "projectsLimit") {
    return { enabled: currentPlan !== "free" };
  }

  return { enabled: Boolean(features[featureKey]) };
};

