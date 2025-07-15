"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
 const router = useRouter()
  const onSubmit = (data: LoginForm) => {
    console.log("Login attempt:", data);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-12">
      <div className="w-full max-w-4xl bg-[#1E1E2E] border border-[#2F2F41] rounded-2xl shadow-2xl p-12">
        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-3 tracking-wide">
          Welcome Back
        </h1>
        <p className="text-md text-gray-400 text-center mb-8">
          Log in to manage your Vortex workspace
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-xl mx-auto">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#141421] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
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
              className="w-full px-4 py-3 rounded-lg bg-[#141421] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-cyan-700 hover:bg-cyan-800 transition font-semibold text-white text-base"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-8">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-cyan-400 hover:underline hover:text-cyan-300"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
