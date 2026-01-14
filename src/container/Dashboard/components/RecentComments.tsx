"use client";

import { MessageSquareText, Quote } from "lucide-react";
import { Card, EmptyState, Skeleton } from "@/components/ui";
import type { VortexMessage } from "@/types/vortex";
import { getId } from "@/lib/ids";

const RecentComments = ({ messages, loading }: { messages: VortexMessage[]; loading: boolean }) => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <MessageSquareText size={20} className="text-[var(--accent)]" />
        <h2 className="text-[var(--text)] text-lg font-semibold">
          Client comments
        </h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : messages.length > 0 ? (
        <ul className="space-y-5">
          {messages.map((item) => (
            <li
              key={getId(item) ?? item.body}
              className="border-b border-[var(--border)]/60 pb-4 last:border-0"
            >
              <div className="flex items-start gap-2">
                <Quote size={14} className="text-[var(--accent)] mt-1" />
                <p className="text-sm text-[var(--text-muted)] italic leading-relaxed">
                  {item.body}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-[var(--text-subtle)]">
                  {item.guestEmail ?? item.authorType ?? "Client"}
                </span>
                <span className="px-2 py-[2px] rounded-md bg-[var(--surface-2)] text-[var(--text-subtle)]">
                  {item?.createdAt ? new Date(item.createdAt).toLocaleString() : "Project"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No comments yet"
          description="Client feedback will show up here as soon as it arrives."
        />
      )}
    </Card>
  );
};

export default RecentComments;
