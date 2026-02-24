import type { ReactNode } from "react";
import { SectionCard } from "@/components/patterns";

type SettingsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <SectionCard title={title} description={description}>
      {children}
    </SectionCard>
  );
}

export type { SettingsSectionProps };
