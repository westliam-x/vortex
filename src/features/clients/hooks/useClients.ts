import { useCallback, useEffect, useState } from "react";
import { Client } from "@/types/client";
import { fetchClients } from "../services/clients.service";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetchClients();
      setClients(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  return { clients, loading, error, refetch: loadClients };
};
