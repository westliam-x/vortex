"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Brain, FileText, Settings2, ShieldCheck } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/features/marketing";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const voraCapabilities = [
  {
    icon: FileText,
    title: "Owner-only draft generation",
    body: "Generate polished client messages from project context without auto-posting to message threads.",
  },
  {
    icon: Settings2,
    title: "Provider and mode controls",
    body: "Switch provider and mode (mock/live) with graceful fallbacks when keys are unavailable.",
  },
  {
    icon: Brain,
    title: "Structured quick actions",
    body: "Payment follow-up, scope clarification, deadline update, and next-step templates are built in.",
  },
  {
    icon: ShieldCheck,
    title: "Safe-by-default behavior",
    body: "Failures never crash the app. Assistant unavailability resolves to clear user-facing messaging.",
  },
];

export default function VoraAiPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(820px circle at 10% -8%, rgba(0,122,255,0.18), transparent 58%), radial-gradient(840px circle at 92% 10%, rgba(0,255,148,0.16), transparent 56%)",
        }}
      />
      <MarketingNav />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]">
              <Bot size={14} className="text-[var(--mint)]" />
              Vora assistant
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Vora helps you communicate with speed, clarity, and context.
            </h1>
            <p className="mt-3 max-w-3xl text-[var(--muted)]">
              Vora is deeply integrated with your workspace. It drafts from real project context, stays owner-only where required,
              and is configurable across provider, mode, tone, and output behavior.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:col-span-2">
              <Image
                src="/illustrations/landing-vora.svg"
                alt="Vora assistant placeholder"
                width={1400}
                height={860}
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
              <p className="mt-3 text-sm text-[var(--muted)]">
                Replace with your Vora drawer + draft generation + provider selector screenshot.
              </p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="text-xl font-semibold">What Vora does today</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <li>1. Drafts owner messages in space flows.</li>
                <li>2. Supports provider switching and local mock mode.</li>
                <li>3. Integrates quick actions with structured prompt templates.</li>
                <li>4. Powers planning and analytics portal surfaces.</li>
              </ul>
              <Link href="/features" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--mint)] hover:text-[var(--text)]">
                Explore full platform <ArrowRight size={16} />
              </Link>
            </article>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {voraCapabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <motion.article key={capability.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)]">
                      <Icon size={17} style={{ color: "var(--accent)" }} />
                    </span>
                    <h3 className="text-lg font-semibold">{capability.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{capability.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
