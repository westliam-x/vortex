import API_ROUTES from "@/endpoints/routes";
import { Client } from "@/types/client";
import { makeRequest } from "@/api/request";
import type { PaginationMeta } from "@/types/api";

const normalizeClient = (client: Client & { id?: string; _id?: string }) => {
  if (!client.id && client._id) {
    return { ...client, id: client._id };
  }
  return client;
};

type ClientListParams = {
  page: number;
  limit: number;
  filters?: {
    search?: string;
    status?: string;
    sort?: string;
  };
};

type PaginatedClientsResponse = {
  data: Client[];
  pagination: PaginationMeta;
};

export const fetchClients = async ({
  page = 1,
  limit = 20,
  filters,
}: Partial<ClientListParams> = {}): Promise<PaginatedClientsResponse> => {
  const response = await makeRequest<PaginatedClientsResponse>({
    url: API_ROUTES.CLIENT.LIST,
    method: "GET",
    config: {
      params: {
        page,
        limit,
        ...(filters ?? {}),
      },
    },
  });

  return {
    data: (response.data ?? []).map(normalizeClient),
    pagination: response.pagination,
  };
};

export const fetchClientById = async (id: string): Promise<Client | null> => {
  const response = await makeRequest<{ client: Client | null }>({
    url: `${API_ROUTES.CLIENT.BY_ID}/${id}`,
    method: "GET",
  });

  return response.client ? normalizeClient(response.client) : null;
};

export const updateClient = async (id: string, payload: Partial<Client>): Promise<Client> => {
  const response = await makeRequest<{ client: Client }>({
    url: `${API_ROUTES.CLIENT.BY_ID}/${id}`,
    method: "PATCH",
    data: payload,
  });
  return normalizeClient(response.client);
};

export const deleteClient = async (id: string): Promise<void> => {
  await makeRequest({
    url: `${API_ROUTES.CLIENT.BY_ID}/${id}`,
    method: "DELETE",
  });
};
