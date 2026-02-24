"use client";

import { ShieldCheck } from "lucide-react";
import { Card, Button, Input } from "@/components/ui";

type GuestOtpGateProps = {
  step: "request" | "verify";
  email: string;
  otp: string;
  loading?: boolean;
  error?: string | null;
  onEmailChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  onRequestAccess: () => void;
  onVerifyAccess: () => void;
};

export default function GuestOtpGate({
  step,
  email,
  otp,
  loading = false,
  error,
  onEmailChange,
  onOtpChange,
  onRequestAccess,
  onVerifyAccess,
}: GuestOtpGateProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck size={18} className="text-[var(--blue)]" />
        <h2 className="text-lg font-semibold text-[var(--text)]">Verify guest access</h2>
      </div>
      <p className="text-sm text-[var(--muted)]">
        Use your email and one-time code to access project messages and uploads.
      </p>

      {step === "request" ? (
        <div className="space-y-3">
          <Input placeholder="Email address" value={email} onChange={(e) => onEmailChange(e.target.value)} />
          <Button onClick={onRequestAccess} disabled={!email || loading}>
            Send access code
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Input placeholder="6-digit OTP" value={otp} onChange={(e) => onOtpChange(e.target.value)} />
          <Button onClick={onVerifyAccess} disabled={!otp || loading}>
            Verify access
          </Button>
        </div>
      )}

      {error ? <p className="text-xs text-[var(--danger)]">{error}</p> : null}
    </Card>
  );
}

export type { GuestOtpGateProps };
