import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";

export const handleLogout = async (): Promise<void> => {

  try {
    await makeRequest({
      url: API_ROUTES.AUTH.LOGOUT,
      method: "POST",
    });
  } catch (error) {
    throw error;
  }
};
