type FeatureListProps = {
  features: string[];
};

export default function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="space-y-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm text-[var(--muted)]">
          <span className="mt-0.5 text-[var(--mint)]">+</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
