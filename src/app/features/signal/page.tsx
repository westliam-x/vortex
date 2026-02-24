"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Handshake, Signal, UserRoundSearch } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/features/marketing";

export default function SignalFeaturePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(760px circle at 5% -6%, rgba(0,255,148,0.14), transparent 58%), radial-gradient(860px circle at 95% 12%, rgba(0,122,255,0.18), transparent 54%)",
        }}
      />
      <MarketingNav />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Growth network</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Signal intent. Discover fit. Start collaboration faster.</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            Signal turns availability into a structured profile, while Discover helps teams find the right collaborator by role, stack, and readiness.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <Image
                src="/illustrations/feature-signal.svg"
                alt="Signal feature placeholder"
                width={1400}
                height={860}
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
              <p className="mt-3 text-sm text-[var(--muted)]">Replace with Signal profile + Discover grid screenshots.</p>
            </article>
            <article className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              {[
                {
                  icon: Signal,
                  title: "Signal profile",
                  body: "Role, stack, timezone, rate range, and discoverability toggle define collaboration readiness.",
                },
                {
                  icon: Compass,
                  title: "Discover interface",
                  body: "Filterable developer discovery creates a cleaner funnel than ad hoc referrals and chats.",
                },
                {
                  icon: Handshake,
                  title: "Collab requests + smart invites",
                  body: "Project-linked request flow helps owners recruit support without leaving delivery context.",
                },
                {
                  icon: UserRoundSearch,
                  title: "Reputation context",
                  body: "Reputation score and verified signals improve invite quality and reduce mismatch.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-[var(--mint)]" />
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                    </div>
                    <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                  </div>
                );
              })}
            </article>
          </div>

          <div className="mt-10">
            <Link href="/vora-ai" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--mint)] hover:text-[var(--text)]">
              Next: Vora assistant deep dive <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
