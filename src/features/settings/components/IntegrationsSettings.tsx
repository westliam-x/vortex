"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { FormSection, SectionCard } from "@/components/patterns";

type IntegrationStatus = "connected" | "not_connected";

const statusBadge = (status: IntegrationStatus) =>
  status === "connected" ? (
    <Badge tone="success">Connected</Badge>
  ) : (
    <Badge tone="default">Not connected</Badge>
  );

export default function IntegrationsSettings() {
  const router = useRouter();
  const [notice, setNotice] = useState<string | null>(null);

  const onConnect = (provider: string) => {
    setNotice(`${provider} OAuth is not enabled yet. Configure provider preferences in Vora settings.`);
    router.push("/vora/settings");
  };

  return (
    <div className="space-y-4">
      <FormSection
        title="Integrations"
        description="Prepare external providers for scheduling, payments, and assistant workflows."
      >
        <SectionCard title="Calendar" description="Sync project timelines and reminders to calendar providers.">
          <div className="space-y-2">
            <div className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-[var(--text)]">Google</p>
                {statusBadge("not_connected")}
              </div>
              <Button size="sm" variant="secondary" onClick={() => onConnect("Google Calendar")}>
                Connect
              </Button>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-[var(--text)]">Outlook</p>
                {statusBadge("not_connected")}
              </div>
              <Button size="sm" variant="secondary" onClick={() => onConnect("Outlook Calendar")}>
                Connect
              </Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Blaaiz" description="Payment provider integration for transaction-backed workflows.">
          <div className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-[var(--text)]">Blaaiz</p>
              {statusBadge("not_connected")}
            </div>
            <Button size="sm" variant="secondary" onClick={() => onConnect("Blaaiz")}>
              Connect
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="API Keys (future)" description="Programmatic key management will land in a later release.">
          <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface2)] px-3 py-4">
            <p className="text-sm text-[var(--muted)]">
              API key issuance, rotation, and audit visibility are planned. This is a placeholder.
            </p>
          </div>
        </SectionCard>
      </FormSection>

      {notice ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2">
          <p className="text-xs text-[var(--muted)]">{notice}</p>
        </div>
      ) : null}
    </div>
  );
}
