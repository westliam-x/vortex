"use client";

import { useMemo } from "react";
import { Drawer } from "@/components/ui";
import { usePayments } from "../hooks/usePayments";
import PaymentEventRow, { type PaymentTimelineEvent } from "./PaymentEventRow";
import PaymentEventsSkeleton from "./PaymentEventsSkeleton";
import { EmptyStateBlock, ErrorStateBlock } from "@/components/patterns";
import gracefulApiError from "@/shared/utils/gracefulApiError";

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
  const { payments, loading, error, fetchPayments } = usePayments(projectId);

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

  return (
    <Drawer
      open={open}
      onClose={() => onOpenChange(false)}
      side="right"
      title="Payment Events"
      description={invoiceId ? `Linked invoice: ${invoiceId}` : undefined}
      className="max-w-lg"
    >
      <div className="space-y-3">
        {loading ? <PaymentEventsSkeleton /> : null}
        {!loading && error ? (
          <ErrorStateBlock
            title="Unable to load payment events"
            description={gracefulApiError()}
            onRetry={() => void fetchPayments()}
          />
        ) : null}
        {!loading && !error && events.length === 0 ? (
          <EmptyStateBlock
            title="No payment events"
            description="Payment timeline entries will appear here when available."
            primaryAction={{
              label: "Refresh",
              variant: "secondary",
              onClick: () => void fetchPayments(),
            }}
          />
        ) : null}
        {!loading && !error ? events.map((event) => <PaymentEventRow key={event.id} event={event} />) : null}
      </div>
    </Drawer>
  );
}

export type { PaymentEventsDrawerProps };
