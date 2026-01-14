import { useCallback, useState } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";

type LoginResponse = { user: { id: string; name: string; email: string } };

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string, remember?: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await makeRequest<LoginResponse>({
        url: API_ROUTES.AUTH.LOGIN,
        method: "POST",
        data: { email, password },
      });

      Cookies.set("logged_in", "true", {
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
        ...(remember ? { expires: 30 } : {}),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err instanceof Error ? err : new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error };
};
