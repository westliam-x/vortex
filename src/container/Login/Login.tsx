"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: LoginForm) => {
    try {
      setLoading(true);

      const response = await makeRequest<{
        token: string;
        user: { id: string; name: string; email: string };
      }>({
        url: API_ROUTES.AUTH.LOGIN,
        method: "POST",
        data: formData,
      });

      Cookies.set("token", response.token, {
      expires: 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

      toast.success("Login successful!");

      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-12">
      <div className="w-full max-w-4xl bg-[#090909] border border-[#2F2F41] rounded-2xl shadow-2xl p-7">
        <h1 className="text-4xl font-bold text-white text-center mb-3 tracking-wide">
          Welcome Back
        </h1>
        <p className="text-md text-gray-400 text-center mb-8">
          Log in to manage your Vortex workspace
        </p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-6 w-full max-w-xl mx-auto"
        >
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#141421] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#985EFF]"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#141421] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#985EFF]"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg cursor-pointer ${
              loading ? "bg-gray-600" : "bg-[#985EFF] hover:bg-[#985EFF]"
            } transition font-semibold text-white text-base`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-8">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-white hover:underline hover:text-white"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
