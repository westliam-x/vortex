"use client";

import { Sparkles } from "lucide-react";
import { IconButton } from "@/components/ui";
import { cn } from "@/lib";

type VoraOrbProps = {
  open: boolean;
  active: boolean;
  onClick: () => void;
};

export default function VoraOrb({ open, active, onClick }: VoraOrbProps) {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <IconButton
        aria-label="Open Vora assistant"
        size="lg"
        variant="secondary"
        onClick={onClick}
        className={cn(
          "h-12 w-12 rounded-full border-[var(--border)] bg-[var(--surface2)] shadow-lg transition-all",
          open ? "scale-95" : "scale-100 hover:scale-105",
          active ? "ring-2 ring-[var(--blue)]" : ""
        )}
      >
        <Sparkles size={18} className={cn("text-[var(--text)]", active ? "text-[var(--mint)]" : "")} />
      </IconButton>
    </div>
  );
}

export type { VoraOrbProps };
