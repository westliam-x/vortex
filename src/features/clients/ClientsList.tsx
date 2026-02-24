"use client";

import { useState } from "react";
import { ClientList, ClientToolbar } from "./components";
import { AddClientModal } from "@/components";
import { PageHeader } from "@/components/layout";

export default function ClientsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        subtitle="Keep profiles, project history, and status in one place."
        primaryAction={{
          label: "Add Client",
          onClick: () => setIsModalOpen(true),
        }}
        rightSlot={<ClientToolbar />}
      />
      <ClientList />
      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
