"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, FolderKanban, MessageSquareShare, Users } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/features/marketing";

const points = [
  "Dashboard surfaces execution risk, activity trend, and priority actions in one glance.",
  "Projects keep scope, budget, deadline, and client context connected to delivery state.",
  "Clients centralize relationship history, metadata, and project links for continuity.",
  "Spaces convert async delivery into a shared operating room for files, status, and messaging.",
  "Team controls keep access clean as collaborators scale.",
];

export default function WorkspaceFeaturePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(760px circle at 10% -8%, rgba(0,255,148,0.12), transparent 62%), radial-gradient(720px circle at 88% 10%, rgba(0,122,255,0.14), transparent 58%)",
        }}
      />
      <MarketingNav />

      <section id="spaces" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Workspace engine</p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Run delivery like a product team, even as a solo operator.</h1>
            <p className="mt-3 max-w-3xl text-[var(--muted)]">
              This layer is where Vortex turns scattered client work into a coherent system: plans, execution, communication, and status all stay linked.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:col-span-2">
              <Image
                src="/illustrations/feature-workspace.svg"
                alt="Workspace feature placeholder"
                width={1400}
                height={860}
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
              <p className="mt-3 text-sm text-[var(--muted)]">Replace with your dashboard + projects + space composite screenshot.</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="text-xl font-semibold">What this unlocks</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <ClipboardCheck size={16} className="mt-0.5 text-[var(--mint)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: FolderKanban, title: "Projects", text: "Execution view with deadlines, priorities, and linked entities." },
              { icon: MessageSquareShare, title: "Spaces", text: "Client-visible collaboration surface for handover and feedback." },
              { icon: Users, title: "Team", text: "Controlled access and collaboration continuity as workload grows." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)]">
                    <Icon size={17} style={{ color: "var(--accent)" }} />
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10">
            <Link href="/features/payments" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--mint)] hover:text-[var(--text)]">
              Next: Invoices & Payments <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
