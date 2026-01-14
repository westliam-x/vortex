import { useCallback, useEffect, useState } from "react";
import { getProfile, USER_RESPONSE } from "@/services/profileServices";

export const useProfile = () => {
  const [profile, setProfile] = useState<USER_RESPONSE | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProfile();
      setProfile(response);
    } catch (err) {
      setProfile({
        id: "local",
        firstName: "Vortex",
        secondName: "User",
        name: "Vortex User",
        email: "user@vortex.app",
        phone: "",
        country: "Remote",
      });
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
};
