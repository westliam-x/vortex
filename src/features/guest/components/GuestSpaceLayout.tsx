"use client";

import type { ReactNode } from "react";
import { Tabs } from "@/components/ui";

type GuestSpaceLayoutProps = {
  topBar: ReactNode;
  verified: boolean;
  otpGate?: ReactNode;
  messagesPane?: ReactNode;
  filesPane?: ReactNode;
  summaryPane?: ReactNode;
};

export default function GuestSpaceLayout({
  topBar,
  verified,
  otpGate,
  messagesPane,
  filesPane,
  summaryPane,
}: GuestSpaceLayoutProps) {
  return (
    <div className="space-y-6">
      {topBar}

      {!verified ? (
        <div className="mx-auto max-w-xl">{otpGate}</div>
      ) : (
        <>
          <div className="hidden gap-4 md:grid md:grid-cols-12">
            <aside className="md:col-span-3 md:sticky md:top-20 md:self-start">{filesPane}</aside>
            <section className="md:col-span-6">{messagesPane}</section>
            <aside className="md:col-span-3 md:sticky md:top-20 md:self-start">{summaryPane}</aside>
          </div>

          <div className="md:hidden">
            <Tabs
              defaultValue="messages"
              items={[
                { value: "messages", label: "Messages", content: messagesPane },
                { value: "files", label: "Files", content: filesPane },
                { value: "summary", label: "Summary", content: summaryPane },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}

export type { GuestSpaceLayoutProps };
