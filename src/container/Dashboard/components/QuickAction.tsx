"use client";

import { AddProjectModal, InviteUserModal } from "@/components";
import { useState } from "react";
import { PlusCircle, UserPlus, Settings } from "lucide-react";

const QuickActions = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1F] border border-[#2F2F41] rounded-2xl p-5 shadow-lg h-full">
      <h2 className="text-white text-lg font-semibold mb-5">Quick Actions</h2>

      <div className="grid gap-3">
        {/* Add Project */}
        <button
          onClick={() => setShowProjectModal(true)}
          className="flex items-center gap-2 bg-[#985EFF] hover:bg-[#864fe0] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          aria-label="Add New Project"
        >
          <PlusCircle size={16} />
          Add New Project
        </button>

        {/* Invite Client */}
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 bg-[#2F2F41] hover:bg-[#3b3b55] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          aria-label="Invite Client"
        >
          <UserPlus size={16} />
          Invite Client
        </button>

        {/* Settings */}
        <button
          className="flex items-center gap-2 bg-[#2F2F41] hover:bg-[#3b3b55] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          aria-label="Go to Settings"
        >
          <Settings size={16} />
          Go to Settings
        </button>
      </div>

      {/* Modals */}
      <AddProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
      />
      <InviteUserModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={(data: { type: string }) => {
          if (data.type === "Client") {
            // send invite to client with data.projectId
          } else {
            // send invite to team member with data.role
          }
        }}
      />
    </div>
  );
};

export default QuickActions;
