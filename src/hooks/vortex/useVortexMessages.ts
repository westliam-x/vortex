import { useCallback, useEffect, useRef, useState } from "react";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
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

  const fetchMessages = useCallback(async (signal?: AbortSignal) => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await makeRequest<VortexMessage[]>({
        url: `${API_ROUTES.VORTEX.SUMMARY}/${projectId}/messages`,
        method: "GET",
        config: signal ? { signal } : undefined,
      });
      setMessages(response ?? []);
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(err instanceof Error ? err.message : "Failed to load messages");
      setMessages(fallbackRef.current);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetchMessages(controller.signal);
    return () => controller.abort();
  }, [projectId, fetchMessages]);

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
