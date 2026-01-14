"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Mail, Sparkles, ArrowRight } from "lucide-react";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email("Invalid email"),
  purpose: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const easeBezier: [number, number, number, number] = [0.21, 1, 0.21, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeBezier } },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const StepEmail = ({
  initialEmail,
  onNext,
}: {
  initialEmail: string;
  onNext: (email: string) => void;
}) => {
  const reduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: initialEmail },
  });

  const emailValue = watch("email");

  const onSubmit = async (data: FormData) => {
    try {
      await makeRequest({
        url: API_ROUTES.AUTH.SEND_OTP,
        method: "POST",
        data: { email: data.email },
      });
      toast.success("OTP sent. Check your inbox.");
      onNext(data.email);
    } catch {
      toast.error("Failed to send OTP.");
    }
  };

  return (
    <section className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(520px circle at 50% -10%, rgba(34,211,238,0.18), transparent 60%)",
        }}
      />

      <motion.div initial="hidden" animate="show" variants={fade} className="w-full max-w-xl mx-auto">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_0_0_1px_rgba(0,0,0,0.2)] overflow-hidden">
          <div className="relative h-2 bg-[var(--surface-2)]">
            <div className="absolute inset-y-0 left-0" style={{ width: "33%", backgroundColor: "var(--accent)" }} />
          </div>

          <div className="p-7 sm:p-8">
            <motion.div variants={stagger} initial="hidden" animate="show" className="text-center">
              <motion.div
                variants={fadeUp}
                className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)]"
              >
                <Sparkles size={18} style={{ color: "var(--accent)" }} />
              </motion.div>

              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-semibold">
                Create your workspace
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-2 text-sm text-[var(--text-muted)]">
                Start with your email. We&apos;ll send a quick verification code.
              </motion.p>

              <motion.ol
                variants={fadeUp}
                className="mt-4 flex items-center justify-center gap-3 text-[11px] text-[var(--text-subtle)]"
              >
                <li className="font-medium text-[var(--text)]">1. Email</li>
                <span className="opacity-40">-</span>
                <li>2. Verify</li>
                <span className="opacity-40">-</span>
                <li>3. Details</li>
              </motion.ol>
            </motion.div>

            <motion.form
              variants={stagger}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-6"
              noValidate
            >
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
                  <p id="email-error" className="text-xs text-[var(--error)] mt-1" aria-live="polite">
                    {errors.email.message}
                  </p>
                ) : null}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  What will you use Vortex for? <span className="text-xs text-[var(--text-subtle)]">(optional)</span>
                </label>
                <input
                  {...register("purpose")}
                  placeholder="e.g. Client collaboration, tracking dev progress..."
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                />
              </motion.div>

              <motion.button
                variants={fadeUp}
                type="submit"
                disabled={isSubmitting || !emailValue}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-strong)] px-4 py-3 font-semibold text-[#041017] transition hover:bg-[var(--accent)] disabled:opacity-60"
              >
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>

              <motion.div variants={fadeUp} className="space-y-3 text-center text-sm">
                <p className="text-[var(--text-subtle)]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[var(--text)] hover:underline">
                    Sign in
                  </Link>
                </p>
                <p className="text-xs text-[var(--text-subtle)]">
                  By continuing you agree to our{" "}
                  <Link href="/terms" className="hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.div>

      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(34,211,238,0.35), transparent)",
          }}
          initial={{ opacity: 0.6, scale: 0.9 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 2.2, ease: easeBezier, repeat: Infinity, repeatType: "mirror" }}
        />
      ) : null}
    </section>
  );
};

export default StepEmail;
