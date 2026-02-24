"use client";

import type { ReactNode } from "react";
import { Tabs } from "@/components/ui";

type SpaceTabsMobileProps = {
  messages: ReactNode;
  files: ReactNode;
  status: ReactNode;
  activity: ReactNode;
};

export default function SpaceTabsMobile({ messages, files, status, activity }: SpaceTabsMobileProps) {
  return (
    <div className="md:hidden">
      <Tabs
        defaultValue="messages"
        items={[
          { value: "messages", label: "Messages", content: messages },
          { value: "files", label: "Files", content: files },
          { value: "status", label: "Status", content: status },
          { value: "activity", label: "Activity", content: activity },
        ]}
      />
    </div>
  );
}

export type { SpaceTabsMobileProps };
