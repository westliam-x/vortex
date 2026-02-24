"use client";

import { useMemo, useState } from "react";
import { Badge, Button, Input } from "@/components/ui";
import { FormSection } from "@/components/patterns";

type SessionItem = {
  id: string;
  device: string;
  ip: string;
  lastActive: string;
  current?: boolean;
};

const initialSessions: SessionItem[] = [
  {
    id: "sess-1",
    device: "MacBook Pro • Chrome",
    ip: "192.168.0.24",
    lastActive: "Just now",
    current: true,
  },
  {
    id: "sess-2",
    device: "iPhone 15 • Safari",
    ip: "10.0.1.81",
    lastActive: "2 hours ago",
  },
  {
    id: "sess-3",
    device: "Windows PC • Edge",
    ip: "172.16.20.42",
    lastActive: "Yesterday",
  },
];

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSavedLabel, setPasswordSavedLabel] = useState<string | null>(null);

  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);

  const [twoFaEnabled] = useState(false);
  const [twoFaNotice, setTwoFaNotice] = useState<string | null>(null);

  const passwordErrors = useMemo(() => {
    const errors: {
      current?: string;
      next?: string;
      confirm?: string;
    } = {};

    if (!currentPassword.trim()) errors.current = "Current password is required.";
    if (!nextPassword.trim()) errors.next = "New password is required.";
    else if (nextPassword.length < 8) errors.next = "New password must be at least 8 characters.";
    if (!confirmPassword.trim()) errors.confirm = "Please confirm your new password.";
    else if (confirmPassword !== nextPassword) errors.confirm = "Passwords do not match.";

    return errors;
  }, [confirmPassword, currentPassword, nextPassword]);

  const canSavePassword =
    !passwordErrors.current && !passwordErrors.next && !passwordErrors.confirm && !passwordSaving;

  const onSavePassword = async () => {
    setPasswordTouched({ current: true, next: true, confirm: true });
    if (!canSavePassword) return;

    setPasswordSaving(true);
    setPasswordSavedLabel(null);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPasswordSaving(false);
    setCurrentPassword("");
    setNextPassword("");
    setConfirmPassword("");
    setPasswordTouched({ current: false, next: false, confirm: false });
    setPasswordSavedLabel("Password updated");
  };

  const onRevokeSession = async (sessionId: string) => {
    setRevokingId(sessionId);
    setSessionNotice(null);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    setRevokingId(null);
    setSessionNotice("Session revoked locally. Backend revoke endpoint is not connected yet.");
  };

  return (
    <div className="space-y-6">
      <FormSection title="Password" description="Change your password and keep your account secure.">
        <div className="space-y-1.5">
          <label htmlFor="security-current" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Current password
          </label>
          <Input
            id="security-current"
            type="password"
            value={currentPassword}
            error={Boolean(passwordTouched.current && passwordErrors.current)}
            onBlur={() => setPasswordTouched((prev) => ({ ...prev, current: true }))}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
          {passwordTouched.current && passwordErrors.current ? (
            <p className="text-xs text-[var(--danger)]">{passwordErrors.current}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="security-new" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            New password
          </label>
          <Input
            id="security-new"
            type="password"
            value={nextPassword}
            error={Boolean(passwordTouched.next && passwordErrors.next)}
            onBlur={() => setPasswordTouched((prev) => ({ ...prev, next: true }))}
            onChange={(event) => setNextPassword(event.target.value)}
          />
          {passwordTouched.next && passwordErrors.next ? (
            <p className="text-xs text-[var(--danger)]">{passwordErrors.next}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="security-confirm" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Confirm new password
          </label>
          <Input
            id="security-confirm"
            type="password"
            value={confirmPassword}
            error={Boolean(passwordTouched.confirm && passwordErrors.confirm)}
            onBlur={() => setPasswordTouched((prev) => ({ ...prev, confirm: true }))}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {passwordTouched.confirm && passwordErrors.confirm ? (
            <p className="text-xs text-[var(--danger)]">{passwordErrors.confirm}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <Button loading={passwordSaving} disabled={!canSavePassword} onClick={() => void onSavePassword()}>
            Update password
          </Button>
          {passwordSavedLabel ? <span className="text-xs text-[var(--muted)]">{passwordSavedLabel}</span> : null}
        </div>
      </FormSection>

      <FormSection
        title="Sessions"
        description="Review active devices and revoke access where needed."
      >
        <p className="text-xs text-[var(--muted)]">
          Session controls are running in local mock mode until revoke APIs are connected.
        </p>
        <div className="space-y-2">
          {sessions.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface2)] px-3 py-4 text-sm text-[var(--muted)]">
              No additional active sessions.
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{session.device}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    IP: {session.ip} • Last active: {session.lastActive}
                  </p>
                </div>
                {session.current ? (
                  <Badge tone="info">Current session</Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    loading={revokingId === session.id}
                    onClick={() => void onRevokeSession(session.id)}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
        {sessionNotice ? <p className="text-xs text-[var(--muted)]">{sessionNotice}</p> : null}
      </FormSection>

      <FormSection
        title="2FA / OTP"
        description="Additional verification for account sign-in and sensitive actions."
      >
        <div className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text)]">Status</span>
            <Badge tone={twoFaEnabled ? "success" : "default"}>
              {twoFaEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              setTwoFaNotice("2FA management is planned for a future release. Contact support for early access.")
            }
          >
            Manage
          </Button>
        </div>
        {twoFaNotice ? <p className="text-xs text-[var(--muted)]">{twoFaNotice}</p> : null}
      </FormSection>
    </div>
  );
}
