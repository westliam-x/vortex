"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingFooter, MarketingNav } from "@/features/marketing";
import { pricingPlans } from "./config";
import PricingHero from "./components/PricingHero";
import PricingToggle from "./components/PricingToggle";
import PricingCard from "./components/PricingCard";
import FAQSection from "./components/FAQSection";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(720px circle at 6% -8%, rgba(0,255,148,0.12), transparent 60%), radial-gradient(760px circle at 94% 8%, rgba(0,122,255,0.16), transparent 58%)",
        }}
      />
      <MarketingNav />

      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--blue)] bg-[var(--surface2)] px-4 py-2.5 text-sm font-medium text-[var(--text)] shadow-[0_0_0_1px_rgba(0,122,255,0.25)] hover:bg-[var(--surface)]"
            >
              ← Home
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--mint)]" />
              Powered by Blaaiz
            </div>
          </div>

          <PricingHero />

          <div className="flex justify-center">
            <PricingToggle value={billing} onChange={setBilling} />
          </div>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} billing={billing} highlighted={plan.id === "pro"} />
            ))}
          </section>

          <FAQSection />
        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
