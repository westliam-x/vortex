"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout";
import SettingsLayout from "./components/SettingsLayout";
import SettingsSection from "./components/SettingsSection";
import type { SettingsTab } from "./components/SettingsNav";
import ProfileSettingsForm from "./components/ProfileSettingsForm";
import SecuritySettings from "./components/SecuritySettings";
import WorkspaceSettingsForm from "./components/WorkspaceSettingsForm";
import NotificationsSettings from "./components/NotificationsSettings";
import IntegrationsSettings from "./components/IntegrationsSettings";
import BillingSettings from "./components/BillingSettings";

const validTabs: SettingsTab[] = [
  "profile",
  "workspace",
  "security",
  "notifications",
  "integrations",
  "vora",
  "billing",
];

const isSettingsTab = (value: string | null): value is SettingsTab =>
  value !== null && validTabs.includes(value as SettingsTab);

export default function Settings() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromUrl = () => {
      const tabParam = new URLSearchParams(window.location.search).get("tab");
      setActiveTab(isSettingsTab(tabParam) ? tabParam : "profile");
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const onTabChange = (tab: SettingsTab) => {
    if (typeof window === "undefined") return;
    const next = new URLSearchParams(window.location.search);
    next.set("tab", tab);
    setActiveTab(tab);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const sectionContent = useMemo(() => {
    switch (activeTab) {
      case "profile":
        return (
          <SettingsSection title="Profile" description="Manage your personal details and public identity.">
            <ProfileSettingsForm />
          </SettingsSection>
        );
      case "workspace":
        return (
          <SettingsSection
            title="Workspace"
            description="Team defaults, branding, timezone, and workflow preferences."
          >
            <WorkspaceSettingsForm />
          </SettingsSection>
        );
      case "security":
        return (
          <SettingsSection title="Security" description="Session, password, and access controls.">
            <SecuritySettings />
          </SettingsSection>
        );
      case "notifications":
        return (
          <SettingsSection title="Notifications" description="Email and in-app notification preferences.">
            <NotificationsSettings />
          </SettingsSection>
        );
      case "integrations":
        return (
          <SettingsSection title="Integrations" description="Connected tools and external providers.">
            <IntegrationsSettings />
          </SettingsSection>
        );
      case "vora":
        return (
          <SettingsSection title="Vora" description="Assistant defaults and runtime settings.">
            <p className="text-sm text-[var(--muted)]">
              Vora controls are available in the dedicated portal at `/vora/settings`.
            </p>
          </SettingsSection>
        );
      case "billing":
        return (
          <SettingsSection title="Billing" description="Subscription, invoices, and payment methods.">
            <BillingSettings />
          </SettingsSection>
        );
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Workspace and account preferences." />
      <SettingsLayout activeTab={activeTab} onTabChange={onTabChange}>
        {sectionContent}
      </SettingsLayout>
    </div>
  );
}
