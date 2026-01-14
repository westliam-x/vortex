"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";
import { useLogin } from "@/hooks/auth/useLogin";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;
const easeBezier: [number, number, number, number] = [0.21, 1, 0.21, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeBezier } },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

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

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: true },
  });

  const onSubmit = async (formData: LoginForm) => {
    try {
      await login(formData.email, formData.password, formData.remember);

      toast.success("Login successful!");
      await new Promise((res) => setTimeout(res, 350));
      const invite = searchParams.get("invite");
      const next = searchParams.get("next");
      if (next) {
        router.push(next);
        return;
      }
      if (invite) {
        router.push(`/invites/${invite}`);
        return;
      }
      router.push("/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--bg)] text-[var(--text)] overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(700px circle at 10% -10%, rgba(34,211,238,0.18), transparent 60%)",
        }}
      />

      <section className="relative hidden lg:flex items-center justify-center p-10">
        <motion.div initial="hidden" animate="show" variants={fade} className="max-w-md">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <Sparkles size={18} style={{ color: "var(--accent)" }} />
            </span>
            <h1 className="text-2xl font-semibold text-[var(--text)]">Vortex</h1>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl font-semibold leading-tight">
            Welcome back to your workspace.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[var(--text-muted)]">
            Ship work with clarity. Keep clients, payments, and approvals aligned.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-6 space-y-3 text-sm text-[var(--text-muted)]">
            <li className="flex items-start gap-2">
              <ShieldCheck size={16} style={{ color: "var(--accent)" }} /> Guest access with magic links
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={16} style={{ color: "var(--accent)" }} /> Verified reviews after project close
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={16} style={{ color: "var(--accent)" }} /> Payment tracking built in
            </li>
          </motion.ul>
        </motion.div>

        {!reduce ? (
          <motion.div
            aria-hidden
            className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.35), transparent)" }}
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 2.2, ease: easeBezier, repeat: Infinity, repeatType: "mirror" }}
          />
        ) : null}
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold text-center">
            Log in
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-2 text-center text-sm text-[var(--text-muted)]">
            Manage your Vortex workspace and client delivery.
          </motion.p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <motion.div variants={fadeUp}>
              <label htmlFor="email" className="block text-sm text-[var(--text-muted)] mb-1">
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)]">
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
                  placeholder="you@studio.com"
                  className={`w-full pl-10 pr-3 py-3 rounded-lg bg-[var(--surface-2)] border ${
                    errors.email ? "border-[var(--error)]" : "border-[var(--border)]"
                  } text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40`}
                />
              </div>
              {errors.email ? (
                <p id="email-error" className="text-xs text-[var(--error)] mt-1">
                  {errors.email.message}
                </p>
              ) : null}
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="password" className="block text-sm text-[var(--text-muted)] mb-1">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)]">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  placeholder="********"
                  className={`w-full pl-10 pr-10 py-3 rounded-lg bg-[var(--surface-2)] border ${
                    errors.password ? "border-[var(--error)]" : "border-[var(--border)]"
                  } text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] hover:text-[var(--text)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password ? (
                <p id="password-error" className="text-xs text-[var(--error)] mt-1">
                  {errors.password.message}
                </p>
              ) : null}
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[var(--border)] bg-[var(--surface-2)]"
                  {...register("remember")}
                />
                <span className="text-[var(--text-muted)]">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-[var(--text-subtle)] hover:text-[var(--text)]">
                Forgot password?
              </Link>
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-strong)] px-4 py-3 font-semibold text-[#041017] transition hover:bg-[var(--accent)] disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            <div className="flex items-center gap-3 text-xs text-[var(--text-subtle)]">
              <div className="h-px flex-1 bg-[var(--border)]" />
              or
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm hover:bg-[var(--surface)]"
              >
                <Github className="h-4 w-4" /> Continue with GitHub
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm hover:bg-[var(--surface)]"
              >
                <Mail className="h-4 w-4" /> Continue with Google
              </button>
            </div>

            <p className="text-center text-sm text-[var(--text-subtle)]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[var(--text)] hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
