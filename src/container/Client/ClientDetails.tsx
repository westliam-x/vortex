"use client";

import { DashboardLayout } from "@/layouts";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Button, Card, EmptyState } from "@/components/ui";
import { mockClients } from "@/data/mock";

export default function ClientDetails() {
  const { id } = useParams();

  const client = useMemo(() => {
    if (typeof id !== "string") return null;
    return mockClients.find((item) => item._id === id) ?? mockClients[0] ?? null;
  }, [id]);

  if (!client) {
    return (
      <DashboardLayout>
        <EmptyState
          title="Client not found"
          description="We could not find that client."
          action={
            <Link href="/clients">
              <Button variant="secondary">Back to clients</Button>
            </Link>
          }
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link href="/clients" className="text-sm text-[var(--text-subtle)] hover:text-[var(--text)]">
          Back to Clients
        </Link>

        <Card className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
            <h2 className="text-lg font-semibold text-[var(--text)] mb-2">Notes</h2>
            <p className="text-[var(--text-muted)]">{client.notes}</p>
          </Card>
        ) : null}

        <Card>
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Projects</h2>
          {client.projects.length > 0 ? (
            <div className="overflow-x-auto border border-[var(--border)] rounded-lg">
              <table className="min-w-full bg-[var(--surface)] text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--text-subtle)]">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {client.projects.map((project) => (
                    <tr key={project.id} className="border-b border-[var(--border)]">
                      <td className="py-3 px-4 text-[var(--text)]">{project.title}</td>
                      <td className="py-3 px-4 text-[var(--text-muted)]">{project.status}</td>
                      <td className="py-3 px-4">
                        <Link href={`/projects/${project.id}`} className="text-[var(--accent)] hover:text-[var(--accent-strong)]">
                          View Project
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[var(--text-muted)]">No projects linked to this client.</p>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
