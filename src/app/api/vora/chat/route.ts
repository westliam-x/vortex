import { NextResponse } from "next/server";
import type { VoraSendPayload, VoraSendResult } from "@/features/vora/types";

const hasServerKey = (provider: VoraSendPayload["provider"]) => {
  if (provider === "openai") {
    return Boolean(process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY);
  }
  return Boolean(process.env.CLAUDE_API_KEY || process.env.NEXT_PUBLIC_CLAUDE_API_KEY);
};

export async function POST(request: Request) {
  let payload: VoraSendPayload;
  try {
    payload = (await request.json()) as VoraSendPayload;
  } catch {
    const badPayload: VoraSendResult = {
      ok: false,
      reply: "Invalid Vora payload.",
      errorCode: "PROVIDER_ERROR",
      errorMessage: "Body must be valid JSON.",
    };
    return NextResponse.json(badPayload, { status: 400 });
  }

  if (!payload?.provider || !Array.isArray(payload?.messages)) {
    const invalidPayload: VoraSendResult = {
      ok: false,
      reply: "Invalid Vora payload shape.",
      errorCode: "PROVIDER_ERROR",
      errorMessage: "provider and messages are required.",
    };
    return NextResponse.json(invalidPayload, { status: 400 });
  }

  if (!hasServerKey(payload.provider)) {
    const missingKey: VoraSendResult = {
      ok: false,
      reply: "Live Vora is unavailable because provider credentials are missing.",
      errorCode: "NO_KEY",
      errorMessage: `${payload.provider} key is not configured.`,
    };
    return NextResponse.json(missingKey, { status: 503 });
  }

  const notImplemented: VoraSendResult = {
    ok: false,
    reply: "Provider bridge is not installed yet. Falling back is recommended.",
    errorCode: "NOT_IMPLEMENTED",
    errorMessage: "Provider SDK/fetch implementation is not installed.",
  };
  return NextResponse.json(notImplemented, { status: 501 });
}
