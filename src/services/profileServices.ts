import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
export interface USER_RESPONSE{
    id: string;
    firstName: string;
    secondName: string;
    name: string;
    email: string;
    phone: string;
    country: string;
}
export const getProfile = async (): Promise<USER_RESPONSE> => {
  const response = await makeRequest<{ user: USER_RESPONSE }>({
    url: API_ROUTES.AUTH.PROFILE,
    method: "GET",
  });

  return response.user;
};
