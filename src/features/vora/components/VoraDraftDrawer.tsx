"use client";

import { useEffect, useState } from "react";
import { Badge, Button, Drawer, Textarea } from "@/components/ui";
import {
  VORA_SETTINGS_CHANGE_EVENT,
  readVoraPreferences,
  type VoraApiMode,
  type VoraTone,
} from "../config";
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
const ASSISTANT_UNAVAILABLE_TITLE = "Assistant unavailable";

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
  const [provider, setProvider] = useState<Provider>("openai");
  const [mode, setMode] = useState<VoraApiMode>("mock");
  const [tone, setTone] = useState<VoraTone>("Professional");
  const [signatureEnabled, setSignatureEnabled] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [showUnavailableBanner, setShowUnavailableBanner] = useState(false);

  useEffect(() => {
    const sync = () => {
      const prefs = readVoraPreferences();
      setProvider(prefs.provider);
      setMode(prefs.mode);
      setTone(prefs.tone);
      setSignatureEnabled(prefs.signature);
    };

    sync();
    window.addEventListener(VORA_SETTINGS_CHANGE_EVENT, sync);
    return () => window.removeEventListener(VORA_SETTINGS_CHANGE_EVENT, sync);
  }, []);

  const appendSignature = (text: string) => {
    if (!signatureEnabled) return text;
    if (typeof window === "undefined") return `${text}\n\n— Vortex User`;
    const userName =
      window.localStorage.getItem("vortex:user:name") ??
      window.localStorage.getItem("vortex:profile:name") ??
      "Vortex User";
    return `${text}\n\n— ${userName}`;
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

    const result = await sendMessage(payload, { mode });
    if (!result.ok && mode === "live" && (result.errorCode === "NO_KEY" || result.errorCode === "PROVIDER_ERROR")) {
      setShowUnavailableBanner(true);
      setDraft(FALLBACK_ERROR_COPY);
      setLoading(false);
      return;
    }

    setDraft(result.ok ? appendSignature(result.reply) : FALLBACK_ERROR_COPY);
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
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Runtime</p>
          <div className="flex items-center gap-2">
            <Badge tone="info">{provider === "claude" ? "Claude" : "OpenAI"}</Badge>
            <Badge tone={mode === "live" ? "warning" : "default"}>
              {mode === "live" ? "Live mode" : "Mock mode"}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge tone="info">{projectName || "Unknown project"}</Badge>
          <Badge tone="default">{clientName || "Unknown client"}</Badge>
        </div>

        {showUnavailableBanner ? (
          <div className="rounded-lg border border-[var(--warning)]/50 bg-[var(--surface2)] p-3">
            <p className="text-sm font-medium text-[var(--text)]">{ASSISTANT_UNAVAILABLE_TITLE}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{FALLBACK_ERROR_COPY}</p>
            <div className="mt-2">
              <Button size="xs" variant="ghost" onClick={() => setShowUnavailableBanner(false)}>
                Dismiss
              </Button>
            </div>
          </div>
        ) : null}

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
