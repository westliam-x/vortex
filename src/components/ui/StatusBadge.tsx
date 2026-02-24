"use client";

import Badge from "./Badge";

type StatusKind =
  | "project"
  | "invoice"
  | "review"
  | "payment"
  | "invite"
  | "client"
  | "space"
  | "log";

type StatusTone = "default" | "success" | "warning" | "error" | "info";

type StatusBadgeProps = {
  kind: StatusKind;
  status: string;
  className?: string;
};

const toKey = (value: string) => value.trim().toLowerCase();

const statusConfig: Record<StatusKind, Record<string, { label: string; tone: StatusTone }>> = {
  project: {
    active: { label: "Active", tone: "info" },
    pending: { label: "Pending", tone: "warning" },
    "in progress": { label: "In Progress", tone: "info" },
    completed: { label: "Completed", tone: "success" },
    archived: { label: "Archived", tone: "default" },
  },
  invoice: {
    draft: { label: "Draft", tone: "default" },
    sent: { label: "Sent", tone: "info" },
    open: { label: "Sent", tone: "info" },
    paid: { label: "Paid", tone: "success" },
    overdue: { label: "Overdue", tone: "warning" },
  },
  review: {
    pending: { label: "Pending", tone: "warning" },
    approved: { label: "Approved", tone: "success" },
    rejected: { label: "Rejected", tone: "error" },
  },
  payment: {
    pending: { label: "Pending", tone: "warning" },
    confirmed: { label: "Confirmed", tone: "success" },
    failed: { label: "Failed", tone: "error" },
    posted: { label: "Confirmed", tone: "success" },
    void: { label: "Failed", tone: "error" },
  },
  invite: {
    pending: { label: "Pending", tone: "warning" },
    accepted: { label: "Accepted", tone: "success" },
    declined: { label: "Declined", tone: "error" },
    expired: { label: "Expired", tone: "default" },
  },
  client: {
    active: { label: "Active", tone: "success" },
    pending: { label: "Pending", tone: "warning" },
    inactive: { label: "Inactive", tone: "default" },
  },
  space: {
    enabled: { label: "Enabled", tone: "success" },
    disabled: { label: "Disabled", tone: "default" },
    live: { label: "Live", tone: "success" },
  },
  log: {
    success: { label: "Success", tone: "success" },
    failure: { label: "Failure", tone: "error" },
  },
};

const toLabel = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export default function StatusBadge({ kind, status, className }: StatusBadgeProps) {
  const key = toKey(status);
  const mapped = statusConfig[kind][key] ?? { label: toLabel(status), tone: "default" as const };

  return (
    <Badge tone={mapped.tone} className={className}>
      {mapped.label}
    </Badge>
  );
}

export type { StatusBadgeProps, StatusKind };
