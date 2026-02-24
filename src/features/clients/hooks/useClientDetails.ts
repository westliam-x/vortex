import { useEffect, useState } from "react";
import { Client } from "@/types/client";
import { fetchClientById } from "../services/clients.service";

export const useClientDetails = (id?: string) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await fetchClientById(id);
      if (!mounted) return;
      setClient(data);
      setLoading(false);
    };
    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  return { client, loading };
};
