import type { Provider } from "./types";

type VoraApiMode = "mock" | "live";
export type VoraTone = "Professional" | "Friendly" | "Direct";

export const VORA_STORAGE_KEYS = {
  provider: "vortex:vora:provider",
  mode: "vortex:vora:mode",
  tone: "vortex:vora:tone",
  glow: "vortex:vora:glow",
  signature: "vortex:vora:signature",
} as const;

export const VORA_SETTINGS_CHANGE_EVENT = "vortex:vora:settings-change";

const toProvider = (value?: string): Provider => {
  return value === "claude" ? "claude" : "openai";
};

const toMode = (value?: string): VoraApiMode => {
  return value === "live" ? "live" : "mock";
};

const toTone = (value?: string): VoraTone => {
  if (value === "Friendly" || value === "Direct") return value;
  return "Professional";
};

const toBoolean = (value?: string): boolean => value === "true";

export const voraConfig = {
  defaultProvider: toProvider(process.env.NEXT_PUBLIC_VORA_PROVIDER),
  openAiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  claudeKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
  apiMode: toMode(process.env.NEXT_PUBLIC_VORA_API_MODE),
  defaultTone: "Professional" as VoraTone,
  defaultGlow: true,
  defaultSignature: false,
};

export type VoraPreferences = {
  provider: Provider;
  mode: VoraApiMode;
  tone: VoraTone;
  glow: boolean;
  signature: boolean;
};

export const getDefaultVoraPreferences = (): VoraPreferences => ({
  provider: voraConfig.defaultProvider,
  mode: voraConfig.apiMode,
  tone: voraConfig.defaultTone,
  glow: voraConfig.defaultGlow,
  signature: voraConfig.defaultSignature,
});

export const readVoraPreferences = (): VoraPreferences => {
  if (typeof window === "undefined") {
    return getDefaultVoraPreferences();
  }

  const defaults = getDefaultVoraPreferences();
  const provider = toProvider(window.localStorage.getItem(VORA_STORAGE_KEYS.provider) ?? undefined);
  const mode = toMode(window.localStorage.getItem(VORA_STORAGE_KEYS.mode) ?? undefined);
  const tone = toTone(window.localStorage.getItem(VORA_STORAGE_KEYS.tone) ?? undefined);
  const glowRaw = window.localStorage.getItem(VORA_STORAGE_KEYS.glow);
  const signatureRaw = window.localStorage.getItem(VORA_STORAGE_KEYS.signature);

  return {
    provider,
    mode,
    tone,
    glow: glowRaw === null ? defaults.glow : toBoolean(glowRaw),
    signature: signatureRaw === null ? defaults.signature : toBoolean(signatureRaw),
  };
};

export const writeVoraPreference = <K extends keyof VoraPreferences>(
  key: K,
  value: VoraPreferences[K]
) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(VORA_STORAGE_KEYS[key], String(value));
  window.dispatchEvent(new CustomEvent(VORA_SETTINGS_CHANGE_EVENT));
};

export type { VoraApiMode };
