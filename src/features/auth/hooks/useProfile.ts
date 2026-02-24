import { useCallback, useEffect, useState } from "react";
import { getProfile, USER_RESPONSE } from "../services/profile.service";
import { usePlanStore } from "@/store/planStore";

export const useProfile = () => {
  const [profile, setProfile] = useState<USER_RESPONSE | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setCurrentPlan = usePlanStore((state) => state.setCurrentPlan);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProfile();
      setProfile(response);
      setCurrentPlan(response.plan);
    } catch (err) {
      setProfile({
        id: "local",
        firstName: "Vortex",
        secondName: "User",
        name: "Vortex User",
        email: "user@vortex.app",
        phone: "",
        country: "Remote",
        plan: "free",
      });
      setCurrentPlan("free");
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [setCurrentPlan]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
};
