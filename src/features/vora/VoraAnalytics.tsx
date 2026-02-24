"use client";

import { PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import VoraPortalNav from "./components/VoraPortalNav";

export default function VoraAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Vora Analytics" subtitle="Insights into assistant output quality and usage." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <SectionCard title="Portal Navigation">
            <VoraPortalNav />
          </SectionCard>
        </aside>

        <section className="space-y-4 lg:col-span-9">
          <SectionCard title="Provider Mix" description="OpenAI vs Claude usage and fallback trends.">
            <p className="text-sm text-[var(--muted)]">
              Placeholder for provider split, failure categories, and time-based comparisons.
            </p>
          </SectionCard>
          <SectionCard title="Draft Quality" description="Signal tracking for approval/edit rates.">
            <p className="text-sm text-[var(--muted)]">
              Placeholder for generated draft acceptance, edit distance, and send-through metrics.
            </p>
          </SectionCard>
        </section>
      </div>
    </div>
  );
}
