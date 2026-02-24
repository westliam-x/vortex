"use client";

import { PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import VoraPortalNav from "./components/VoraPortalNav";

export default function VoraOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Vora" subtitle="Overview of assistant operations and performance." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <SectionCard title="Portal Navigation">
            <VoraPortalNav />
          </SectionCard>
        </aside>

        <section className="space-y-4 lg:col-span-9">
          <SectionCard title="Usage Overview" description="Assistant activity and adoption summary.">
            <p className="text-sm text-[var(--muted)]">
              Placeholder for request volume, active users, and conversation completion rate.
            </p>
          </SectionCard>
          <SectionCard title="Health" description="Provider reliability and fallback behavior.">
            <p className="text-sm text-[var(--muted)]">
              Placeholder for latency, error rates, and live vs mock mode distribution.
            </p>
          </SectionCard>
        </section>
      </div>
    </div>
  );
}
