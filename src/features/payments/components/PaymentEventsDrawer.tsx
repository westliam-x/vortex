"use client";

import { useMemo } from "react";
import { Drawer, EmptyState } from "@/components/ui";
import { usePayments } from "../hooks/usePayments";
import PaymentEventRow, { type PaymentTimelineEvent } from "./PaymentEventRow";
import PaymentEventsSkeleton from "./PaymentEventsSkeleton";

type PaymentEventsDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId?: string;
  projectId?: string;
};

const deriveStatus = (status: string): PaymentTimelineEvent["status"] => {
  if (status === "posted" || status === "confirmed") return "confirmed";
  if (status === "void" || status === "failed") return "failed";
  return "pending";
};

export default function PaymentEventsDrawer({
  open,
  onOpenChange,
  invoiceId,
  projectId,
}: PaymentEventsDrawerProps) {
  const { payments, loading } = usePayments(projectId);

  const fallbackEvents = useMemo<PaymentTimelineEvent[]>(
    () =>
      invoiceId
        ? [
            {
              id: `manual-${invoiceId}-1`,
              status: "pending",
              source: "Manual",
              amount: 0,
              currency: "USD",
              reference: `INV-${invoiceId}`,
              occurredAt: new Date().toISOString(),
            },
          ]
        : [],
    [invoiceId]
  );

  const events = useMemo<PaymentTimelineEvent[]>(() => {
    const mapped = payments.events.map((event, index) => ({
      id: event.id ?? event._id ?? `${event.amount}-${index}`,
      status: deriveStatus(event.status),
      source: event.note?.toLowerCase().includes("blaaiz") ? ("Blaaiz" as const) : ("Manual" as const),
      amount: event.amount,
      currency: event.currency || payments.currency || "USD",
      reference: event.id ?? event._id ?? event.note ?? "manual-event",
      occurredAt: event.occurredAt,
    }));

    return mapped.sort((a, b) => {
      const aTime = a.occurredAt ? new Date(a.occurredAt).getTime() : 0;
      const bTime = b.occurredAt ? new Date(b.occurredAt).getTime() : 0;
      return bTime - aTime;
    });
  }, [payments.currency, payments.events]);

  const rows = events.length ? events : fallbackEvents;

  return (
    <Drawer
      open={open}
      onClose={() => onOpenChange(false)}
      side="right"
      title="Payment Events"
      className="max-w-lg"
    >
      <div className="space-y-3">
        {loading ? <PaymentEventsSkeleton /> : null}
        {!loading && rows.length === 0 ? (
          <EmptyState
            title="No payment events"
            description="Payment timeline entries will appear here when available."
          />
        ) : null}
        {!loading ? rows.map((event) => <PaymentEventRow key={event.id} event={event} />) : null}
      </div>
    </Drawer>
  );
}

export type { PaymentEventsDrawerProps };
