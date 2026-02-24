"use client";

import { useMemo, useState } from "react";
import { Button, Input, Modal, Select, Textarea } from "@/components/ui";

export type FollowUpTask = {
  id: string;
  who: string;
  when: string;
  note: string;
  createdAt: string;
};

type QuickCreateTaskProps = {
  clients: string[];
  onCreate: (task: FollowUpTask) => void;
};

const defaultDateTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 24);
  return now.toISOString().slice(0, 16);
};

export default function QuickCreateTask({ clients, onCreate }: QuickCreateTaskProps) {
  const [open, setOpen] = useState(false);
  const [who, setWho] = useState(clients[0] ?? "");
  const [when, setWhen] = useState(defaultDateTime);
  const [note, setNote] = useState("");

  const canSave = useMemo(() => who.trim() !== "" && when.trim() !== "" && note.trim() !== "", [who, when, note]);

  const handleSave = () => {
    if (!canSave) return;

    onCreate({
      id: `follow-up-${Date.now()}`,
      who: who.trim(),
      when,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    });

    setNote("");
    setWhen(defaultDateTime());
    setOpen(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Create follow-up
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create follow-up"
        description="Schedule a client follow-up task for planning."
      >
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          <div className="space-y-1.5">
            <label htmlFor="followup-who" className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Who
            </label>
            <Select id="followup-who" value={who} onChange={(event) => setWho(event.target.value)}>
              {clients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="followup-when" className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              When
            </label>
            <Input
              id="followup-when"
              type="datetime-local"
              value={when}
              onChange={(event) => setWhen(event.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="followup-note" className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Note
            </label>
            <Textarea
              id="followup-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Share the context and desired next step."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSave}>
              Save follow-up
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
