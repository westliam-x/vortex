import { Card } from "@/components/ui";
import { PageHeader } from "@/components/layout";

export default function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Workspace and account preferences." />
      <Card className="text-sm text-[var(--muted)]">Settings UI placeholder.</Card>
    </div>
  );
}
