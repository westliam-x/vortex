import { Badge, Button } from "@/components/ui";
import type { SignalCollabRequest } from "../types";

type CollabRequestCardProps = {
  request: SignalCollabRequest;
  onClose?: () => void;
};

export default function CollabRequestCard({ request, onClose }: CollabRequestCardProps) {
  return (
    <div className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--text)]">{request.roleNeeded}</p>
        <Badge tone={request.status === "Open" ? "info" : "default"}>{request.status}</Badge>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Required stack</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {request.requiredStack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <p className="text-[var(--muted)]">
          Budget:{" "}
          <span className="text-[var(--text)]">
            {request.budgetMin !== null || request.budgetMax !== null
              ? `$${request.budgetMin ?? "?"} - $${request.budgetMax ?? "?"}`
              : "Not set"}
          </span>
        </p>
        <p className="text-[var(--muted)]">
          Created: <span className="text-[var(--text)]">{new Date(request.createdAt).toLocaleDateString()}</span>
        </p>
      </div>

      {request.notes ? (
        <p className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-xs text-[var(--muted)]">
          {request.notes}
        </p>
      ) : null}

      {request.status === "Open" && onClose ? (
        <Button size="sm" fullWidth variant="secondary" onClick={onClose}>
          Close request
        </Button>
      ) : null}
    </div>
  );
}

export type { CollabRequestCardProps };
