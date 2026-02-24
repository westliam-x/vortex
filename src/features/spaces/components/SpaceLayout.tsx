"use client";

import type { ReactNode } from "react";
import SpaceTabsMobile from "./SpaceTabsMobile";

type SpaceLayoutProps = {
  filesPane: ReactNode;
  messagesPane: ReactNode;
  statusPane: ReactNode;
  activityPane: ReactNode;
};

export default function SpaceLayout({ filesPane, messagesPane, statusPane, activityPane }: SpaceLayoutProps) {
  return (
    <>
      <div className="hidden gap-4 md:grid md:grid-cols-12">
        <aside className="md:col-span-3 md:sticky md:top-20 md:self-start">{filesPane}</aside>
        <section className="md:col-span-6">{messagesPane}</section>
        <aside className="space-y-4 md:col-span-3 md:sticky md:top-20 md:self-start">
          {statusPane}
          {activityPane}
        </aside>
      </div>

      <SpaceTabsMobile messages={messagesPane} files={filesPane} status={statusPane} activity={activityPane} />
    </>
  );
}

export type { SpaceLayoutProps };
