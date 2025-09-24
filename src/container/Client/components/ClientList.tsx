"use client";

import { useEffect, useState } from "react";
import { ClientCard } from "@/components";
import { Client } from "@/types/client";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { Loader2 } from "lucide-react";

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await makeRequest({
          url: API_ROUTES.CLIENT.LIST,
        });

        setClients((response as { clients: Client[] }).clients);
      } catch (err) {
        console.error(err);
        setError("⚠️ Unable to load clients. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin text-cyan-400" size={28} />
        <span className="ml-2 text-gray-300">Fetching clients...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clients?.length > 0 ? (
        clients.map((client) => (
          <ClientCard key={client._id} client={client} />
        ))
      ) : (
        <div className="col-span-full flex justify-center py-10">
          <p className="text-gray-500 italic">No clients found yet.</p>
        </div>
      )}
    </div>
  );
};

export default ClientList;
