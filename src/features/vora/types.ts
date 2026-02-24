export type Provider = "openai" | "claude";

export type VoraMessage = {
  id: string;
  role: "user" | "vora";
  content: string;
  createdAt: string;
};

export type VoraSendPayload = {
  provider: Provider;
  messages: VoraMessage[];
  context?: Record<string, string | number | boolean | null>;
};

export type VoraSendResult = {
  ok: boolean;
  reply: string;
  errorCode?: "NO_KEY" | "PROVIDER_ERROR" | "NOT_IMPLEMENTED";
  errorMessage?: string;
};
