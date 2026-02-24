"use client";

import { useState } from "react";
import { SectionCard } from "@/components/patterns";
import { Button } from "@/components/ui";

type HireMeCardProps = {
  username: string;
};

export default function HireMeCard({ username }: HireMeCardProps) {
  const [copied, setCopied] = useState(false);

  return (
    <SectionCard title="Hire Me" description="Start a new engagement with this freelancer">
      <div className="space-y-2">
        <Button
          fullWidth
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = `/signup?hire=${encodeURIComponent(username)}`;
            }
          }}
        >
          Start a project
        </Button>
        <Button
          fullWidth
          variant="secondary"
          onClick={async () => {
            if (typeof navigator === "undefined" || !navigator.clipboard) return;
            const profileLink =
              typeof window === "undefined"
                ? `/public/${username}`
                : `${window.location.origin}/public/${username}`;
            await navigator.clipboard.writeText(profileLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
        >
          {copied ? "Copied" : "Copy profile link"}
        </Button>
      </div>
    </SectionCard>
  );
}

export type { HireMeCardProps };
