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


const ACCENT = "#985EFF";
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
      toast.success("OTP sent, please check your email!");
      onNext(data.email); 
    } catch (error) {
      toast.error("Failed to send OTP.");
      console.error("Failed to send OTP", error);
    }
  };

  return (
    <section className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(520px circle at 50% -10%, rgba(152,94,255,0.18), transparent 60%)",
        }}
      />

      <motion.div initial="hidden" animate="show" variants={fade} className="w-full max-w-xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-[#0f0f0f]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">
          {/* Top bar with stepper */}
          <div className="relative h-2 bg-black/30">
            <div
              className="absolute inset-y-0 left-0"
              style={{ width: "33%", backgroundColor: ACCENT }}
            />
          </div>

          <div className="p-7 sm:p-8">
            <motion.div variants={stagger} initial="hidden" animate="show" className="text-center">
              <motion.div
                variants={fadeUp}
                className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              >
                <Sparkles size={18} style={{ color: ACCENT }} />
              </motion.div>

              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-extrabold">
                Let&apos;s get started
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-2 text-sm text-gray-400">
                Enter your email to begin setting up your Vortex workspace.
              </motion.p>

              <motion.ol
                variants={fadeUp}
                className="mt-4 flex items-center justify-center gap-3 text-[11px] text-gray-400"
              >
                <li className="font-medium text-white">1. Email</li>
                <span className="opacity-40">•</span>
                <li>2. Verify</li>
                <span className="opacity-40">•</span>
                <li>3. Details</li>
              </motion.ol>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={stagger}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-6"
              noValidate
            >
              <motion.div variants={fadeUp}>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
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
                    className={`w-full pl-10 pr-3 py-3 rounded-lg bg-[#141421] border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } text-white focus:outline-none focus:ring-2 focus:ring-[#985EFF]`}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-400 mt-1" aria-live="polite">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-sm text-gray-300 mb-1">
                  What will you use Vortex for?{" "}
                  <span className="text-xs text-gray-500">(optional)</span>
                </label>
                <input
                  {...register("purpose")}
                  placeholder="e.g. Client collaboration, tracking dev progress..."
                  className="w-full px-4 py-3 rounded-lg bg-[#141421] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#985EFF]"
                />
              </motion.div>

              <motion.button
                variants={fadeUp}
                type="submit"
                disabled={isSubmitting || !emailValue}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#985EFF] px-4 py-3 font-semibold text-white transition hover:bg-[#8d5df9] disabled:opacity-60"
              >
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>

              <motion.div variants={fadeUp} className="space-y-3 text-center text-sm">
                <p className="text-gray-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-white hover:underline">
                    Sign in here
                  </Link>
                </p>
                <p className="text-xs text-gray-500">
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

      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(152,94,255,0.35), transparent)",
          }}
          initial={{ opacity: 0.6, scale: 0.9 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 2.2, ease: easeBezier, repeat: Infinity, repeatType: "mirror" }}
        />
      )}
    </section>
  );
};

export default StepEmail;
