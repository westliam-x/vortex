"use client";

import { Button } from "@/components/ui";

type MessageEmptyStateProps = {
  onSendFirstMessage?: () => void;
};

export default function MessageEmptyState({ onSendFirstMessage }: MessageEmptyStateProps) {
  return (
    <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center">
      <h3 className="text-base font-semibold text-[var(--text)]">No messages yet</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Start the thread to keep handover communication in one place.
      </p>
      <Button size="sm" className="mt-4" onClick={onSendFirstMessage}>
        Send first message
      </Button>
    </div>
  );
}

export type { MessageEmptyStateProps };
