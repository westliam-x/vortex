import API_ROUTES from "@/endpoints/routes";
import { LogEntry } from "@/types/logs";
import { safeRequest } from "@/lib";
import { mockClients, mockLogs } from "@/data/mock";
import { Client } from "@/types/client";

const normalizeClient = (client: Client & { id?: string; _id?: string }) => {
  if (!client.id && client._id) {
    return { ...client, id: client._id };
  }
  return client;
};

export const getLogs = async (): Promise<LogEntry[]> => {
  const response = await safeRequest<LogEntry[] | { logs: LogEntry[] }>(
    {
      url: API_ROUTES.LOGS.GET,
      method: "GET",
    },
    mockLogs
  );
  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.logs)) {
    return response.logs;
  }
  return [];
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
