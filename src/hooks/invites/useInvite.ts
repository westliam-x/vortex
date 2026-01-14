import { useCallback, useEffect, useState } from "react";
import { makeRequest } from "@/api/request";

type InviteDetails = {
  type: "Client" | "Team";
  role?: string;
  inviterName?: string;
  expiresAt?: string;
  status: "pending" | "accepted" | "declined" | "expired";
};

type InviteProject = { id: string; _id?: string; title?: string };

export const useInvite = (token: string) => {
  const [invite, setInvite] = useState<InviteDetails | null>(null);
  const [projects, setProjects] = useState<InviteProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvite = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await makeRequest<{ invite: InviteDetails; projects: InviteProject[] }>({
        url: `/users/invites/${token}`,
        method: "GET",
      });
      setInvite(response.invite);
      setProjects(response.projects ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invite not found");
      setInvite(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInvite();
  }, [fetchInvite]);

  const acceptInvite = useCallback(async () => {
    if (!token) return null;
    setActionLoading(true);
    try {
      const response = await makeRequest<{ memberId?: string; clientId?: string }>({
        url: `/users/invites/${token}/accept`,
        method: "POST",
      });
      return response;
    } finally {
      setActionLoading(false);
    }
  }, [token]);

  const declineInvite = useCallback(async () => {
    if (!token) return;
    setActionLoading(true);
    try {
      await makeRequest({
        url: `/users/invites/${token}/decline`,
        method: "POST",
      });
    } finally {
      setActionLoading(false);
    }
  }, [token]);

  return { invite, projects, loading, actionLoading, error, refetch: fetchInvite, acceptInvite, declineInvite };
};
