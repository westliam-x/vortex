"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import PlanningList, { type PlanningListItem } from "./components/PlanningList";
import QuickCreateTask, { type FollowUpTask } from "./components/QuickCreateTask";
import VoraPortalNav from "./components/VoraPortalNav";

export default function VoraPlanning() {
  const [followUps, setFollowUps] = useState<FollowUpTask[]>([
    {
      id: "fup-1",
      who: "Acme Studio",
      when: "2026-02-26T10:30",
      note: "Confirm payment timeline and next milestone approval.",
      createdAt: "2026-02-24T08:00:00.000Z",
    },
    {
      id: "fup-2",
      who: "Northwind Labs",
      when: "2026-02-27T15:00",
      note: "Check design sign-off status before development handoff.",
      createdAt: "2026-02-24T08:10:00.000Z",
    },
  ]);

  const weeklyPlan: PlanningListItem[] = [
    {
      id: "plan-1",
      title: "Finalize onboarding flow QA",
      meta: "Project: Aurora Redesign",
      description: "Resolve remaining form edge cases and finish acceptance checklist.",
      tone: "neutral",
      rightLabel: "Tue",
    },
    {
      id: "plan-2",
      title: "Prepare invoice summary for client review",
      meta: "Project: Atlas Commerce",
      description: "Package hours, approved extras, and change log for billing review.",
      tone: "warning",
      rightLabel: "Wed",
    },
    {
      id: "plan-3",
      title: "Ship handover docs + async walkthrough",
      meta: "Project: Northwind Portal",
      description: "Publish final docs, check access, and send transition message.",
      tone: "good",
      rightLabel: "Fri",
    },
  ];

  const deadlines: PlanningListItem[] = [
    {
      id: "due-1",
      title: "Northwind Portal handover",
      meta: "Due Feb 28, 2026",
      description: "Remaining: client UAT feedback and final files upload.",
      tone: "warning",
      rightLabel: "4 days",
    },
    {
      id: "due-2",
      title: "Acme API documentation",
      meta: "Due Mar 2, 2026",
      description: "Need approved endpoint examples from backend partner.",
      tone: "neutral",
      rightLabel: "7 days",
    },
  ];

  const invoicesAtRisk: PlanningListItem[] = [
    {
      id: "inv-1",
      title: "INV-2041 • Acme Studio",
      meta: "Outstanding: $3,200",
      description: "Due date passed 5 days ago with no payment confirmation yet.",
      tone: "danger",
      rightLabel: "Overdue",
    },
    {
      id: "inv-2",
      title: "INV-2046 • Blue Finch Co.",
      meta: "Outstanding: $1,450",
      description: "Client requested extension; pending revised date acknowledgment.",
      tone: "warning",
      rightLabel: "At risk",
    },
  ];

  const healthWatchlist: PlanningListItem[] = [
    {
      id: "health-1",
      title: "Northwind Labs",
      meta: "Health: Medium risk",
      description: "Slow response cadence and repeated timeline shifts this month.",
      tone: "warning",
      rightLabel: "Monitor",
    },
    {
      id: "health-2",
      title: "Acme Studio",
      meta: "Health: High risk",
      description: "Open payment issue and unresolved scope clarifications.",
      tone: "danger",
      rightLabel: "Action",
    },
    {
      id: "health-3",
      title: "Atlas Commerce",
      meta: "Health: Stable",
      description: "Strong feedback loop and consistent review turnaround.",
      tone: "good",
      rightLabel: "Healthy",
    },
  ];

  const followUpItems = useMemo<PlanningListItem[]>(
    () =>
      followUps
        .slice()
        .sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime())
        .map((task) => ({
          id: task.id,
          title: task.who,
          meta: `Due ${new Date(task.when).toLocaleString()}`,
          description: task.note,
          tone: "neutral",
          rightLabel: "Follow-up",
        })),
    [followUps]
  );

  const clientOptions = ["Acme Studio", "Northwind Labs", "Atlas Commerce", "Blue Finch Co."];

  return (
    <div className="space-y-6">
      <PageHeader title="Vora Planning" subtitle="Plan work, watch risk, and schedule client follow-ups." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <SectionCard title="Portal Navigation">
            <VoraPortalNav />
          </SectionCard>
        </aside>

        <section className="space-y-4 lg:col-span-9">
          <SectionCard title="Weekly plan" description="Priority tasks tracked by delivery window.">
            <PlanningList items={weeklyPlan} />
          </SectionCard>

          <SectionCard title="Upcoming deadlines" description="Milestones that need intervention or sequencing.">
            <PlanningList items={deadlines} />
          </SectionCard>

          <SectionCard
            title="Follow-ups due"
            description="Client touches to keep projects moving."
            actions={
              <QuickCreateTask
                clients={clientOptions}
                onCreate={(task) => setFollowUps((current) => [task, ...current])}
              />
            }
          >
            <PlanningList items={followUpItems} emptyText="No follow-ups scheduled yet." />
          </SectionCard>

          <SectionCard
            title="Open invoices at risk"
            description="Billing items likely to affect delivery continuity."
          >
            <PlanningList items={invoicesAtRisk} />
          </SectionCard>

          <SectionCard
            title="Client health watchlist"
            description="Relationship and delivery signal tracking by account."
          >
            <PlanningList items={healthWatchlist} />
          </SectionCard>
        </section>
      </div>
    </div>
  );
}
