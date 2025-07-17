"use client";

import { useEffect, useState } from "react";
import { ClientCard } from "@/components";
import { Client } from "@/types/client";
import { makeRequest } from "@/api/request"; 
import API_ROUTES from "@/endpoints/routes"; 

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await makeRequest({
          url: API_ROUTES.CLIENT.LIST, 
          method: "GET",
        });
        console.log("Fetched clients:", response);

        setClients((response as { clients: Client[] }).clients); 
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p className="text-gray-300">Loading clients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {clients?.length > 0 ? (
        clients.map((client) => <ClientCard key={client?._id} client={client} />)
      ) : (
        <p className="text-gray-400">No clients found.</p>
      )}
    </div>
  );
};

export default ClientList;
