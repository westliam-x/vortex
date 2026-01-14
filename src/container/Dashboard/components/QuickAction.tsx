"use client";

import { AddProjectModal, InviteUserModal } from "@/components";
import { useState } from "react";
import { PlusCircle, UserPlus, Settings } from "lucide-react";
import { Button, Card } from "@/components/ui";
import Link from "next/link";

const QuickActions = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <Card className="h-full">
      <h2 className="text-[var(--text)] text-lg font-semibold mb-5">
        Quick actions
      </h2>

      <div className="grid gap-3">
        <Button
          onClick={() => setShowProjectModal(true)}
          className="gap-2"
          aria-label="Add new project"
        >
          <PlusCircle size={16} />
          Add project
        </Button>

        <Button
          onClick={() => setShowInviteModal(true)}
          variant="secondary"
          className="gap-2"
          aria-label="Invite client"
        >
          <UserPlus size={16} />
          Invite client
        </Button>

        <Link href="/settings">
          <Button variant="ghost" className="w-full gap-2" aria-label="Go to settings">
            <Settings size={16} />
            Workspace settings
          </Button>
        </Link>
      </div>

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
    </Card>
  );
};

export default QuickActions;
