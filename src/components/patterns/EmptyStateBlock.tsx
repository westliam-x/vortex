import EmptyState, { type PatternAction } from "./EmptyState";

type EmptyStateBlockProps = {
  title: string;
  description: string;
  primaryAction: PatternAction;
  secondaryAction?: PatternAction;
};

export default function EmptyStateBlock({
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyStateBlockProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    />
  );
}

export type { EmptyStateBlockProps };
