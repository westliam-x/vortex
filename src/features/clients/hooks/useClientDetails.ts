import { useEffect, useState } from "react";
import { Client } from "@/types/client";
import { fetchClientById } from "../services/clients.service";

export const useClientDetails = (id?: string) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await fetchClientById(id);
        if (!mounted) return;
        setClient(data);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Failed to load client");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void run();
    return () => {
      mounted = false;
    };
  }, [id]);

  return { client, loading, error, setClient };
};
