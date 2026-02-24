import API_ROUTES from "@/endpoints/routes";
import { safeRequest } from "@/lib";
import { mockClients } from "@/data/mock";
import { Client } from "@/types/client";
import { getId } from "@/lib/ids";

const normalizeClient = (client: Client & { id?: string; _id?: string }) => {
  if (!client.id && client._id) {
    return { ...client, id: client._id };
  }
  return client;
};

export const fetchClients = async (): Promise<Client[]> => {
  const response = await safeRequest<{ clients: Client[] }>(
    {
      url: API_ROUTES.CLIENT.LIST,
      method: "GET",
    },
    { clients: mockClients }
  );

  return response.clients.map(normalizeClient);
};

export const fetchClientById = async (id: string): Promise<Client | null> => {
  const clients = await fetchClients();
  return clients.find((client) => getId(client) === id) ?? null;
};
