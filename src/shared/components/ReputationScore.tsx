import { Badge } from "@/components/ui";

type ReputationScoreProps = {
  rating: number;
  verifiedReviews: number;
  completedProjects: number;
  className?: string;
};

const clampRating = (value: number) => Math.max(0, Math.min(5, value));

export default function ReputationScore({
  rating,
  verifiedReviews,
  completedProjects,
  className,
}: ReputationScoreProps) {
  const normalized = clampRating(rating);
  const percent = Math.round((normalized / 5) * 100);
  const showVerified = verifiedReviews > 0;

  return (
    <div className={className}>
      <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
        <div
          className="relative grid h-14 w-14 place-items-center rounded-full"
          style={{
            background: `conic-gradient(var(--mint) ${percent}%, var(--surface) ${percent}% 100%)`,
          }}
          aria-label={`Reputation score ${normalized.toFixed(1)} out of 5`}
        >
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--bg)]">
            <span className="text-sm font-semibold text-[var(--text)]">{normalized.toFixed(1)}</span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Reputation score</p>
          <p className="text-sm text-[var(--text)]">
            {verifiedReviews} verified reviews • {completedProjects} completed projects
          </p>
          {showVerified ? <Badge tone="success">Verified</Badge> : <Badge tone="default">Unverified</Badge>}
        </div>
      </div>
    </div>
  );
}

export type { ReputationScoreProps };
