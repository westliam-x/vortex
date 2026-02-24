import type { ReactNode } from "react";
import { AppShell } from "@/components/layout";
import { VoraShell } from "@/features/vora";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      {children}
      <VoraShell />
    </AppShell>
  );
}
