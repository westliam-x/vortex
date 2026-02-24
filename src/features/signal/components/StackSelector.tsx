"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

type StackSelectorProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export default function StackSelector({ value, onChange }: StackSelectorProps) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const tag = draft.trim();
    if (!tag) return;
    if (value.some((existing) => existing.toLowerCase() === tag.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, tag]);
    setDraft("");
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add tag (React, Node.js, Figma)"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={addTag}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(value.filter((entry) => entry !== tag))}
            className="rounded-full border border-[var(--border)] bg-[var(--surface2)] px-2.5 py-1 text-xs text-[var(--text)]"
            title="Remove tag"
          >
            {tag} x
          </button>
        ))}
      </div>
    </div>
  );
}
