"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Star, UserRoundCheck } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/features/marketing";

export default function ReviewsFeaturePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(780px circle at 18% -8%, rgba(0,255,148,0.14), transparent 58%), radial-gradient(780px circle at 92% 8%, rgba(0,122,255,0.16), transparent 56%)",
        }}
      />
      <MarketingNav />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Trust and proof</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Turn completed work into verified reputation assets.</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            Vortex reviews are designed to feel transaction-backed. This gives freelancers stronger credibility and gives prospects clearer trust signals.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <Image
                src="/images/reviews.png"
                alt="Reviews feature placeholder"
                width={1400}
                height={860}
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
            </article>

            <article className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4">
                <div className="flex items-center gap-2">
                  <BadgeCheck size={16} className="text-[var(--mint)]" />
                  <h2 className="text-lg font-semibold">Eligibility-aware state</h2>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">Review action reflects payment-linked readiness and avoids dead-end flows.</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-[var(--mint)]" />
                  <h2 className="text-lg font-semibold">Status-normalized lifecycle</h2>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">Pending, submitted, approved, and published states stay consistent across internal and public surfaces.</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4">
                <div className="flex items-center gap-2">
                  <UserRoundCheck size={16} className="text-[var(--mint)]" />
                  <h2 className="text-lg font-semibold">Public conversion leverage</h2>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">Verified review cards also power profile and widget views to increase buyer confidence.</p>
              </div>
            </article>
          </div>

          <div className="mt-10">
            <Link href="/features/signal" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--mint)] hover:text-[var(--text)]">
              Next: Signal and discovery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
