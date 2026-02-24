"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EmptyState } from "@/components/ui";
import type { PortfolioWidgetData } from "./types";
import { fetchWidgetData } from "./services/widget.service";
import WidgetShell from "./components/WidgetShell";
import WidgetHeader from "./components/WidgetHeader";
import WidgetReviewRow from "./components/WidgetReviewRow";
import WidgetFooter from "./components/WidgetFooter";
import EmbedCodeBlock from "./components/EmbedCodeBlock";

export default function PortfolioWidget() {
  const params = useParams();
  const username = typeof params.username === "string" ? params.username : "";
  const [data, setData] = useState<PortfolioWidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchWidgetData(username)
      .then((res) => setData(res))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load widget"))
      .finally(() => setLoading(false));
  }, [username]);

  if (!username) {
    return (
      <main className="min-h-screen bg-[var(--bg)] p-4">
        <WidgetShell>
          <EmptyState title="Missing username" description="The widget URL is missing a username." />
        </WidgetShell>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg)] p-4">
        <WidgetShell>
          <div className="space-y-2">
            <div className="h-12 animate-pulse rounded bg-[var(--surface2)]" />
            <div className="h-16 animate-pulse rounded bg-[var(--surface2)]" />
            <div className="h-16 animate-pulse rounded bg-[var(--surface2)]" />
          </div>
        </WidgetShell>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-[var(--bg)] p-4">
        <WidgetShell>
          <EmptyState title="Unable to load widget" description={error ?? "Try again later."} />
        </WidgetShell>
      </main>
    );
  }

  const reviews = data.reviews.slice(0, 6);

  return (
    <main className="min-h-screen bg-[var(--bg)] p-4 text-[var(--text)]">
      <WidgetShell>
        <WidgetHeader
          displayName={data.displayName}
          avgRating={data.avgRating}
          verifiedReviewsCount={data.verifiedReviewsCount}
        />

        <div className="mt-3 space-y-2">
          {reviews.map((review) => (
            <WidgetReviewRow key={review.id} review={review} />
          ))}
        </div>

        <WidgetFooter username={data.username} />
      </WidgetShell>

      <div className="mx-auto mt-4 w-full max-w-[600px]">
        <EmbedCodeBlock username={data.username} />
      </div>
    </main>
  );
}
