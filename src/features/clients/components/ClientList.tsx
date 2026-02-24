"use client";

import { ClientCard } from "@/components";
import { Button, EmptyState, ErrorState, Skeleton } from "@/components/ui";
import { getId } from "@/lib/ids";
import { useClients } from "../hooks/useClients";

const ClientList = () => {
  const { clients, loading, error, refetch } = useClients();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
        action={<Button onClick={refetch}>Retry</Button>}
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {clients.map((client) => (
        <ClientCard key={getId(client) ?? client.email} client={client} />
      ))}
    </div>
  );
};

export default ClientList;
