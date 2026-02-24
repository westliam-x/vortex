import { Button } from "@/components/ui";
import { SectionCard } from "@/components/patterns";
import { ReputationScore } from "@/shared";
import type { DiscoverDeveloper } from "../types";

type DiscoverCardProps = {
  developer: DiscoverDeveloper;
  onSignalInvite?: (developer: DiscoverDeveloper) => void;
};

export default function DiscoverCard({ developer, onSignalInvite }: DiscoverCardProps) {
  return (
    <SectionCard title={developer.name} description={developer.headline}>
      <div className="space-y-3">
        <ReputationScore
          rating={developer.reputation}
          verifiedReviews={developer.verifiedReviews}
          completedProjects={developer.completedProjects}
        />
        <div className="flex flex-wrap gap-2">
          {developer.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--border)] bg-[var(--surface2)] px-2.5 py-1 text-xs text-[var(--text)]"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-[var(--muted)]">
          <span>{developer.roles.join(", ")}</span>
          <span>{developer.timezone}</span>
        </div>
        <Button fullWidth variant="secondary" onClick={() => onSignalInvite?.(developer)}>
          Signal Invite
        </Button>
      </div>
    </SectionCard>
  );
}
