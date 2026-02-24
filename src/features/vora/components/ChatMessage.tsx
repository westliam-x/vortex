"use client";

import { format } from "date-fns";
import { cn } from "@/lib";

type ChatMessageRole = "user" | "vora";

type ChatMessageProps = {
  role: ChatMessageRole;
  content: string;
  createdAt: string;
};

export default function ChatMessage({ role, content, createdAt }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg border px-3 py-2",
          isUser
            ? "border-[var(--blue)] bg-[var(--surface2)] text-[var(--text)]"
            : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
        )}
      >
        <div className="mb-1 flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            {isUser ? "User" : "Vora"}
          </p>
          <p className="text-xs text-[var(--muted)]">{format(new Date(createdAt), "HH:mm")}</p>
        </div>
        <p className="whitespace-pre-wrap text-sm">{content}</p>
      </div>
    </div>
  );
}

export type { ChatMessageProps, ChatMessageRole };
