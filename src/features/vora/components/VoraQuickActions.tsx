"use client";

import {
  BellRing,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  MessageCircleWarning,
  Sparkles,
} from "lucide-react";

type VoraQuickActionType =
  | "payment_follow_up"
  | "deadline_update"
  | "scope_clarification"
  | "work_delivered_notification"
  | "polite_reminder"
  | "proposal_next_steps";

type VoraQuickActionsProps = {
  loading?: boolean;
  onSelect: (actionType: VoraQuickActionType) => void;
};

const ACTIONS: Array<{
  type: VoraQuickActionType;
  label: string;
  description: string;
  icon: typeof CreditCard;
}> = [
  {
    type: "payment_follow_up",
    label: "Payment Follow-up",
    description: "Pending invoice reminder",
    icon: CreditCard,
  },
  {
    type: "deadline_update",
    label: "Deadline Update",
    description: "Status and timeline update",
    icon: CalendarClock,
  },
  {
    type: "scope_clarification",
    label: "Scope Clarification",
    description: "Clarify boundaries and expectations",
    icon: MessageCircleWarning,
  },
  {
    type: "work_delivered_notification",
    label: "Work Delivered Notification",
    description: "Confirm delivery and next steps",
    icon: CheckCircle2,
  },
  {
    type: "polite_reminder",
    label: "Polite Reminder",
    description: "Short follow-up message",
    icon: BellRing,
  },
  {
    type: "proposal_next_steps",
    label: "Proposal / Next Steps",
    description: "Suggest clear next actions",
    icon: Sparkles,
  },
];

export default function VoraQuickActions({ loading = false, onSelect }: VoraQuickActionsProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Quick Actions</p>
      <div className="grid grid-cols-1 gap-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.type}
              type="button"
              disabled={loading}
              onClick={() => onSelect(action.type)}
              className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-left transition-colors hover:bg-[var(--surface)] disabled:opacity-60"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)]">
                <Icon size={14} />
              </span>
              <span>
                <p className="text-sm text-[var(--text)]">{action.label}</p>
                <p className="text-xs text-[var(--muted)]">{action.description}</p>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { VoraQuickActionsProps, VoraQuickActionType };
