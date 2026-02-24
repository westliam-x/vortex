import type { ReactNode } from "react";
import { SectionCard } from "@/components/patterns";
import SettingsNav, { type SettingsTab } from "./SettingsNav";

type SettingsLayoutProps = {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  children: ReactNode;
};

export default function SettingsLayout({ activeTab, onTabChange, children }: SettingsLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:hidden">
        <SectionCard title="Sections">
          <div className="max-h-48 overflow-y-auto">
            <SettingsNav activeTab={activeTab} onChange={onTabChange} compact />
          </div>
        </SectionCard>
      </div>

      <aside className="hidden lg:col-span-3 lg:block">
        <SectionCard title="Settings">
          <SettingsNav activeTab={activeTab} onChange={onTabChange} />
        </SectionCard>
      </aside>

      <section className="space-y-4 lg:col-span-9">{children}</section>
    </div>
  );
}
