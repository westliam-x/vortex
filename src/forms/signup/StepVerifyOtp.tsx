"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, KeyRound, RefreshCcw } from "lucide-react";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { toast } from "react-toastify";

const schema = z.object({
  otp: z.string().min(6, "Enter the 6-digit code"),
});
type FormData = z.infer<typeof schema>;

const easeBezier: [number, number, number, number] = [0.21, 1, 0.21, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeBezier } },
};

const StepVerifyOTP = ({
  email,
  onVerified,
  onBack,
}: {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await makeRequest({
        url: API_ROUTES.AUTH.VERIFY_OTP,
        method: "POST",
        data: { email, otp: data.otp },
      });
      toast.success("Email verified.");
      onVerified();
    } catch {
      toast.error("OTP verification failed.");
    }
  };

  const resendOtp = async () => {
    try {
      await makeRequest({
        url: API_ROUTES.AUTH.SEND_OTP,
        method: "POST",
        data: { email },
      });
      toast.success("OTP resent.");
    } catch {
      toast.error("Failed to resend OTP.");
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]">
        <div className="relative h-2 bg-[var(--surface-2)] mb-6 rounded-full">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: "66%", backgroundColor: "var(--accent)" }}
          />
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center">
          <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
            <KeyRound size={18} style={{ color: "var(--accent)" }} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Verify your email</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Enter the 6-digit code sent to <span className="text-[var(--text)]">{email}</span>.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-1">Verification code</label>
            <input
              {...register("otp")}
              placeholder="123456"
              className={`w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border ${
                errors.otp ? "border-[var(--error)]" : "border-[var(--border)]"
              } text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40`}
            />
            {errors.otp ? (
              <p className="text-xs text-[var(--error)] mt-1">{errors.otp.message}</p>
            ) : null}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)]"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent-strong)] px-4 py-3 font-semibold text-[#041017] transition hover:bg-[var(--accent)] disabled:opacity-60"
            >
              Verify
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={resendOtp}
            className="inline-flex items-center justify-center gap-2 text-xs text-[var(--text-subtle)] hover:text-[var(--text)]"
          >
            <RefreshCcw size={14} />
            Resend code
          </button>
        </form>
      </div>
    </section>
  );
};

export default StepVerifyOTP;
