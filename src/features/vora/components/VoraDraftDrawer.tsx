"use client";

import { useEffect, useState } from "react";
import { Badge, Button, Drawer, Select, Textarea } from "@/components/ui";
import { voraConfig, VORA_PROVIDER_STORAGE_KEY } from "../config";
import { sendMessage } from "../services/vora.service";
import type { Provider, VoraSendPayload } from "../types";
import VoraQuickActions, { type VoraQuickActionType } from "./VoraQuickActions";
import { generatePromptTemplate } from "../utils/promptTemplates";

type VoraDraftDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsertDraft: (draft: string) => void;
  projectId?: string;
  spaceId?: string;
  projectName?: string;
  clientName?: string;
  deadline?: string;
  invoiceStatus?: string;
  lastMessagesSummary?: string;
};

const FALLBACK_ERROR_COPY =
  "I’m unable to generate a draft right now. The assistant service is unavailable. Try again soon.";

export default function VoraDraftDrawer({
  open,
  onOpenChange,
  onInsertDraft,
  projectId,
  spaceId,
  projectName,
  clientName,
  deadline,
  invoiceStatus,
  lastMessagesSummary,
}: VoraDraftDrawerProps) {
  const [provider, setProvider] = useState<Provider>(voraConfig.defaultProvider);
  const [tone, setTone] = useState("Professional");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(VORA_PROVIDER_STORAGE_KEY);
    if (stored === "openai" || stored === "claude") {
      setProvider(stored);
    }
  }, []);

  const updateProvider = (next: Provider) => {
    setProvider(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(VORA_PROVIDER_STORAGE_KEY, next);
    }
  };

  const generateDraft = async (inputPrompt?: string) => {
    const trimmed = (inputPrompt ?? prompt).trim();
    if (!trimmed) return;

    setLoading(true);

    const payload: VoraSendPayload = {
      provider,
      messages: [
        {
          id: `d-${Date.now()}`,
          role: "user",
          content: `Tone: ${tone}\n\n${trimmed}`,
          createdAt: new Date().toISOString(),
        },
      ],
      context: {
        projectId: projectId ?? "",
        spaceId: spaceId ?? "",
        projectName: projectName ?? "",
        clientName: clientName ?? "",
        deadline: deadline ?? "",
        invoiceStatus: invoiceStatus ?? "",
        lastActivitySummary: lastMessagesSummary ?? "",
      },
    };

    const result = await sendMessage(payload);
    setDraft(result.ok ? result.reply : FALLBACK_ERROR_COPY);
    setLoading(false);
  };

  const onSelectQuickAction = (actionType: VoraQuickActionType) => {
    const generatedPrompt = generatePromptTemplate(actionType, {
      projectName,
      clientName,
      deadline,
      invoiceStatus,
      lastActivitySummary: lastMessagesSummary,
    });
    setPrompt(generatedPrompt);
    void generateDraft(generatedPrompt);
  };

  return (
    <Drawer
      open={open}
      onClose={() => onOpenChange(false)}
      side="right"
      title="Draft message"
      className="max-w-lg"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Provider</p>
          <Select
            className="max-w-[140px]"
            value={provider}
            onChange={(event) => updateProvider(event.target.value as Provider)}
          >
            <option value="openai">OpenAI</option>
            <option value="claude">Claude</option>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge tone="info">{projectName || "Unknown project"}</Badge>
          <Badge tone="default">{clientName || "Unknown client"}</Badge>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Select value={tone} onChange={(event) => setTone(event.target.value)}>
            <option value="Professional">Professional</option>
            <option value="Friendly">Friendly</option>
            <option value="Direct">Direct</option>
          </Select>
        </div>

        <VoraQuickActions loading={loading} onSelect={onSelectQuickAction} />

        <Textarea
          rows={4}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="What do you want to tell the client?"
        />

        <Button loading={loading} disabled={!prompt.trim()} onClick={() => void generateDraft()}>
          Generate draft
        </Button>

        {draft ? (
          <div className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Draft output</p>
            <pre className="max-h-[30vh] overflow-auto whitespace-pre-wrap text-sm text-[var(--text)]">
              {draft}
            </pre>
            <div className="flex gap-2">
              <Button
                size="xs"
                variant="secondary"
                onClick={async () => {
                  if (typeof navigator === "undefined" || !navigator.clipboard) return;
                  await navigator.clipboard.writeText(draft);
                }}
              >
                Copy
              </Button>
              <Button
                size="xs"
                onClick={() => {
                  onInsertDraft(draft);
                  onOpenChange(false);
                }}
              >
                Insert into composer
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Drawer>
  );
}

export type { VoraDraftDrawerProps };
