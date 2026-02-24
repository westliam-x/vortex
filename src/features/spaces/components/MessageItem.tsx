"use client";

import { format } from "date-fns";
import type { VortexMessage } from "@/types/vortex";

type MessageItemProps = {
  message: VortexMessage;
};

const AUTHOR_LABELS: Record<string, string> = {
  owner: "Owner",
  member: "Team",
  guest: "Guest",
  system: "System",
};

const isSystemMessage = (message: VortexMessage) => {
  const authorType = (message as { authorType?: string }).authorType?.toLowerCase();
  return authorType === "system";
};

const getAuthorName = (message: VortexMessage) => {
  const authorType = (message as { authorType?: string }).authorType?.toLowerCase() ?? "member";
  if (authorType === "guest" && message.guestEmail) {
    return message.guestEmail;
  }
  return AUTHOR_LABELS[authorType] ?? "User";
};

const getInitial = (name: string) => name.trim().charAt(0).toUpperCase() || "U";

export default function MessageItem({ message }: MessageItemProps) {
  const authorName = getAuthorName(message);
  const timestamp = message.createdAt ? format(new Date(message.createdAt), "HH:mm") : "";

  if (isSystemMessage(message)) {
    return (
      <div className="py-1 text-center">
        <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface2)] px-2 py-1 text-xs text-[var(--muted)]">
          {message.body}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-xs font-medium text-[var(--text)]">
        {getInitial(authorName)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-[var(--text)]">{authorName}</p>
          {timestamp ? <span className="text-xs text-[var(--muted)]">{timestamp}</span> : null}
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm text-[var(--text)]">{message.body}</p>
      </div>
    </div>
  );
}

export type { MessageItemProps };
