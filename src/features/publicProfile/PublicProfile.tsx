"use client";

import { useParams } from "next/navigation";
import { Card, EmptyState } from "@/components/ui";
import { ContentGrid, RightContextPanel } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { ReputationScore } from "@/shared";
import { usePublicProfile } from "./hooks/usePublicProfile";
import HireMeCard from "./components/HireMeCard";
import ProfileHeader from "./components/ProfileHeader";
import StackTags from "./components/StackTags";
import VerifiedReviews from "./components/VerifiedReviews";

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <Card className="p-4">
    <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{label}</p>
    <p className="mt-1 text-xl font-semibold text-[var(--text)]">{value}</p>
  </Card>
);

export default function PublicProfile() {
  const params = useParams();
  const username = typeof params.username === "string" ? params.username : "";
  const { profile, loading, error } = usePublicProfile(username || undefined);

  if (!username) {
    return (
      <main className="min-h-screen bg-[var(--bg)] p-6">
        <div className="mx-auto max-w-6xl">
          <EmptyState title="Profile not found" description="No username was provided in the URL." />
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg)] p-6">
        <div className="mx-auto max-w-6xl space-y-4">
          <Card className="h-24 animate-pulse bg-[var(--surface2)]" />
          <Card className="h-16 animate-pulse bg-[var(--surface2)]" />
          <Card className="h-40 animate-pulse bg-[var(--surface2)]" />
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-[var(--bg)] p-6">
        <div className="mx-auto max-w-6xl">
          <EmptyState
            title="Unable to load profile"
            description={error ?? "The requested profile is unavailable."}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] p-6 text-[var(--text)]">
      <div className="mx-auto max-w-6xl">
        <ContentGrid
          main={
            <div className="space-y-6">
              <ProfileHeader
                displayName={profile.displayName}
                headline={profile.headline}
                location={profile.location}
                avatarUrl={profile.avatarUrl}
              />

              <SectionCard title="Tech Stack">
                <StackTags stack={profile.stack} />
              </SectionCard>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <StatCard label="Total Projects" value={String(profile.totalProjects)} />
                <StatCard label="Verified Reviews" value={String(profile.verifiedReviewsCount)} />
                <StatCard label="Avg Rating" value={profile.avgRating.toFixed(1)} />
              </div>

              <ReputationScore
                rating={profile.avgRating}
                verifiedReviews={profile.verifiedReviewsCount}
                completedProjects={profile.totalProjects}
              />

              <VerifiedReviews reviews={profile.reviews} />
            </div>
          }
          right={
            <RightContextPanel>
              <HireMeCard username={profile.username} />
            </RightContextPanel>
          }
        />
      </div>
    </main>
  );
}
