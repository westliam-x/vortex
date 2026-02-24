import { Badge } from "@/components/ui";

type ReputationBadgeProps = {
  score: number;
};

export default function ReputationBadge({ score }: ReputationBadgeProps) {
  const tone = score >= 4.8 ? "success" : score >= 4.5 ? "info" : "default";
  return <Badge tone={tone}>Reputation {score.toFixed(1)}</Badge>;
}
