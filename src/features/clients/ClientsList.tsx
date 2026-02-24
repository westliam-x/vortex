"use client";

import { useState } from "react";
import { ClientList, ClientToolbar } from "./components";
import { AddClientModal } from "@/components";

export default function ClientsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 p-3 md:p-6">
      <ClientToolbar onAddClient={() => setIsModalOpen(true)} />
      <ClientList />
      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
