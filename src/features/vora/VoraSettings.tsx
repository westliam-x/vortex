"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { Badge } from "@/components/ui";
import {
  readVoraPreferences,
  writeVoraPreference,
  type VoraApiMode,
  type VoraTone,
} from "./config";
import VoraPortalNav from "./components/VoraPortalNav";

const providerOptions = [
  { value: "openai", label: "OpenAI" },
  { value: "claude", label: "Claude" },
] as const;

const modeOptions: { value: VoraApiMode; label: string; description: string }[] = [
  { value: "mock", label: "Mock", description: "No external calls. Safe default for local development." },
  { value: "live", label: "Live", description: "Uses provider bridge and fails gracefully if unavailable." },
];

const toneOptions: VoraTone[] = ["Professional", "Friendly", "Direct"];

export default function VoraSettings() {
  const [provider, setProvider] = useState<"openai" | "claude">("openai");
  const [mode, setMode] = useState<VoraApiMode>("mock");
  const [tone, setTone] = useState<VoraTone>("Professional");
  const [glow, setGlow] = useState(true);
  const [signature, setSignature] = useState(false);

  useEffect(() => {
    const prefs = readVoraPreferences();
    setProvider(prefs.provider);
    setMode(prefs.mode);
    setTone(prefs.tone);
    setGlow(prefs.glow);
    setSignature(prefs.signature);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Vora Settings" subtitle="Provider defaults and assistant behavior controls." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <SectionCard title="Portal Navigation">
            <VoraPortalNav />
          </SectionCard>
        </aside>

        <section className="space-y-4 lg:col-span-9">
          <SectionCard title="Provider" description="Select the LLM provider used by Vora.">
            <div className="space-y-2">
              {providerOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2.5"
                >
                  <span className="text-sm text-[var(--text)]">{option.label}</span>
                  <input
                    type="radio"
                    name="vora-provider"
                    value={option.value}
                    checked={provider === option.value}
                    onChange={() => {
                      setProvider(option.value);
                      writeVoraPreference("provider", option.value);
                    }}
                  />
                </label>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Mode" description="Toggle local mock replies or live provider mode.">
            <div className="space-y-2">
              {modeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-start justify-between rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm text-[var(--text)]">{option.label}</p>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">{option.description}</p>
                  </div>
                  <input
                    type="radio"
                    name="vora-mode"
                    value={option.value}
                    checked={mode === option.value}
                    onChange={() => {
                      setMode(option.value);
                      writeVoraPreference("mode", option.value);
                    }}
                  />
                </label>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Tone preset" description="Default writing tone used for generated drafts.">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {toneOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    tone === option
                      ? "border-[var(--blue)] bg-[var(--blue)]/15 text-[var(--text)]"
                      : "border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] hover:bg-[var(--surface)]"
                  }`}
                  onClick={() => {
                    setTone(option);
                    writeVoraPreference("tone", option);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Visuals and output" description="Control side glow and draft signature behavior.">
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2.5">
                <div>
                  <p className="text-sm text-[var(--text)]">Enable side glow</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    Show subtle edge glow while Vora drawer is active.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={glow}
                  onChange={(event) => {
                    setGlow(event.target.checked);
                    writeVoraPreference("glow", event.target.checked);
                  }}
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2.5">
                <div>
                  <p className="text-sm text-[var(--text)]">Draft signature</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    Append your name at the end of generated drafts.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={signature}
                  onChange={(event) => {
                    setSignature(event.target.checked);
                    writeVoraPreference("signature", event.target.checked);
                  }}
                />
              </label>
            </div>
          </SectionCard>

          <SectionCard title="Current profile" description="Live summary of selected assistant settings.">
            <div className="flex flex-wrap gap-2">
              <Badge tone="info">{provider === "claude" ? "Claude" : "OpenAI"}</Badge>
              <Badge tone={mode === "live" ? "warning" : "default"}>
                {mode === "live" ? "Live mode" : "Mock mode"}
              </Badge>
              <Badge tone="default">{tone}</Badge>
              <Badge tone={glow ? "success" : "default"}>{glow ? "Glow on" : "Glow off"}</Badge>
              <Badge tone={signature ? "success" : "default"}>
                {signature ? "Signature on" : "Signature off"}
              </Badge>
            </div>
          </SectionCard>
        </section>
      </div>
    </div>
  );
}
