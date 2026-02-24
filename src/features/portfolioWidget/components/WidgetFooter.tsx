"use client";

import Link from "next/link";
import { Button } from "@/components/ui";

type WidgetFooterProps = {
  username: string;
};

export default function WidgetFooter({ username }: WidgetFooterProps) {
  const profileHref = `/public/${username}`;
  return (
    <div className="mt-4 border-t border-[var(--border)] pt-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link href={profileHref}>
          <Button size="sm">Hire me</Button>
        </Link>
        <Link href={profileHref} className="text-xs text-[var(--blue)] underline">
          View full profile
        </Link>
      </div>
    </div>
  );
}

export type { WidgetFooterProps };
