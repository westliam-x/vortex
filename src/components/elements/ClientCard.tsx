"use client";

import { Client } from "@/types/client";
import { useRouter } from "next/navigation";
import { Building2, Mail } from "lucide-react";
import { Badge, Card, Button } from "@/components/ui";

const ClientCard = ({ client }: { client: Client }) => {
  const router = useRouter();

  const statusTone =
    client.status === "Active"
      ? "success"
      : client.status === "Pending"
      ? "warning"
      : "default";

  return (
    <Card className="p-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text)] truncate">
          {client.name}
        </h2>
        <p className="flex items-center gap-1 text-sm text-[var(--text-muted)] truncate">
          <Mail size={14} className="text-[var(--text-subtle)]" />
          {client.email}
        </p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-1 text-[var(--text-muted)]">
          <Building2 size={14} className="text-[var(--text-subtle)]" />
          {client.company || "Independent"}
        </span>
        <Badge tone={statusTone as "success" | "warning" | "default"}>
          {client.status}
        </Badge>
      </div>

      <div className="flex items-center justify-between text-xs text-[var(--text-subtle)]">
        <span>{client.projects?.length ?? 0} projects</span>
        <span>Joined {new Date(client.joinedAt).toLocaleDateString()}</span>
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => router.push(`/clients/${client._id}`)}
      >
        View details
      </Button>
    </Card>
  );
};

export default ClientCard;
