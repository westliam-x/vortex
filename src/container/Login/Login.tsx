"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Loader2, ShieldCheck, Rocket } from "lucide-react";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// ------------------ Schema & Types ------------------
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

type LoginResponse = {
  user: { id: string; name: string; email: string };
};

// ------------------ Animations ------------------
const easeBezier: [number, number, number, number] = [0.21, 1, 0.21, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeBezier },
  },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ------------------ Helpers ------------------
function getErrorMessage(err: unknown): string {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  try {
    const e = err as { response?: { data?: { message?: string; error?: string } } };
    return e.response?.data?.message ?? e.response?.data?.error ?? "Something went wrong";
  } catch {
    return "Something went wrong";
  }
}

const ACCENT = "#985EFF";

export default function LoginPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema), defaultValues: { remember: true } });

  const onSubmit = async (formData: LoginForm) => {
    try {
      setLoading(true);

      await makeRequest<LoginResponse>({
        url: API_ROUTES.AUTH.LOGIN,
        method: "POST",
        data: { email: formData.email, password: formData.password },
      });

      Cookies.set("logged_in", "true", {
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
        ...(formData.remember ? { expires: 30 } : {}), // session cookie if not remembered
      });

      toast.success("Login successful!");
      await new Promise((res) => setTimeout(res, 350));
      router.push("/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#090909] text-white overflow-x-clip">
      {/* Decorative BG */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "radial-gradient(600px circle at 50% -10%, rgba(152,94,255,0.18), transparent 60%)" }}
      />

      {/* Left / Brand Panel */}
      <section className="relative hidden lg:flex items-center justify-center p-10">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-md">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Rocket size={18} style={{ color: ACCENT }} />
            </span>
            <h1 className="text-2xl font-bold" style={{ color: ACCENT }}>Vortex</h1>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold leading-tight">
            Ship work, not tabs.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-gray-300">
            Projects, client comms, Vortex spaces, and invoices in one calm place built for remote developers.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-6 space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2"><ShieldCheck size={16} style={{ color: ACCENT }} /> Share a single Vortex link per project</li>
            <li className="flex items-start gap-2"><ShieldCheck size={16} style={{ color: ACCENT }} /> One‑click PDF invoices (USD / NGN)</li>
            <li className="flex items-start gap-2"><ShieldCheck size={16} style={{ color: ACCENT }} /> Keep updates, links, and docs together</li>
          </motion.ul>
        </motion.div>

        {/* subtle gradient blob */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(152,94,255,0.35), transparent)" }}
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 2.2, ease: easeBezier, repeat: Infinity, repeatType: "mirror" }}
          />
        )}
      </section>

      {/* Right / Form Panel */}
      <section className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f]/90 p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
        >
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center">Welcome back</motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-center text-sm text-gray-400">
              Log in to manage your Vortex workspace
            </motion.p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              {/* Email */}
              <motion.div variants={fadeUp}>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
                <div className={`relative`}> 
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-3 py-3 rounded-lg bg-[#141421] border ${errors.email ? "border-red-500" : "border-gray-700"} text-white focus:outline-none focus:ring-2 focus:ring-[${ACCENT}]`}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div variants={fadeUp}>
                <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={16} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password")}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-3 rounded-lg bg-[#141421] border ${errors.password ? "border-red-500" : "border-gray-700"} text-white focus:outline-none focus:ring-2 focus:ring-[${ACCENT}]`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-xs text-red-400 mt-1">{errors.password.message}</p>
                )}
              </motion.div>

              {/* Remember & Forgot */}
              <motion.div variants={fadeUp} className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 select-none">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-[#141421]" {...register("remember")} />
                  <span className="text-gray-300">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-gray-400 hover:text-white">Forgot password?</Link>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={fadeUp}
                type="submit"
                disabled={loading}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[${ACCENT}] px-4 py-3 font-semibold text-white transition hover:bg-[#8d5df9] disabled:opacity-70`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Logging in…
                  </>
                ) : (
                  <>
                    Login <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="h-px flex-1 bg-white/10" />
                or
                <div className="h-px flex-1 bg-white/10" />
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={ "#"}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                >
                  <Github className="h-4 w-4" /> Continue with GitHub
                </a>
                <a
                  href={ "#"}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                >
                  
                  <Mail className="h-4 w-4" /> Continue with Google
                </a>
              </div>

              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account? {" "}
                <Link href="/signup" className="text-white hover:underline">Create one</Link>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
