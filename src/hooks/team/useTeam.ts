import { useCallback, useEffect, useRef, useState } from "react";
import type { TeamMember } from "@/types/team";
import { fetchTeam, removeTeamMember, updateTeamRole } from "@/services/teamServices";

export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  const load = useCallback(async (signal?: AbortSignal) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTeam(signal ? { signal } : undefined);
      if (signal?.aborted) return;
      setTeam(data);
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(err instanceof Error ? err.message : "Failed to load team");
    } finally {
      inFlightRef.current = false;
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const changeRole = useCallback(async (memberId: string, role: TeamMember["role"]) => {
    const updated = await updateTeamRole(memberId, role);
    setTeam((prev) => prev.map((m) => (m.id === memberId ? updated : m)));
  }, []);

  const removeMember = useCallback(async (memberId: string) => {
    await removeTeamMember(memberId);
    setTeam((prev) => prev.filter((m) => m.id !== memberId));
  }, []);

  return { team, loading, error, refetch: load, changeRole, removeMember };
};
