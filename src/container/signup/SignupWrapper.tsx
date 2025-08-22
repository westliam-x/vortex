"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants, useReducedMotion } from "framer-motion";
import { Rocket, ShieldCheck } from "lucide-react";
import { StepDetails, StepEmail, StepVerifyOTP } from "@/forms";

const ACCENT = "#985EFF";


const easeBezier: [number, number, number, number] = [0.21, 1, 0.21, 1];
const slide: Variants = {
  initial: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeBezier } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24, transition: { duration: 0.35, ease: "easeOut" } }),
};

export default function SignupWrapper() {
  const reduce = useReducedMotion();

  const [step, setStep] = useState(1);
  const [prev, setPrev] = useState(1);
  const [email, setEmail] = useState("");

  
  const details = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      phone: "",
      country: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const goTo = (next: number) => {
    setPrev(step);
    setStep(next);
  };
  const direction = step > prev ? 1 : -1;

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#090909] text-white overflow-x-clip">
      
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(720px circle at 50% -10%, rgba(152,94,255,0.18), transparent 60%)",
        }}
      />


      <section className="relative hidden lg:flex items-center justify-center p-8 xl:p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Rocket size={18} style={{ color: ACCENT }} />
            </span>
            <h1 className="text-2xl font-bold" style={{ color: ACCENT }}>
              Vortex
            </h1>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight">Create your workspace</h2>
          <p className="mt-3 text-gray-300">
            Projects, client comms, Vortex spaces, and invoices—streamlined for remote dev teams.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <ShieldCheck size={16} style={{ color: ACCENT }} /> Share a single Vortex link per project
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={16} style={{ color: ACCENT }} /> One-click PDF invoices (USD / NGN)
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={16} style={{ color: ACCENT }} /> Keep updates, links, and docs together
            </li>
          </ul>

          <div className="mt-8 text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Log in
            </Link>
          </div>
        </div>


        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full"
            style={{
              background: "radial-gradient(closest-side, rgba(152,94,255,0.35), transparent)",
            }}
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 2.2, ease: easeBezier, repeat: Infinity, repeatType: "mirror" }}
          />
        )}
      </section>


      <section className="relative flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl">
          
          <div className="mb-4 flex items-center justify-between text-xs text-gray-400">
            <span>Step {step} of 3</span>
            <Link href="/" className="hover:text-white">
              Back to home
            </Link>
          </div>


          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              variants={slide}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
            >
              {step === 1 && (
                <StepEmail
                  initialEmail={email}
                  onNext={(emailInput) => {
                    setEmail(emailInput);
                    goTo(2);
                  }}
                />
              )}

              {step === 2 && (
                <StepVerifyOTP
                  email={email}
                  onVerified={() => goTo(3)}
                  onBack={() => goTo(1)}
                />
              )}

              {step === 3 && (
                <StepDetails
                  email={email}
                  initialData={details}
                  onBack={() => goTo(2)}
                />
              )}
            </motion.div>
          </AnimatePresence>


          <p className="mt-6 text-center text-xs text-gray-500">
            Having trouble?{" "}
            <a href="mailto:support@vortex.app" className="hover:underline">
              Contact support
            </a>
          </p>
        </div>


        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(152,94,255,0.35), transparent)" }}
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 2.2, ease: easeBezier, repeat: Infinity, repeatType: "mirror" }}
          />
        )}
      </section>
    </main>
  );
}
