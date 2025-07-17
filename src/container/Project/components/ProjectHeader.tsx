"use client";

import { AddProjectModal, Button } from "@/components";
import { useState } from "react";

const ProjectHeader = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  return (
    <div className="flex items-center justify-between mb-6 x">
      <h1 className="text-3xl font-bold text-white">Projects</h1>
      <Button variant="primary" onClick={() => setShowProjectModal(true)}>
        + New Project
      </Button>
      <AddProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
      />
    </div>
  );
};

export default ProjectHeader;
