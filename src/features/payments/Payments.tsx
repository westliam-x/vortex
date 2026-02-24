import { Card } from "@/components/ui";
import { PageHeader } from "@/components/layout";

export default function Payments() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payments" subtitle="Track payment events and project totals." />
      <Card className="text-sm text-[var(--muted)]">Payments dashboard is ready for API wiring.</Card>
    </div>
  );
}
