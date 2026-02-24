"use client";

import { SectionCard } from "@/components/patterns";

const navItems = ["Overview", "Planning", "Analytics", "Settings"] as const;

export default function VoraPortal() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <SectionCard title="Vora Portal" description="Assistant operations workspace">
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item}
                type="button"
                className={
                  index === 0
                    ? "w-full rounded-lg border border-[var(--blue)] bg-[var(--surface2)] px-3 py-2 text-left text-sm text-[var(--text)]"
                    : "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-sm text-[var(--muted)] hover:text-[var(--text)]"
                }
              >
                {item}
              </button>
            ))}
          </nav>
        </SectionCard>
      </aside>

      <section className="space-y-4 lg:col-span-9">
        <SectionCard
          title="Overview"
          description="High-level assistant usage, draft throughput, and response health."
        >
          <p className="text-sm text-[var(--muted)]">
            Placeholder for usage KPIs, weekly activity, and top workflows.
          </p>
        </SectionCard>

        <SectionCard
          title="Planning"
          description="Roadmap items, queued improvements, and upcoming assistant capabilities."
        >
          <p className="text-sm text-[var(--muted)]">
            Placeholder for sprint planning cards and execution milestones.
          </p>
        </SectionCard>

        <SectionCard
          title="Analytics"
          description="Provider mix, response quality trends, and mode distribution."
        >
          <p className="text-sm text-[var(--muted)]">
            Placeholder for charts and query-driven insights.
          </p>
        </SectionCard>

        <SectionCard
          title="Settings"
          description="Provider defaults, fallback behavior, and policy controls."
        >
          <p className="text-sm text-[var(--muted)]">
            Placeholder for environment-backed configuration and feature flags.
          </p>
        </SectionCard>
      </section>
    </div>
  );
}
