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
    <div className="group fixed bottom-5 right-5 z-40">
      <style jsx>{`
        @keyframes vora-orb-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full bg-[var(--blue)]/35 blur-xl transition-all duration-300",
          open || active ? "scale-125 opacity-80" : "scale-100 opacity-45 group-hover:scale-125 group-hover:opacity-70"
        )}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,255,148,0.95), rgba(0,122,255,0.95), rgba(0,255,148,0.95))",
          animation: "vora-orb-spin 2.2s linear infinite",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
          mask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
          opacity: open || active ? 1 : 0.95,
        }}
      />
      <IconButton
        aria-label="Open Vora assistant"
        size="lg"
        variant="secondary"
        onClick={onClick}
        className={cn(
          "relative h-12 w-12 rounded-full border-[var(--border)] bg-[var(--surface2)] shadow-lg transition-all duration-300",
          open ? "scale-95" : "scale-100 hover:-translate-y-0.5 hover:scale-105",
          active ? "ring-2 ring-[var(--blue)] shadow-[0_0_24px_rgba(0,122,255,0.45)]" : "hover:shadow-[0_0_20px_rgba(0,122,255,0.35)]"
        )}
      >
        <Sparkles size={18} className={cn("text-[var(--text)]", active ? "text-[var(--mint)]" : "")} />
      </IconButton>
    </div>
  );
}

export type { VoraOrbProps };
