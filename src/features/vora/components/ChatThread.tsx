"use client";

import ChatEmptyState from "./ChatEmptyState";
import ChatMessage from "./ChatMessage";
import type { VoraMessage } from "../types";

type ChatThreadProps = {
  messages: VoraMessage[];
  loading?: boolean;
};

export default function ChatThread({ messages, loading = false }: ChatThreadProps) {
  if (!messages.length && !loading) {
    return <ChatEmptyState />;
  }

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          role={message.role}
          content={message.content}
          createdAt={message.createdAt}
        />
      ))}
      {loading ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--muted)]">
          Vora is thinking...
        </div>
      ) : null}
    </div>
  );
}

export type { ChatThreadProps };
