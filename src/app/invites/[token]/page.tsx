"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge, Button, Card, EmptyState } from "@/components/ui";
import { toast } from "react-toastify";
import { useInvite } from "@/hooks/invites/useInvite";

const hasLoginCookie = () => {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((cookie) => cookie.startsWith("logged_in="));
};

export default function InvitePage() {
  const { token } = useParams();
  const router = useRouter();
  const tokenValue = typeof token === "string" ? token : "";
  const {
    invite,
    projects,
    loading,
    actionLoading,
    error,
    acceptInvite: acceptInviteRequest,
    declineInvite: declineInviteRequest,
  } = useInvite(tokenValue);

  useEffect(() => {
    if (!tokenValue) return;
    if (!hasLoginCookie()) {
      router.replace(`/login?invite=${tokenValue}&next=/invites/${tokenValue}`);
    }
  }, [router, tokenValue]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const acceptInvite = async () => {
    if (!tokenValue) return;
    try {
      const response = await acceptInviteRequest();
      if (!response) return;

      toast.success("Invite accepted");
      if (invite?.type === "Team") {
        router.replace("/team");
        return;
      }

      const projectId = projects[0]?.id ?? projects[0]?._id;
      if (projectId) {
        router.replace(`/projects/${projectId}`);
        return;
      }

      if (response.clientId) {
        router.replace(`/clients/${response.clientId}`);
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to accept invite";
      if (message.toLowerCase().includes("unauthorized")) {
        router.replace(`/login?invite=${tokenValue}&next=/invites/${tokenValue}`);
        return;
      }
      toast.error(message);
    }
  };

  const declineInvite = async () => {
    if (!tokenValue) return;
    try {
      await declineInviteRequest();
      toast.success("Invite declined");
      router.replace("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to decline invite");
    }
  };

  if (!tokenValue) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
        <EmptyState
          title="Invalid invite link"
          description="Ask the inviter to send a fresh link."
          action={
            <Link href="/">
              <Button variant="secondary">Back to Vortex</Button>
            </Link>
          }
        />
      </main>
    );
  }

  if (!loading && !invite) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
        <EmptyState
          title="Invite not found"
          description="This invite may be invalid or already used."
          action={
            <Link href="/">
              <Button variant="secondary">Back to Vortex</Button>
            </Link>
          }
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-subtle)]">Vortex invite</p>
              <h1 className="text-3xl font-semibold">You&apos;re invited to join</h1>
            </div>
            {invite?.status ? (
              <Badge tone={invite.status === "pending" ? "info" : "default"}>
                {invite.status}
              </Badge>
            ) : null}
          </div>

          {loading ? (
            <p className="text-sm text-[var(--text-muted)]">Loading invite...</p>
          ) : invite ? (
            <div className="space-y-3 text-sm text-[var(--text-muted)]">
              <p>
                Invited by <span className="text-[var(--text)]">{invite.inviterName ?? "Vortex"}</span>
              </p>
              <p>
                Type: <span className="text-[var(--text)]">{invite.type}</span>
              </p>
              {invite.role ? (
                <p>
                  Role: <span className="text-[var(--text)]">{invite.role}</span>
                </p>
              ) : null}
              {projects.length > 0 ? (
                <div>
                  <p className="mb-2">Projects:</p>
                  <ul className="space-y-1">
                    {projects.map((project) => (
                      <li key={project.id ?? project._id} className="text-[var(--text)]">
                        {project.title ?? "Untitled project"}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </Card>

        {invite?.status === "pending" ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={acceptInvite} disabled={actionLoading}>
              Accept invite
            </Button>
            <Button variant="secondary" onClick={declineInvite} disabled={actionLoading}>
              Decline
            </Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => router.replace("/")}>
            Back to Vortex
          </Button>
        )}
      </div>
    </main>
  );
}
