import type { Provider } from "./types";

type VoraApiMode = "mock" | "live";
export const VORA_PROVIDER_STORAGE_KEY = "vora_provider";

const toProvider = (value?: string): Provider => {
  return value === "claude" ? "claude" : "openai";
};

const toMode = (value?: string): VoraApiMode => {
  return value === "live" ? "live" : "mock";
};

export const voraConfig = {
  defaultProvider: toProvider(process.env.NEXT_PUBLIC_VORA_PROVIDER),
  openAiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  claudeKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
  apiMode: toMode(process.env.NEXT_PUBLIC_VORA_API_MODE),
};

export type { VoraApiMode };
