/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { makeRequest } from "@/api/request";
import { toast } from "react-toastify";
import API_ROUTES from "@/endpoints/routes";

type FormShape = { otp: string };

const ACCENT = "#985EFF";
const CODE_LEN = 6;

// Framer Motion variants (typed)
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

const StepVerifyOTP = ({
  email,
  onVerified,
  onBack,
}: {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}) => {
  const reduce = useReducedMotion();
  const {
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormShape>({ defaultValues: { otp: "" } });

  // segmented code inputs
  const [digits, setDigits] = useState<string[]>(
    Array.from({ length: CODE_LEN }, () => "")
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // keep RHF value in sync
  useEffect(() => {
    setValue("otp", digits.join(""));
  }, [digits, setValue]);

  const focusIndex = (i: number) => {
    const el = inputsRef.current[i];
    if (el) el.focus();
  };

  const handleChange =
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // accept only digits, take last char typed
      const val = (raw.match(/\d/g) || []).join("").slice(-1) ?? "";
      setDigits((prev) => {
        const next = [...prev];
        next[idx] = val;
        return next;
      });
      clearErrors("otp");
      if (val && idx < CODE_LEN - 1) focusIndex(idx + 1);
    };

  const handleKeyDown =
    (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;
      if (key === "Backspace") {
        if (digits[idx]) {
          // clear current
          setDigits((prev) => {
            const next = [...prev];
            next[idx] = "";
            return next;
          });
        } else if (idx > 0) {
          focusIndex(idx - 1);
          setDigits((prev) => {
            const next = [...prev];
            next[idx - 1] = "";
            return next;
          });
        }
      } else if (key === "ArrowLeft" && idx > 0) {
        e.preventDefault();
        focusIndex(idx - 1);
      } else if (key === "ArrowRight" && idx < CODE_LEN - 1) {
        e.preventDefault();
        focusIndex(idx + 1);
      } else if (key === "Enter") {
        // allow submit on Enter
        void onSubmit();
      }
    };

  const handlePaste =
    (idx: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      const text = e.clipboardData.getData("text");
      const pasteDigits = (text.match(/\d/g) || []).slice(0, CODE_LEN);
      if (!pasteDigits.length) return;
      e.preventDefault();
      setDigits((prev) => {
        const next = [...prev];
        for (let i = 0; i < pasteDigits.length && idx + i < CODE_LEN; i++) {
          next[idx + i] = pasteDigits[i];
        }
        return next;
      });
      const endIndex = Math.min(idx + pasteDigits.length, CODE_LEN - 1);
      focusIndex(endIndex);
      clearErrors("otp");
    };

  const codeFilled = digits.every((d) => d.length === 1);
  const code = digits.join("");

  const submitHandler = async () => {

    try {
      makeRequest({
        url: API_ROUTES.AUTH.VERIFY_OTP,
        method: "POST",
        data: { email, otp: code },
      });
      toast.success("OTP verified successfully!");
      onVerified();
    } catch (error) {
      toast.error("Invalid OTP, please try again.");
      console.error("OTP verification failed", error);
    }
  
  };

  const onSubmit = handleSubmit(submitHandler);

  // simple resend UX (cooldown)
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (!cooldown) return;
    const t = setInterval(() => setCooldown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const resend = () => {
    if (cooldown) return;
    // Integrate your resend API call here
    setCooldown(30);
  };

  return (
    <section className="relative w-full">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(520px circle at 50% -10%, rgba(152,94,255,0.18), transparent 60%)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className="w-full max-w-xl mx-auto"
      >
        <div className="rounded-2xl border border-white/10 bg-[#0f0f0f]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">
          {/* Top progress bar (2/3) */}
          <div className="relative h-2 bg-black/30">
            <div
              className="absolute inset-y-0 left-0"
              style={{ width: "66%", backgroundColor: ACCENT }}
            />
          </div>

          <div className="p-7 sm:p-8">
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="text-center"
            >
              <motion.div
                variants={fadeUp}
                className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              >
                <ShieldCheck size={18} style={{ color: ACCENT }} />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-3xl font-extrabold"
              >
                Verify your email
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-2 text-sm text-gray-400">
                We sent a one-time code to{" "}
                <span className="text-gray-100 font-medium">{email}</span>
              </motion.p>

              {/* Steps */}
              <motion.ol
                variants={fadeUp}
                className="mt-4 flex items-center justify-center gap-3 text-[11px] text-gray-400"
              >
                <li>1. Email</li>
                <span className="opacity-40">•</span>
                <li className="font-medium text-white">2. Verify</li>
                <span className="opacity-40">•</span>
                <li>3. Details</li>
              </motion.ol>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={stagger}
              initial="hidden"
              animate="show"
              onSubmit={onSubmit}
              className="mt-6 space-y-6"
              noValidate
            >
              {/* Segmented OTP inputs */}
              <motion.div variants={fadeUp} className="flex justify-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  {digits.map((val, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputsRef.current[i] = el) as any}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={val}
                      onChange={handleChange(i)}
                      onKeyDown={handleKeyDown(i)}
                      onPaste={handlePaste(i)}
                      aria-label={`Digit ${i + 1}`}
                      className={`w-11 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl tracking-widest rounded-lg bg-[#141421] border ${
                        errors.otp ? "border-red-500" : "border-gray-700"
                      } text-white focus:outline-none focus:ring-2 focus:ring-[#985EFF]`}
                    />
                  ))}
                </div>
              </motion.div>

              {errors.otp && (
                <motion.p
                  variants={fadeUp}
                  className="text-center text-xs text-red-400 -mt-2"
                  aria-live="polite"
                >
                  {errors.otp.message}
                </motion.p>
              )}

              {/* Actions */}
              <motion.div variants={fadeUp} className="space-y-3">
                <button
                  type="submit"
                  disabled={!codeFilled || isSubmitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#985EFF] px-4 py-3 font-semibold text-white transition hover:bg-[#8d5df9] disabled:opacity-60"
                >
                  Verify & Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={onBack}
                  className="w-full py-2 rounded-lg border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 transition"
                >
                  ← Back
                </button>

                <div className="text-center text-sm text-gray-400">
                  Didn&apos;t get the code?{" "}
                  <button
                    type="button"
                    onClick={resend}
                    disabled={!!cooldown}
                    className="underline decoration-white/20 underline-offset-4 disabled:opacity-60"
                    style={{ color: ACCENT }}
                  >
                    {cooldown ? `Resend in ${cooldown}s` : "Resend code"}
                  </button>
                </div>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.div>

      {/* Soft ambient blob */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(152,94,255,0.35), transparent)",
          }}
          initial={{ opacity: 0.6, scale: 0.9 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{
            duration: 2.2,
            ease: easeBezier,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      )}
    </section>
  );
};

export default StepVerifyOTP;
