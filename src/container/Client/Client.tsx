"use client";

import { useState } from "react";
import { ClientList, ClientToolbar } from "./components";
import { AddClientModal } from "@/components";
import { DashboardLayout } from "@/layouts";

export default function ClientContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <ClientToolbar onAddClient={() => setIsModalOpen(true)} />
        <ClientList />
        <AddClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
