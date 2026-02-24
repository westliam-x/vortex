"use client";

import { MapPin } from "lucide-react";
import { Card } from "@/components/ui";

type ProfileHeaderProps = {
  displayName: string;
  headline: string;
  location?: string;
  avatarUrl?: string;
};

export default function ProfileHeader({
  displayName,
  headline,
  location,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={displayName}
          className="h-16 w-16 rounded-full border border-[var(--border)] object-cover"
        />
      ) : (
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-xl font-semibold">
          {displayName.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold text-[var(--text)]">{displayName}</h1>
        <p className="text-sm text-[var(--muted)]">{headline}</p>
        {location ? (
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--muted)]">
            <MapPin size={12} />
            {location}
          </p>
        ) : null}
      </div>
    </Card>
  );
}

export type { ProfileHeaderProps };
