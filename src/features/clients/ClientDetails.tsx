"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Button, Card, EmptyState } from "@/components/ui";
import { getProjectId } from "@/lib/ids";
import { useClientDetails } from "./hooks/useClientDetails";

export default function ClientDetails() {
  const { id } = useParams();
  const clientId = typeof id === "string" ? id : undefined;
  const { client } = useClientDetails(clientId);

  if (!client) {
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
      <Link href="/clients" className="text-sm text-[var(--text-subtle)] hover:text-[var(--text)]">
        Back to Clients
      </Link>

      <Card className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--text)]">{client.name}</h1>
            <p className="text-sm text-[var(--text-muted)]">
              {client.company ? client.company : "No company specified"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>Edit client</Button>
            <Button variant="secondary">Message client</Button>
            <Button variant="destructive">Remove client</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="text-[var(--text-subtle)]">Email</p>
            <p className="text-[var(--text)]">{client.email}</p>
          </div>
          <div>
            <p className="text-[var(--text-subtle)]">Phone</p>
            <p className="text-[var(--text)]">{client.phone || "Not provided"}</p>
          </div>
          <div>
            <p className="text-[var(--text-subtle)]">Status</p>
            <p className="text-[var(--text)]">{client.status}</p>
          </div>
          <div>
            <p className="text-[var(--text-subtle)]">Joined</p>
            <p className="text-[var(--text)]">{format(new Date(client.joinedAt), "dd MMM yyyy")}</p>
          </div>
        </div>
      </Card>

      {client.notes ? (
        <Card>
          <h2 className="mb-2 text-lg font-semibold text-[var(--text)]">Notes</h2>
          <p className="text-[var(--text-muted)]">{client.notes}</p>
        </Card>
      ) : null}

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-[var(--text)]">Projects</h2>
        {client.projects.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="min-w-full bg-[var(--surface)] text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-[var(--text-subtle)]">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {client.projects.map((project) => {
                  const projectId = getProjectId(project);
                  return (
                    <tr key={projectId ?? project.title} className="border-b border-[var(--border)]">
                      <td className="px-4 py-3 text-[var(--text)]">{project.title}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{project.status}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={projectId ? `/projects/${projectId}` : "/projects"}
                          className="text-[var(--accent)] hover:text-[var(--accent-strong)]"
                        >
                          View Project
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[var(--text-muted)]">No projects linked to this client.</p>
        )}
      </Card>
    </div>
  );
}
