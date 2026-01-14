import { useCallback, useEffect, useMemo, useState } from "react";
import { Project } from "@/types/project";
import { Client } from "@/types/client";
import { fetchProjectById } from "@/services/projectServices";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { mockClients } from "@/data/mock";
import { getId, getProjectId } from "@/lib/ids";

export const useProjectDetails = (projectId?: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProject = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjectById(projectId);
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const client = useMemo<Client | null>(() => {
    if (!project) return null;
    if (
      typeof project?.clientId === "object" &&
      project?.clientId &&
      "name" in project?.clientId
    ) {
      return project?.clientId as Client;
    }
    const clientId = getId(project?.clientId);
    if (!clientId) return null;
    return mockClients.find((item) => getId(item) === clientId) ?? null;
  }, [project]);

  const enableShare = useCallback(async () => {
    const resolvedProjectId = getProjectId(project);
    if (!resolvedProjectId) return;
    const response = await makeRequest<{ shareUrl: string }>({
      url: `${API_ROUTES.VORTEX.SUMMARY}/${resolvedProjectId}/share-enable`,
      method: "POST",
      data: {},
    });
    setShareUrl(response.shareUrl);
  }, [project]);

  const closeProject = useCallback(async () => {
    const resolvedProjectId = getProjectId(project);
    if (!resolvedProjectId) return;
    const response = await makeRequest<{ project: Project }>({
      url: `${API_ROUTES.PROJECT.BY_ID}/${resolvedProjectId}`,
      method: "PATCH",
      data: { status: "Completed" },
    });
    setProject(response.project ?? { ...project, status: "Completed" });
  }, [project]);

  return {
    project,
    client,
    loading,
    error,
    shareUrl,
    enableShare,
    closeProject,
    setProject,
  };
};
