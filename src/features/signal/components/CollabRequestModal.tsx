"use client";

import { useMemo, useState } from "react";
import { Button, Input, Modal, Select, Textarea } from "@/components/ui";
import { SIGNAL_ROLE_OPTIONS, type SignalCollabRequest, type SignalRole } from "../types";

type CollabRequestModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  onSubmit: (request: SignalCollabRequest) => void;
};

export default function CollabRequestModal({
  open,
  onOpenChange,
  projectId,
  onSubmit,
}: CollabRequestModalProps) {
  const [roleNeeded, setRoleNeeded] = useState<SignalRole>("Backend");
  const [stackDraft, setStackDraft] = useState("");
  const [requiredStack, setRequiredStack] = useState<string[]>([]);
  const [budgetMin, setBudgetMin] = useState<string>("");
  const [budgetMax, setBudgetMax] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const errors = useMemo(() => {
    const next: { stack?: string; budget?: string } = {};
    if (!requiredStack.length) next.stack = "Add at least one required stack tag.";
    if (budgetMin && budgetMax && Number(budgetMin) > Number(budgetMax)) {
      next.budget = "Minimum budget cannot exceed maximum.";
    }
    return next;
  }, [budgetMax, budgetMin, requiredStack.length]);

  const canSubmit = !errors.stack && !errors.budget && !saving;

  const addStack = () => {
    const value = stackDraft.trim();
    if (!value) return;
    if (requiredStack.some((tag) => tag.toLowerCase() === value.toLowerCase())) {
      setStackDraft("");
      return;
    }
    setRequiredStack((prev) => [...prev, value]);
    setStackDraft("");
  };

  const reset = () => {
    setRoleNeeded("Backend");
    setStackDraft("");
    setRequiredStack([]);
    setBudgetMin("");
    setBudgetMax("");
    setNotes("");
  };

  const submit = async () => {
    if (!canSubmit) return;
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit({
      projectId,
      roleNeeded,
      requiredStack,
      budgetMin: budgetMin ? Number(budgetMin) : null,
      budgetMax: budgetMax ? Number(budgetMax) : null,
      notes,
      status: "Open",
      createdAt: new Date().toISOString(),
    });
    setSaving(false);
    reset();
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => onOpenChange(false)}
      title="Signal for collaborator"
      description="Create one active request for help on this project."
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wide text-[var(--muted)]" htmlFor="collab-role">
            Role needed
          </label>
          <Select id="collab-role" value={roleNeeded} onChange={(event) => setRoleNeeded(event.target.value as SignalRole)}>
            {SIGNAL_ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Required stack</p>
          <div className="flex gap-2">
            <Input
              value={stackDraft}
              onChange={(event) => setStackDraft(event.target.value)}
              placeholder="React, Node.js, AWS..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addStack();
                }
              }}
            />
            <Button type="button" variant="secondary" onClick={addStack}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {requiredStack.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setRequiredStack((prev) => prev.filter((entry) => entry !== tag))}
                className="rounded-full border border-[var(--border)] bg-[var(--surface2)] px-2 py-0.5 text-xs text-[var(--text)]"
              >
                {tag} x
              </button>
            ))}
          </div>
          {errors.stack ? <p className="text-xs text-[var(--danger)]">{errors.stack}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wide text-[var(--muted)]" htmlFor="collab-budget-min">
              Budget min
            </label>
            <Input
              id="collab-budget-min"
              type="number"
              min={0}
              value={budgetMin}
              onChange={(event) => setBudgetMin(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wide text-[var(--muted)]" htmlFor="collab-budget-max">
              Budget max
            </label>
            <Input
              id="collab-budget-max"
              type="number"
              min={0}
              value={budgetMax}
              onChange={(event) => setBudgetMax(event.target.value)}
            />
          </div>
        </div>
        {errors.budget ? <p className="text-xs text-[var(--danger)]">{errors.budget}</p> : null}

        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wide text-[var(--muted)]" htmlFor="collab-notes">
            Notes
          </label>
          <Textarea
            id="collab-notes"
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Describe context, priorities, and expected contribution."
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" loading={saving} disabled={!canSubmit} onClick={() => void submit()}>
            Create request
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export type { CollabRequestModalProps };
