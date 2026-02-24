import { format } from "date-fns";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib";

type VerifiedReviewCardProps = {
  rating: number;
  title?: string;
  body: string;
  projectName: string;
  clientName?: string;
  verified: boolean;
  createdAt: string;
  compact?: boolean;
  verificationSubtext?: string;
};

export default function VerifiedReviewCard({
  rating,
  title,
  body,
  projectName,
  clientName,
  verified,
  createdAt,
  compact = false,
  verificationSubtext,
}: VerifiedReviewCardProps) {
  const note = verificationSubtext ?? "Linked to completed invoice";

  return (
    <Card className={cn("space-y-3", compact ? "p-3" : "p-5")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {title ? <p className="text-sm font-medium text-[var(--text)]">{title}</p> : null}
          <p className="text-sm font-medium text-[var(--text)]">{projectName}</p>
          {clientName ? <p className="text-xs text-[var(--muted)]">{clientName}</p> : null}
        </div>
        <div className="text-right">
          <p className="text-xs text-[var(--text)]">{rating.toFixed(1)}/5</p>
          {verified ? <Badge tone="success">Verified</Badge> : null}
        </div>
      </div>

      <p className={cn("text-[var(--text)]", compact ? "line-clamp-2 text-sm" : "text-sm")}>{body}</p>

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-[var(--muted)]">{format(new Date(createdAt), "dd MMM yyyy")}</p>
        {verified ? <p className="text-[11px] text-[var(--muted)]">{note}</p> : null}
      </div>
    </Card>
  );
}

export type { VerifiedReviewCardProps };
