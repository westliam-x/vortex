import API_ROUTES from "@/endpoints/routes";
import { Project } from "@/types/project";
import { makeRequest } from "@/api/request";

const normalizeProject = (project: Project & { _id?: string }) => {
  if (!project.id && project._id) {
    return { ...project, id: project._id };
  }
  return project;
};
  
export const fetchProjects = async (): Promise<Project[]> => {
  const response = await makeRequest<{ projects: Project[] }>({
    url: API_ROUTES.PROJECT.LIST,
    method: "GET",
  });

  return (response.projects ?? []).map(normalizeProject);
};

export const fetchProjectById = async (id: string): Promise<Project | null> => {
  const response = await makeRequest<{ project: Project | null }>({
    url: `${API_ROUTES.PROJECT.BY_ID}/${id}`,
    method: "GET",
  });

  return response.project ? normalizeProject(response.project) : null;
};
