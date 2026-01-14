"use client";

import { LogEntry } from "@/types/logs";
import { Activity, User } from "lucide-react";
import { Card, EmptyState, Skeleton } from "@/components/ui";

const RecentActivity = ({ logs, loading }: { logs: LogEntry[]; loading: boolean }) => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <Activity size={20} className="text-[var(--accent)]" />
        <h2 className="text-[var(--text)] text-lg font-semibold">Recent activity</h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : logs.length > 0 ? (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li
              key={log._id ?? log.timestamp}
              className="border-b border-[var(--border)]/60 pb-3 last:border-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-[var(--text)] font-medium">
                    {log.action}
                  </p>
                  {log.details ? (
                    <p className="text-xs text-[var(--text-muted)]">
                      {log.details}
                    </p>
                  ) : null}
                </div>
                <span className="text-[10px] text-[var(--text-subtle)] whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <User size={14} className="text-[var(--text-subtle)]" />
                <span className="text-xs text-[var(--text-muted)]">
                  {log.actor?.name ?? "Unknown"}
                  {log.actor?.role ? (
                    <span className="ml-2 px-2 py-[2px] text-[10px] rounded-md bg-[var(--surface-2)] text-[var(--text-subtle)]">
                      {log.actor.role}
                    </span>
                  ) : null}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No activity yet"
          description="Recent updates, uploads, and approvals will appear here."
        />
      )}
    </Card>
  );
};

export default RecentActivity;
