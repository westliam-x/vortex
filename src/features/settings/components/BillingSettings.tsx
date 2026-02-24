"use client";

import { useRouter } from "next/navigation";
import { Badge, Button } from "@/components/ui";
import { FormSection, SectionCard } from "@/components/patterns";

export default function BillingSettings() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <FormSection title="Billing" description="Plan, usage, and payment configuration for your workspace.">
        <SectionCard title="Current plan" description="Active subscription tier and renewal status.">
          <div className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">Pro Plan</p>
              <p className="mt-1 text-xs text-[var(--muted)]">$29 / month • Renews on March 15, 2026</p>
            </div>
            <Badge tone="info">Active</Badge>
          </div>
        </SectionCard>

        <SectionCard title="Usage summary" description="Current cycle consumption and limits.">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Projects</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text)]">18 / 50</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Storage</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text)]">7.4 GB / 100 GB</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Team seats</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text)]">4 / 10</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Plan actions" description="Manage upgrades and billing lifecycle actions.">
          <div className="flex items-center gap-2">
            <Button onClick={() => router.push("/vora/settings")}>Upgrade plan</Button>
            <p className="text-xs text-[var(--muted)]">
              Billing checkout is not connected yet. Stripe integration placeholder.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Payment method" description="Card and invoice collection settings will appear here.">
          <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface2)] px-3 py-4">
            <p className="text-sm text-[var(--muted)]">
              No payment method connected. This section is prepared for future Stripe customer and payment method
              management.
            </p>
          </div>
        </SectionCard>
      </FormSection>
    </div>
  );
}
