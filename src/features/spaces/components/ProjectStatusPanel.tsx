"use client";

import { SectionCard } from "@/components/patterns";
import { Badge, Button, StatusBadge } from "@/components/ui";
import KeyValueList from "./KeyValueList";

type ReviewUiState = "not_eligible" | "eligible" | "submitted" | "approved" | "published";

type ProjectStatusPanelProps = {
  projectStatus: string;
  handoverLocked?: boolean;
  invoiceHref?: string;
  deadline?: string;
  budget?: number | null;
  clientName?: string;
  paymentSummary?: string;
  shareLinkStatus?: string;
  onEditProject?: () => void;
  onOpenInvoice?: () => void;
  reviewState?: ReviewUiState;
  reviewReason?: string;
  reviewLinkHref?: string;
  reviewActionLabel?: string;
  onReviewAction?: () => void;
};

const formatBudget = (value?: number | null) => {
  if (typeof value !== "number") return "Not set";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
};

export default function ProjectStatusPanel({
  projectStatus,
  handoverLocked = false,
  invoiceHref,
  deadline,
  budget,
  clientName,
  paymentSummary = "Pending reconciliation",
  shareLinkStatus = "Not configured",
  onEditProject,
  onOpenInvoice,
  reviewState = "not_eligible",
  reviewReason = "Unlocks after payment confirms",
  reviewLinkHref,
  reviewActionLabel = "Request review",
  onReviewAction,
}: ProjectStatusPanelProps) {
  const reviewBadge = (() => {
    if (reviewState === "submitted") return <Badge tone="info">Review submitted</Badge>;
    if (reviewState === "approved") return <Badge tone="success">Review approved</Badge>;
    if (reviewState === "published") return <Badge tone="success">Published</Badge>;
    return null;
  })();

  return (
    <SectionCard
      title="Status"
      description="Project and handover context"
      actions={
        <div className="flex gap-2">
          <Button size="xs" variant="secondary" onClick={onEditProject}>
            Edit project
          </Button>
          <Button size="xs" variant="secondary" onClick={onOpenInvoice}>
            Open invoice
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <StatusBadge kind="project" status={projectStatus} />
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
          <p className="text-xs text-[var(--muted)]">Handover</p>
          <p className="mt-1 text-sm text-[var(--text)]">{handoverLocked ? "Locked" : "Unlocked"}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {handoverLocked
              ? "Client downloads remain blocked until payment confirms."
              : "Files and deliverables are available to the client."}
          </p>
          <Button
            size="xs"
            variant="ghost"
            className="mt-2"
            disabled={!invoiceHref}
            onClick={() => {
              if (!invoiceHref || typeof window === "undefined") return;
              window.location.href = invoiceHref;
            }}
          >
            View invoice
          </Button>
        </div>
        <KeyValueList
          items={[
            { key: "Deadline", value: deadline ?? "Not set" },
            { key: "Budget", value: formatBudget(budget) },
            { key: "Client", value: clientName ?? "-" },
            { key: "Payments", value: paymentSummary },
            { key: "Share link", value: shareLinkStatus },
          ]}
        />

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
          <p className="text-xs text-[var(--muted)]">Review</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--text)] capitalize">{reviewState.replace("_", " ")}</p>
            {reviewBadge}
          </div>
          {reviewState === "not_eligible" ? (
            <p className="mt-1 text-xs text-[var(--muted)]">{reviewReason}</p>
          ) : null}
          {reviewState === "published" && reviewLinkHref ? (
            <a href={reviewLinkHref} className="mt-2 inline-block text-xs text-[var(--blue)] underline">
              View published review
            </a>
          ) : null}
          <Button
            size="xs"
            variant="secondary"
            className="mt-3"
            disabled={reviewState === "not_eligible"}
            onClick={onReviewAction}
          >
            {reviewActionLabel}
          </Button>
          {reviewState === "not_eligible" ? (
            <p className="mt-1 text-xs text-[var(--muted)]">Unlocks after payment confirms</p>
          ) : null}
        </div>
      </div>
    </SectionCard>
  );
}

export type { ProjectStatusPanelProps, ReviewUiState };
