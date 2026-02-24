"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { PageHeader, ContentGrid, RightContextPanel } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { Button, EmptyState, StatusBadge } from "@/components/ui";
import { getProjectId } from "@/lib/ids";
import { useClientDetails } from "./hooks/useClientDetails";

export default function ClientDetails() {
  const router = useRouter();
  const { id } = useParams();
  const clientId = typeof id === "string" ? id : undefined;
  const { client, loading } = useClientDetails(clientId);

  if (!client && !loading) {
    return (
      <EmptyState
        title="Client not found"
        description="We could not find that client."
        action={
          <Link href="/clients">
            <Button variant="secondary">Back to clients</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={client?.name ?? "Client"}
        subtitle={client?.company ?? "Client profile and relationship details."}
        secondaryActions={[{ label: "Back", variant: "outline", onClick: () => router.back() }]}
      />

      <ContentGrid
        main={
          <div className="space-y-4">
            <SectionCard
              title="Profile"
              actions={
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Edit client</Button>
                  <Button size="sm" variant="secondary">Message</Button>
                </div>
              }
            >
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <p className="text-[var(--muted)]">Email</p>
                  <p className="text-[var(--text)]">{client?.email ?? "-"}</p>
                </div>
                <div>
                  <p className="text-[var(--muted)]">Phone</p>
                  <p className="text-[var(--text)]">{client?.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-[var(--muted)]">Joined</p>
                  <p className="text-[var(--text)]">
                    {client?.joinedAt ? format(new Date(client.joinedAt), "dd MMM yyyy") : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--muted)]">Company</p>
                  <p className="text-[var(--text)]">{client?.company || "Not specified"}</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Notes">
              <p className="text-sm text-[var(--muted)]">{client?.notes || "No notes available."}</p>
            </SectionCard>

            <SectionCard title="Projects">
              {client?.projects?.length ? (
                <div className="space-y-2">
                  {client.projects.map((project) => {
                    const projectId = getProjectId(project);
                    return (
                      <div
                        key={projectId ?? project.title}
                        className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-4 py-3"
                      >
                        <div>
                          <p className="text-sm text-[var(--text)]">{project.title}</p>
                          <p className="text-xs text-[var(--muted)]">{project.status}</p>
                        </div>
                        <Link href={projectId ? `/projects/${projectId}` : "/projects"}>
                          <Button size="sm" variant="outline">Open</Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-[var(--muted)]">No projects linked to this client.</p>
              )}
            </SectionCard>
          </div>
        }
        right={
          <RightContextPanel>
            <SectionCard title="Status">
              <StatusBadge kind="client" status={client?.status ?? "Inactive"} />
            </SectionCard>

            <SectionCard title="Metadata">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Projects</dt>
                  <dd className="text-[var(--text)]">{client?.projects?.length ?? 0}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Assigned team</dt>
                  <dd className="text-[var(--text)]">{client?.assignedTo?.length ?? 0}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Last activity</dt>
                  <dd className="text-[var(--text)]">{client?.lastActivity ? format(new Date(client.lastActivity), "dd MMM yyyy") : "-"}</dd>
                </div>
              </dl>
            </SectionCard>

            <SectionCard title="Quick Actions">
              <div className="space-y-2">
                <Button fullWidth>Message client</Button>
                <Button fullWidth variant="secondary">Create invoice</Button>
                <Button fullWidth variant="destructive">Remove client</Button>
              </div>
            </SectionCard>
          </RightContextPanel>
        }
      />
    </div>
  );
}
