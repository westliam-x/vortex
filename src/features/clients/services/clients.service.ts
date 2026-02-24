import API_ROUTES from "@/endpoints/routes";
import { Client } from "@/types/client";
import { getId } from "@/lib/ids";
import { makeRequest } from "@/api/request";

const normalizeClient = (client: Client & { id?: string; _id?: string }) => {
  if (!client.id && client._id) {
    return { ...client, id: client._id };
  }
  return client;
};

export const fetchClients = async (): Promise<Client[]> => {
  const response = await makeRequest<{ clients: Client[] }>({
    url: API_ROUTES.CLIENT.LIST,
    method: "GET",
  });

  return response.clients.map(normalizeClient);
};

export const fetchClientById = async (id: string): Promise<Client | null> => {
  const clients = await fetchClients();
  return clients.find((client) => getId(client) === id) ?? null;
};
