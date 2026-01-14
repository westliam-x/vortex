"use client";

import { MessageSquareText, Quote } from "lucide-react";
import { Card, EmptyState } from "@/components/ui";

const recentComments = [
  {
    id: 1,
    client: "Ava Stone",
    comment: "Can we add a short demo clip on the hero section?",
    project: "Vortex Landing Refresh",
  },
  {
    id: 2,
    client: "Remy Tran",
    comment: "The onboarding checklist looks great. Approving the layout.",
    project: "Client Portal MVP",
  },
];

const RecentComments = () => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <MessageSquareText size={20} className="text-[var(--accent)]" />
        <h2 className="text-[var(--text)] text-lg font-semibold">
          Client comments
        </h2>
      </div>

      {recentComments.length > 0 ? (
        <ul className="space-y-5">
          {recentComments.map((item) => (
            <li
              key={item.id}
              className="border-b border-[var(--border)]/60 pb-4 last:border-0"
            >
              <div className="flex items-start gap-2">
                <Quote size={14} className="text-[var(--accent)] mt-1" />
                <p className="text-sm text-[var(--text-muted)] italic leading-relaxed">
                  {item.comment}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-[var(--text-subtle)]">{item.client}</span>
                <span className="px-2 py-[2px] rounded-md bg-[var(--surface-2)] text-[var(--text-subtle)]">
                  {item.project}
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
