"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui";

type EmbedCodeBlockProps = {
  username: string;
};

export default function EmbedCodeBlock({ username }: EmbedCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const origin = typeof window === "undefined" ? "https://your-domain.com" : window.location.origin;
  const iframeCode = `<iframe src="${origin}/public/${username}/widget" width="600" height="420" style="border:0;border-radius:12px;overflow:hidden;" loading="lazy"></iframe>`;

  return (
    <Card className="mt-4 space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Embed</p>
        <Button
          size="xs"
          variant="secondary"
          onClick={async () => {
            if (typeof navigator === "undefined" || !navigator.clipboard) return;
            await navigator.clipboard.writeText(iframeCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--surface2)] p-3 text-xs text-[var(--text)]">
        <code>{iframeCode}</code>
      </pre>
      <p className="text-xs text-[var(--muted)]">Suggested size: `width=600`, `height=420`.</p>
    </Card>
  );
}

export type { EmbedCodeBlockProps };
