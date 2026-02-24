import { SearchX } from "lucide-react";
import EmptyState from "./EmptyState";

type NoResultsProps = {
  title: string;
  description: string;
  onReset: () => void;
};

export default function NoResults({ title, description, onReset }: NoResultsProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={<SearchX size={20} />}
      primaryAction={{
        label: "Reset filters",
        variant: "secondary",
        onClick: onReset,
      }}
    />
  );
}

export type { NoResultsProps };
