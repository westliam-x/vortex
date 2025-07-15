"use client";

import { AddProjectModal, InviteClientModal } from "@/components";
import { useState } from "react";

const QuickActions = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  return (
    <div className="bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-4 shadow-inner h-full">
      <h2 className="text-white text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowProjectModal(true)}
          className="bg-cyan-700 hover:bg-cyan-800 transition text-white px-4 py-2 rounded-md text-sm"
        >
          ➕ Add New Project
        </button>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-yellow-600 hover:bg-yellow-700 transition text-white px-4 py-2 rounded-md text-sm"
        >
          📨 Invite Client
        </button>
        <button className="bg-gray-700 hover:bg-gray-800 transition text-white px-4 py-2 rounded-md text-sm">
          ⚙️ Go to Settings
        </button>
      </div>

      {/* Modals */}
      <AddProjectModal
        clients={[]}
        onSubmit={() => {}}
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
      />
      <InviteClientModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />
    </div>
  );
};

export default QuickActions;
