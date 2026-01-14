"use client";

import { useEffect, useState } from "react";
import { ClientCard } from "@/components";
import { Client } from "@/types/client";
import { fetchClients } from "@/services/clientServices";
import { Button, EmptyState, ErrorState, Skeleton } from "@/components/ui";

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadClients = async () => {
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
  };

  useEffect(() => {
    loadClients();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-40" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load clients"
        description="Check your connection or try again."
        action={<Button onClick={loadClients}>Retry</Button>}
      />
    );
  }

  if (clients.length === 0) {
    return (
      <EmptyState
        title="No clients yet"
        description="Invite a client to start collaborating."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clients.map((client) => (
        <ClientCard key={client._id} client={client} />
      ))}
    </div>
  );
};

export default ClientList;
