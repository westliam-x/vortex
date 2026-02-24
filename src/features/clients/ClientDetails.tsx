"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { EditClientModal } from "@/components";
import { PageHeader, ContentGrid, RightContextPanel } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { Button, EmptyState, StatusBadge } from "@/components/ui";
import { getProjectId } from "@/lib/ids";
import { deleteClient, updateClient } from "./services/clients.service";
import { useClientDetails } from "./hooks/useClientDetails";

export default function ClientDetails() {
  const router = useRouter();
  const { id } = useParams();
  const clientId = typeof id === "string" ? id : undefined;
  const { client, loading, setClient } = useClientDetails(clientId);
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/clients");
  };

  const onMessageClient = () => {
    if (!client?.email) {
      toast.info("Client email is not available.");
      return;
    }
    window.location.href = `mailto:${client.email}?subject=${encodeURIComponent(`Project update for ${client.name}`)}`;
  };

  const onCreateInvoice = () => {
    if (!clientId) {
      router.push("/invoices/new");
      return;
    }
    router.push(`/invoices/new?clientId=${clientId}`);
  };

  const onDeleteClient = async () => {
    if (!clientId || !client) return;
    const confirmed = window.confirm(`Remove client "${client.name}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteClient(clientId);
      toast.success("Client removed.");
      router.push("/clients");
    } catch {
      toast.error("Failed to remove client.");
    } finally {
      setDeleting(false);
    }
  };

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
        secondaryActions={[{ label: "Back", variant: "outline", onClick: onBack }]}
      />

      <ContentGrid
        main={
          <div className="space-y-4">
            <SectionCard
              title="Profile"
              actions={
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => setEditOpen(true)}>Edit client</Button>
                  <Button size="sm" variant="secondary" onClick={onMessageClient}>Message</Button>
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
                <Button fullWidth onClick={onMessageClient}>Message client</Button>
                <Button fullWidth variant="secondary" onClick={onCreateInvoice}>Create invoice</Button>
                <Button fullWidth variant="destructive" onClick={() => void onDeleteClient()} loading={deleting}>
                  Remove client
                </Button>
              </div>
            </SectionCard>
          </RightContextPanel>
        }
      />

      {client ? (
        <EditClientModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          client={client}
          onUpdate={(updatedClient) => {
            if (!clientId) return;
            void (async () => {
              try {
                const saved = await updateClient(clientId, updatedClient);
                setClient(saved);
                toast.success("Client updated.");
              } catch {
                toast.error("Failed to update client.");
              }
            })();
          }}
        />
      ) : null}
    </div>
  );
}
