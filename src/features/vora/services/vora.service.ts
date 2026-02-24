import { voraConfig } from "../config";
import type { VoraSendPayload, VoraSendResult } from "../types";

type SendMessageOptions = {
  mode?: "mock" | "live";
};

const mockReply = (payload: VoraSendPayload): string => {
  const latest = payload.messages[payload.messages.length - 1];
  const prompt = latest?.content ?? "your request";
  return `Vora (${payload.provider}) mock reply: I understood "${prompt}" and prepared a concise response.`;
};

const hasProviderKey = (provider: VoraSendPayload["provider"]): boolean => {
  if (provider === "openai") return Boolean(voraConfig.openAiKey);
  return Boolean(voraConfig.claudeKey);
};

export const sendMessage = async (
  payload: VoraSendPayload,
  options?: SendMessageOptions
): Promise<VoraSendResult> => {
  const mode = options?.mode ?? voraConfig.apiMode;

  if (mode === "mock") {
    return { ok: true, reply: mockReply(payload) };
  }

  if (!hasProviderKey(payload.provider)) {
    return {
      ok: false,
      reply: "Vora is unavailable in live mode because no provider key is configured.",
      errorCode: "NO_KEY",
      errorMessage: `Missing ${payload.provider} API key.`,
    };
  }

  try {
    const response = await fetch("/api/vora/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as VoraSendResult;
    if (!response.ok) {
      return {
        ok: false,
        reply:
          data.reply ||
          "Vora could not process the request right now. Please try again shortly.",
        errorCode: data.errorCode ?? "PROVIDER_ERROR",
        errorMessage: data.errorMessage ?? "Provider request failed.",
      };
    }

    return {
      ok: Boolean(data.ok),
      reply: data.reply || "Vora returned an empty response.",
      errorCode: data.errorCode,
      errorMessage: data.errorMessage,
    };
  } catch (error) {
    return {
      ok: false,
      reply:
        "Vora hit a connectivity issue. Please retry or switch to mock mode in configuration.",
      errorCode: "PROVIDER_ERROR",
      errorMessage: error instanceof Error ? error.message : "Request failed.",
    };
  }
};
