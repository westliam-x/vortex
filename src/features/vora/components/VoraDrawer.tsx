"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Badge, Button, Drawer, IconButton, Tabs } from "@/components/ui";
import {
  VORA_SETTINGS_CHANGE_EVENT,
  readVoraPreferences,
  type VoraApiMode,
} from "../config";
import { sendMessage } from "../services/vora.service";
import type { Provider, VoraMessage, VoraSendPayload } from "../types";
import ChatThread from "./ChatThread";
import ChatComposer from "./ChatComposer";

type VoraDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const draftTemplates = ["Client update", "Follow-up", "Scope clarification"] as const;
const ASSISTANT_UNAVAILABLE_TITLE = "Assistant unavailable";
const ASSISTANT_UNAVAILABLE_BODY =
  "I’m unable to generate a draft right now. The assistant service is unavailable. Try again soon.";

export default function VoraDrawer({ open, onOpenChange }: VoraDrawerProps) {
  const [provider, setProvider] = useState<Provider>("openai");
  const [mode, setMode] = useState<VoraApiMode>("mock");
  const [composerValue, setComposerValue] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<VoraMessage[]>([]);
  const [draftLoading, setDraftLoading] = useState(false);
  const [draftText, setDraftText] = useState("");
  const [unavailableBanner, setUnavailableBanner] = useState(false);

  useEffect(() => {
    const sync = () => {
      const prefs = readVoraPreferences();
      setProvider(prefs.provider);
      setMode(prefs.mode);
    };

    sync();
    window.addEventListener(VORA_SETTINGS_CHANGE_EVENT, sync);
    return () => window.removeEventListener(VORA_SETTINGS_CHANGE_EVENT, sync);
  }, []);

  const callVora = async (input: string, requestMode: "chat" | "draft") => {
    const payload: VoraSendPayload = {
      provider,
      messages:
        requestMode === "chat"
          ? [
              ...messages,
              {
                id: `u-${Date.now()}`,
                role: "user",
                content: input,
                createdAt: new Date().toISOString(),
              },
            ]
          : [
              {
                id: `d-${Date.now()}`,
                role: "user",
                content: input,
                createdAt: new Date().toISOString(),
              },
            ],
      context: { mode: requestMode },
    };

    const result = await sendMessage(payload, { mode });
    if (!result.ok && mode === "live" && (result.errorCode === "NO_KEY" || result.errorCode === "PROVIDER_ERROR")) {
      setUnavailableBanner(true);
      return {
        ...result,
        reply: ASSISTANT_UNAVAILABLE_BODY,
      };
    }

    return result;
  };

  const onSendMessage = async () => {
    const content = composerValue.trim();
    if (!content) return;

    const userMessage: VoraMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setComposerValue("");
    setChatLoading(true);

    const result = await callVora(content, "chat");
    const assistantMessage: VoraMessage = {
      id: `v-${Date.now()}`,
      role: "vora",
      content: result.ok
        ? result.reply
        : result.reply || "Vora could not complete the request. Please try again.",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setChatLoading(false);
  };

  const chatTab = (
    <div className="space-y-3">
      <div className="max-h-[50vh] overflow-y-auto pr-1">
        <ChatThread messages={messages} loading={chatLoading} />
      </div>
      <ChatComposer
        value={composerValue}
        loading={chatLoading}
        onChange={setComposerValue}
        onSend={() => {
          void onSendMessage();
        }}
      />
    </div>
  );

  const draftsTab = (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2">
        {draftTemplates.map((template) => (
          <button
            key={template}
            type="button"
            className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-left text-sm text-[var(--text)] transition-colors hover:bg-[var(--surface)]"
            onClick={async () => {
              setDraftLoading(true);
              const generated = await callVora(template, "draft");
              setDraftText(
                generated.ok
                  ? generated.reply
                  : generated.reply || "Vora could not generate a draft right now."
              );
              setDraftLoading(false);
            }}
          >
            {template}
          </button>
        ))}
      </div>

      {draftLoading ? <p className="text-sm text-[var(--muted)]">Vora is thinking...</p> : null}

      {draftText ? (
        <div className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Generated draft</p>
            <Button
              size="xs"
              variant="secondary"
              onClick={async () => {
                if (typeof navigator === "undefined" || !navigator.clipboard) return;
                await navigator.clipboard.writeText(draftText);
              }}
            >
              Copy
            </Button>
          </div>
          <pre className="max-h-[28vh] overflow-auto whitespace-pre-wrap text-sm text-[var(--text)]">
            {draftText}
          </pre>
        </div>
      ) : null}
    </div>
  );

  const tasksTab = (
    <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface2)] p-4">
      <p className="text-sm text-[var(--muted)]">Tasks integration placeholder.</p>
    </div>
  );

  return (
    <Drawer
      open={open}
      onClose={() => onOpenChange(false)}
      side="right"
      className="max-w-lg p-4"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <h2 className="text-lg font-semibold text-[var(--text)]">Vora</h2>
          <div className="ml-auto flex items-center gap-2">
            <Badge tone="info">{provider === "claude" ? "Claude" : "OpenAI"}</Badge>
            <Badge tone={mode === "live" ? "warning" : "default"}>
              {mode === "live" ? "Live mode" : "Mock mode"}
            </Badge>
          </div>
          <IconButton aria-label="Close Vora" size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
            <X size={16} />
          </IconButton>
        </div>

        {unavailableBanner ? (
          <div className="rounded-lg border border-[var(--warning)]/50 bg-[var(--surface2)] p-3">
            <p className="text-sm font-medium text-[var(--text)]">{ASSISTANT_UNAVAILABLE_TITLE}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{ASSISTANT_UNAVAILABLE_BODY}</p>
            <div className="mt-2">
              <Button size="xs" variant="ghost" onClick={() => setUnavailableBanner(false)}>
                Dismiss
              </Button>
            </div>
          </div>
        ) : null}

        <Tabs
          defaultValue="chat"
          items={[
            { value: "chat", label: "Chat", content: chatTab },
            { value: "drafts", label: "Drafts", content: draftsTab },
            { value: "tasks", label: "Tasks", content: tasksTab },
          ]}
        />
      </div>
    </Drawer>
  );
}

export type { VoraDrawerProps };
