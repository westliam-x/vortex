"use client";

import { AddProjectModal, InviteUserModal } from "@/components";
import { useState } from "react";

const QuickActions = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  return (
    <div className="bg-[#090909] border border-[#2F2F41] rounded-xl p-4 shadow-inner h-full">
      <h2 className="text-white text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowProjectModal(true)}
          className="bg-[#260b55] transition cursor-pointer  text-white px-4 py-2 rounded-md text-sm"
        >
          ➕ Add New Project
        </button>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-[#260b55]  transition cursor-pointer  text-white px-4 py-2 rounded-md text-sm"
        >
          📨 Invite Client
        </button>
        <button className="bg-[#260b55] cursor-pointer transition text-white px-4 py-2 rounded-md text-sm">
          ⚙️ Go to Settings
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
