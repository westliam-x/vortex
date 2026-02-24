import { Card } from "@/components/ui";
import { PageHeader } from "@/components/layout";

export default function SpacesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Spaces" subtitle="Owner list of active project share spaces." />
      <Card className="text-sm text-[var(--muted)]">No spaces yet. Enable sharing on a project to create one.</Card>
    </div>
  );
}
