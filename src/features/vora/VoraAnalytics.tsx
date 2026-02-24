"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { Badge, Button, StatusBadge } from "@/components/ui";
import { useFeature } from "@/hooks/useFeature";
import VoraPortalNav from "./components/VoraPortalNav";

const kpis = [
  { label: "Revenue (30d)", value: "$18,420", delta: "+12.4%" },
  { label: "Paid invoices (30d)", value: "14", delta: "+3" },
  { label: "Outstanding balance", value: "$4,780", delta: "2 overdue" },
  { label: "Avg time to pay", value: "6.2 days", delta: "-1.1 days" },
];

const recentPayments = [
  { id: "pay-1", source: "Blaaiz", amount: "$1,250.00", status: "confirmed", date: "Feb 23, 2026" },
  { id: "pay-2", source: "Manual", amount: "$720.00", status: "pending", date: "Feb 22, 2026" },
  { id: "pay-3", source: "Blaaiz", amount: "$2,480.00", status: "confirmed", date: "Feb 20, 2026" },
  { id: "pay-4", source: "Manual", amount: "$600.00", status: "failed", date: "Feb 18, 2026" },
];

const topClients = [
  { id: "cli-1", name: "Acme Studio", revenue: "$6,900", invoices: 5, rating: "4.9" },
  { id: "cli-2", name: "Northwind Labs", revenue: "$4,180", invoices: 3, rating: "4.7" },
  { id: "cli-3", name: "Atlas Commerce", revenue: "$3,240", invoices: 2, rating: "4.8" },
  { id: "cli-4", name: "Blue Finch Co.", revenue: "$2,860", invoices: 2, rating: "4.6" },
];

export default function VoraAnalytics() {
  const router = useRouter();
  const { enabled: analyticsAdvancedEnabled } = useFeature("analyticsAdvanced");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vora Analytics"
        subtitle="Financial performance and payment health snapshots."
        rightSlot={analyticsAdvancedEnabled ? undefined : <Badge tone="info">Pro</Badge>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <SectionCard title="Portal Navigation">
            <VoraPortalNav />
          </SectionCard>
        </aside>

        <section className="space-y-4 lg:col-span-9">
          <SectionCard
            title="Data source"
            description="Financial sync provider for analytics."
            actions={
              <Button variant="secondary" size="sm" onClick={() => router.push("/vora/settings")}>
                Connect
              </Button>
            }
          >
            <div className="flex items-center gap-3 rounded-lg border border-[var(--warning)]/40 bg-[var(--surface2)] px-3 py-2">
              <Badge tone="warning">Blaaiz (not connected)</Badge>
              <p className="text-sm text-[var(--muted)]">
                Showing mocked analytics until provider connection is enabled.
              </p>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {kpis.map((kpi) => (
              <SectionCard key={kpi.label} className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{kpi.label}</p>
                <p className="text-2xl font-semibold text-[var(--text)]">{kpi.value}</p>
                <p className="text-sm text-[var(--muted)]">{kpi.delta}</p>
              </SectionCard>
            ))}
          </div>

          <SectionCard title="Revenue trend (placeholder)" description="Last 6 weeks">
            <div className="flex h-36 items-end gap-2">
              {[42, 56, 49, 68, 73, 61].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-md bg-[var(--blue)]/70" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-6 text-center text-xs text-[var(--muted)]">
              <span>W1</span>
              <span>W2</span>
              <span>W3</span>
              <span>W4</span>
              <span>W5</span>
              <span>W6</span>
            </div>
          </SectionCard>

          <SectionCard title="Recent payments" description="Latest payment events across sources.">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-[var(--muted)]">
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Source</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Amount</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Status</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((payment) => (
                    <tr key={payment.id} className="text-sm text-[var(--text)]">
                      <td className="border-b border-[var(--border)] px-3 py-2">{payment.source}</td>
                      <td className="border-b border-[var(--border)] px-3 py-2">{payment.amount}</td>
                      <td className="border-b border-[var(--border)] px-3 py-2">
                        <StatusBadge kind="payment" status={payment.status} />
                      </td>
                      <td className="border-b border-[var(--border)] px-3 py-2 text-[var(--muted)]">
                        {payment.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard title="Top clients" description="Revenue contribution and quality signal.">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-[var(--muted)]">
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Client</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Revenue</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Invoices</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Avg rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topClients.map((client) => (
                    <tr key={client.id} className="text-sm text-[var(--text)]">
                      <td className="border-b border-[var(--border)] px-3 py-2">{client.name}</td>
                      <td className="border-b border-[var(--border)] px-3 py-2">{client.revenue}</td>
                      <td className="border-b border-[var(--border)] px-3 py-2">{client.invoices}</td>
                      <td className="border-b border-[var(--border)] px-3 py-2">{client.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </section>
      </div>
    </div>
  );
}
