import { Card } from "@/components/ui";
import { PageHeader } from "@/components/layout";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Workspace and account preferences." />
      <Card className="text-sm text-[var(--muted)]">Settings UI placeholder.</Card>
    </div>
  );
}
