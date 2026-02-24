"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge, Button, Input, Modal } from "@/components/ui";
import { FormSection, SectionCard } from "@/components/patterns";
import {
  BLAAIZ_UNAVAILABLE,
  createBlaaizVirtualAccount,
  fetchBlaaizStatus,
} from "@/features/integrations";

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
  const [blaaizConnected, setBlaaizConnected] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [accountSuccess, setAccountSuccess] = useState<string | null>(null);
  const [accountForm, setAccountForm] = useState({
    walletId: "",
    accountName: "",
    customerId: "",
  });

  useEffect(() => {
    let active = true;

    const run = async () => {
      setStatusLoading(true);
      try {
        const status = await fetchBlaaizStatus();
        if (!active) return;
        setBlaaizConnected(Boolean(status.connected));
      } catch {
        if (!active) return;
        setBlaaizConnected(false);
      } finally {
        if (active) setStatusLoading(false);
      }
    };

    void run();
    return () => {
      active = false;
    };
  }, []);

  const onConnect = (provider: string) => {
    setNotice(`${provider} OAuth is not enabled yet. Configure provider preferences in Vora settings.`);
    router.push("/vora/settings");
  };

  const handleGenerateAccount = async () => {
    if (!accountForm.walletId.trim() || !accountForm.accountName.trim() || !accountForm.customerId.trim()) {
      setAccountError("Fill wallet ID, account name, and customer ID.");
      return;
    }

    setAccountLoading(true);
    setAccountError(null);
    setAccountSuccess(null);
    try {
      const result = await createBlaaizVirtualAccount({
        wallet_id: accountForm.walletId.trim(),
        account_name: accountForm.accountName.trim(),
        customer_id: accountForm.customerId.trim(),
      });
      const accountLabel = result.account_number ? `Account ${result.account_number} generated.` : "Virtual account generated.";
      setAccountSuccess(accountLabel);
      setNotice(accountLabel);
      setAccountModalOpen(false);
      setAccountForm({
        walletId: "",
        accountName: "",
        customerId: "",
      });
    } catch (error) {
      if (error instanceof Error && error.name === BLAAIZ_UNAVAILABLE) {
        setAccountError("Service unavailable. Retry soon.");
      } else {
        setAccountError(error instanceof Error ? error.message : "Failed to generate virtual account.");
      }
    } finally {
      setAccountLoading(false);
    }
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
          <div className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-[var(--text)]">Blaaiz</p>
                {statusLoading ? (
                  <Badge tone="default">Checking...</Badge>
                ) : (
                  statusBadge(blaaizConnected ? "connected" : "not_connected")
                )}
              </div>
              <Button size="sm" variant="secondary" onClick={() => onConnect("Blaaiz")}>
                Connect
              </Button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button size="sm" onClick={() => setAccountModalOpen(true)}>
                Generate account
              </Button>
              <p className="text-xs text-[var(--muted)]">
                Create a virtual account for invoice collections.
              </p>
            </div>

            {accountSuccess ? <p className="text-xs text-[var(--success)]">{accountSuccess}</p> : null}
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

      <Modal
        open={accountModalOpen}
        onClose={() => {
          if (accountLoading) return;
          setAccountModalOpen(false);
        }}
        title="Generate Blaaiz account"
        description="Create a virtual bank account for easier collection."
      >
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">Wallet ID</label>
            <Input
              value={accountForm.walletId}
              onChange={(event) => setAccountForm((prev) => ({ ...prev, walletId: event.target.value }))}
              placeholder="wallet_123"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">Account name</label>
            <Input
              value={accountForm.accountName}
              onChange={(event) => setAccountForm((prev) => ({ ...prev, accountName: event.target.value }))}
              placeholder="Vortex Workspace"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">Customer ID</label>
            <Input
              value={accountForm.customerId}
              onChange={(event) => setAccountForm((prev) => ({ ...prev, customerId: event.target.value }))}
              placeholder="cus_123"
            />
          </div>
          {accountError ? <p className="text-xs text-[var(--danger)]">{accountError}</p> : null}
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={() => setAccountModalOpen(false)} disabled={accountLoading}>
              Cancel
            </Button>
            <Button onClick={() => void handleGenerateAccount()} disabled={accountLoading}>
              {accountLoading ? "Generating..." : "Generate account"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
