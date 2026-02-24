"use client";

import { format } from "date-fns";
import { StatusBadge } from "@/components/ui";

type PaymentEventStatus = "pending" | "confirmed" | "failed";

type PaymentTimelineEvent = {
  id: string;
  status: PaymentEventStatus;
  source: "Blaaiz" | "Manual";
  amount: number;
  currency: string;
  reference: string;
  occurredAt?: string;
};

type PaymentEventRowProps = {
  event: PaymentTimelineEvent;
};

const truncate = (value: string, max = 16) => {
  if (value.length <= max) return value;
  return `${value.slice(0, 8)}...${value.slice(-4)}`;
};

export default function PaymentEventRow({ event }: PaymentEventRowProps) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
      <div className="flex items-center justify-between gap-2">
        <StatusBadge kind="payment" status={event.status} />
        <span className="text-xs text-[var(--muted)]">
          {event.occurredAt ? format(new Date(event.occurredAt), "dd MMM yyyy, HH:mm") : "-"}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-xs text-[var(--muted)]">Source</p>
          <p className="text-[var(--text)]">{event.source}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">Amount</p>
          <p className="text-[var(--text)]">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: event.currency,
            }).format(event.amount)}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs text-[var(--muted)]">Reference</p>
        <p className="font-mono text-xs text-[var(--text)]" title={event.reference}>
          {truncate(event.reference)}
        </p>
      </div>
    </div>
  );
}

export type { PaymentEventRowProps, PaymentTimelineEvent, PaymentEventStatus };
