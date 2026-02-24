"use client";

import { format, isSameDay } from "date-fns";
import MessageEmptyState from "./MessageEmptyState";
import MessageItem from "./MessageItem";
import MessageThreadSkeleton from "./MessageThreadSkeleton";
import type { VortexMessage } from "@/types/vortex";

type MessageListProps = {
  messages: VortexMessage[];
  loading?: boolean;
  onSendFirstMessage?: () => void;
};

type SortedMessage = {
  message: VortexMessage;
  time: number;
  originalIndex: number;
};

const toTime = (value?: string) => {
  if (!value) return 0;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default function MessageList({ messages, loading, onSendFirstMessage }: MessageListProps) {
  if (loading) {
    return <MessageThreadSkeleton />;
  }

  if (!messages.length) {
    return <MessageEmptyState onSendFirstMessage={onSendFirstMessage} />;
  }

  const sorted = messages
    .map((message, originalIndex): SortedMessage => ({
      message,
      time: toTime(message.createdAt),
      originalIndex,
    }))
    .sort((a, b) => (a.time === b.time ? a.originalIndex - b.originalIndex : a.time - b.time));

  let lastDay: Date | null = null;

  return (
    <div className="space-y-4">
      {sorted.map(({ message, time }, index) => {
        const currentDay = time ? new Date(time) : null;
        const showDivider = !currentDay || !lastDay || !isSameDay(lastDay, currentDay);
        if (currentDay) lastDay = currentDay;

        return (
          <div key={message.id ?? message._id ?? `${message.authorType}-${index}`} className="space-y-3">
            {showDivider ? (
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="text-xs text-[var(--muted)]">
                  {currentDay ? format(currentDay, "EEE, dd MMM yyyy") : "Recent"}
                </span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>
            ) : null}
            <MessageItem message={message} />
          </div>
        );
      })}
    </div>
  );
}

export type { MessageListProps };
