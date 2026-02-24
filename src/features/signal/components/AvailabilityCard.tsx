import { Badge } from "@/components/ui";
import { ReputationScore } from "@/shared";
import type { SignalProfile } from "../types";

type AvailabilityCardProps = {
  active: boolean;
  profile: SignalProfile;
};

const formatUpdatedAt = (value: string | null) => {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString();
};

export default function AvailabilityCard({ active, profile }: AvailabilityCardProps) {
  const rating =
    profile.roles.length > 0
      ? Math.min(5, 4.2 + profile.roles.length * 0.15 + Math.min(profile.stackTags.length, 5) * 0.08)
      : 4.2;
  const verifiedReviews = Math.max(0, profile.stackTags.length + (profile.roles.length > 0 ? 2 : 0));
  const completedProjects = Math.max(1, profile.stackTags.length * 2 + profile.roles.length * 3);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-[var(--text)]">Availability summary</h3>
        <Badge tone={active ? "success" : "default"}>{active ? "Active" : "Inactive"}</Badge>
      </div>

      {!active ? (
        <p className="mt-3 text-sm text-[var(--muted)]">
          Signal is off. You are currently not discoverable for collaboration.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Role</p>
            <p className="mt-1 text-sm text-[var(--text)]">
              {profile.roles.length > 0 ? profile.roles.join(", ") : "Not set"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Stack tags</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {profile.stackTags.length > 0 ? (
                profile.stackTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)]"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-[var(--muted)]">Not set</p>
              )}
            </div>
          </div>
          <ReputationScore
            rating={rating}
            verifiedReviews={verifiedReviews}
            completedProjects={completedProjects}
          />
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Last active</p>
            <p className="mt-1 text-sm text-[var(--text)]">{formatUpdatedAt(profile.updatedAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
