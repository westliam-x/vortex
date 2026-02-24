"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button, Drawer, IconButton, Select, Tabs } from "@/components/ui";
import { voraConfig, VORA_PROVIDER_STORAGE_KEY } from "../config";
import { sendMessage } from "../services/vora.service";
import type { Provider, VoraMessage, VoraSendPayload } from "../types";
import ChatThread from "./ChatThread";
import ChatComposer from "./ChatComposer";

type VoraDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const draftTemplates = ["Client update", "Follow-up", "Scope clarification"] as const;

export default function VoraDrawer({ open, onOpenChange }: VoraDrawerProps) {
  const [provider, setProvider] = useState<Provider>(voraConfig.defaultProvider);
  const [composerValue, setComposerValue] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<VoraMessage[]>([]);
  const [draftLoading, setDraftLoading] = useState(false);
  const [draftText, setDraftText] = useState("");

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

  const callVora = async (input: string, mode: "chat" | "draft") => {
    const payload: VoraSendPayload = {
      provider,
      messages:
        mode === "chat"
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
      context: { mode },
    };

    return sendMessage(payload);
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
          <Select
            className="ml-auto max-w-[140px]"
            value={provider}
            onChange={(event) => updateProvider(event.target.value as Provider)}
          >
            <option value="openai">OpenAI</option>
            <option value="claude">Claude</option>
          </Select>
          <IconButton aria-label="Close Vora" size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
            <X size={16} />
          </IconButton>
        </div>

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
