import { useCallback, useEffect, useRef, useState } from "react";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { safeRequest } from "@/lib";
import type { VortexMessage } from "@/types/vortex";

export const useVortexMessages = (
  projectId?: string,
  fallback?: VortexMessage[]
) => {
  const [messages, setMessages] = useState<VortexMessage[]>(fallback ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fallbackRef = useRef<VortexMessage[]>(fallback ?? []);

  useEffect(() => {
    fallbackRef.current = fallback ?? [];
  }, [fallback]);

  const fetchMessages = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await safeRequest<VortexMessage[]>(
        {
          url: `${API_ROUTES.VORTEX.SUMMARY}/${projectId}/messages`,
          method: "GET",
        },
        fallbackRef.current
      );
      setMessages(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const sendMessage = useCallback(
    async (body: string) => {
      if (!projectId || !body.trim()) return null;
      const created = await makeRequest<VortexMessage>({
        url: `${API_ROUTES.VORTEX.SUMMARY}/${projectId}/messages`,
        method: "POST",
        data: { body: body.trim() },
      });
      setMessages((prev) => [created, ...prev]);
      return created;
    },
    [projectId]
  );

  return { messages, loading, error, fetchMessages, sendMessage, setMessages };
};
