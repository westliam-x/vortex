"use client";

import { useState } from "react";
import { pricingPlans } from "./config";
import PricingHero from "./components/PricingHero";
import PricingToggle from "./components/PricingToggle";
import PricingCard from "./components/PricingCard";
import FAQSection from "./components/FAQSection";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
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
    </main>
  );
}
