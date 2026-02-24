"use client";

import { useMemo, useState } from "react";
import { Button, Modal, Select, Textarea } from "@/components/ui";
import { useProjects } from "@/features/projects";
import { getProjectId } from "@/lib/ids";
import { appendProjectInvite } from "../services/signal.service";
import { SIGNAL_ROLE_OPTIONS, type SignalProjectInvite, type SignalRole } from "../types";

type SmartInviteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  initialProjectId?: string;
  initialRole?: SignalRole;
  onInvited?: (invite: SignalProjectInvite) => void;
};

export default function SmartInviteModal({
  open,
  onOpenChange,
  candidateName,
  initialProjectId,
  initialRole = "Backend",
  onInvited,
}: SmartInviteModalProps) {
  const { projects, loading } = useProjects();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId ?? "");
  const [role, setRole] = useState<SignalRole>(initialRole);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const projectOptions = useMemo(
    () =>
      projects.map((project) => ({
        id: getProjectId(project) ?? project.id,
        title: project.title,
      })),
    [projects]
  );

  const canContinue = selectedProjectId.trim().length > 0 && role.trim().length > 0;

  const submitInvite = async () => {
    if (!selectedProjectId) return;
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const invite: SignalProjectInvite = {
      id: `invite-${Date.now()}`,
      projectId: selectedProjectId,
      candidateName,
      role,
      message: message.trim() || undefined,
      status: "Pending",
      sentAt: new Date().toISOString(),
    };
    appendProjectInvite(selectedProjectId, invite);
    onInvited?.(invite);
    setSending(false);
    onOpenChange(false);
    setStep(1);
    setMessage("");
  };

  return (
    <Modal
      open={open}
      onClose={() => onOpenChange(false)}
      title="Smart invite"
      description={`Invite ${candidateName} to collaborate on a project.`}
      className="max-w-2xl"
    >
      {step === 1 ? (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="smart-invite-project" className="text-xs uppercase tracking-wide text-[var(--muted)]">
              Confirm project
            </label>
            <Select
              id="smart-invite-project"
              value={selectedProjectId}
              onChange={(event) => setSelectedProjectId(event.target.value)}
              disabled={loading}
            >
              <option value="">Select a project</option>
              {projectOptions.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="smart-invite-role" className="text-xs uppercase tracking-wide text-[var(--muted)]">
              Confirm role
            </label>
            <Select
              id="smart-invite-role"
              value={role}
              onChange={(event) => setRole(event.target.value as SignalRole)}
            >
              {SIGNAL_ROLE_OPTIONS.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" disabled={!canContinue} onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3 text-sm">
            <p className="text-[var(--muted)]">Project</p>
            <p className="text-[var(--text)]">
              {projectOptions.find((project) => project.id === selectedProjectId)?.title || "Unknown project"}
            </p>
            <p className="mt-2 text-[var(--muted)]">Role</p>
            <p className="text-[var(--text)]">{role}</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="smart-invite-message" className="text-xs uppercase tracking-wide text-[var(--muted)]">
              Optional message
            </label>
            <Textarea
              id="smart-invite-message"
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Share context for the collaborator."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="button" loading={sending} onClick={() => void submitInvite()}>
              Send Invite
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export type { SmartInviteModalProps };
