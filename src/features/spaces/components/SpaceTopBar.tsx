"use client";

import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Card } from "@/components/ui";

type SpaceTopBarProps = {
  title: string;
  subtitle?: string;
  statusSlot?: ReactNode;
  locked: boolean;
  onViewInvoice?: () => void;
  invoiceHref?: string;
  lockedSubtext?: string;
  showVoraAction?: boolean;
  onOpenVora?: () => void;
};

export default function SpaceTopBar({
  title,
  subtitle,
  statusSlot,
  locked,
  onViewInvoice,
  invoiceHref,
  lockedSubtext,
  showVoraAction = false,
  onOpenVora,
}: SpaceTopBarProps) {
  const canViewInvoice = Boolean(invoiceHref || onViewInvoice);
  const combinedRightSlot = (
    <div className="flex items-center gap-2">
      {statusSlot}
      {showVoraAction ? (
        <Button size="sm" variant="secondary" onClick={onOpenVora}>
          Vora
        </Button>
      ) : null}
    </div>
  );

  return (
    <div className="space-y-4">
      <PageHeader title={title} subtitle={subtitle} rightSlot={combinedRightSlot} />
      {locked ? (
        <Card className="flex flex-col gap-3 border-[var(--warning)]/40 bg-[var(--surface2)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)]">
              <Lock size={14} />
              Handover locked
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {lockedSubtext ?? "Unlocks after payment confirms"}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            disabled={!canViewInvoice}
            onClick={() => {
              if (!canViewInvoice) return;
              if (onViewInvoice) onViewInvoice();
              if (invoiceHref && typeof window !== "undefined") {
                window.location.href = invoiceHref;
              }
            }}
          >
            View invoice
          </Button>
        </Card>
      ) : null}
    </div>
  );
}

export type { SpaceTopBarProps };
