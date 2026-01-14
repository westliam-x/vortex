import API_ROUTES from "@/endpoints/routes";
import { safeRequest } from "@/lib";
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
  const response = await safeRequest<{ user: USER_RESPONSE }>(
    {
      url: API_ROUTES.AUTH.PROFILE,
      method: "GET",
    },
    {
      user: {
        id: "local",
        firstName: "Vortex",
        secondName: "User",
        name: "Vortex User",
        email: "user@vortex.app",
        phone: "",
        country: "Remote",
      },
    }
  );

  return response.user;
};
