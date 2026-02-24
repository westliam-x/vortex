"use client";

import { PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import VoraPortalNav from "./components/VoraPortalNav";

export default function VoraSettings() {
  return (
    <div className="space-y-6">
      <PageHeader title="Vora Settings" subtitle="Provider defaults and assistant behavior controls." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <SectionCard title="Portal Navigation">
            <VoraPortalNav />
          </SectionCard>
        </aside>

        <section className="space-y-4 lg:col-span-9">
          <SectionCard title="Provider Defaults" description="Runtime mode and preferred provider.">
            <p className="text-sm text-[var(--muted)]">
              Placeholder for configurable defaults, key health checks, and environment validation.
            </p>
          </SectionCard>
          <SectionCard title="Safety Controls" description="Drafting limits and response guardrails.">
            <p className="text-sm text-[var(--muted)]">
              Placeholder for policy constraints, audit logs, and escalation thresholds.
            </p>
          </SectionCard>
        </section>
      </div>
    </div>
  );
}
