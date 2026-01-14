import API_ROUTES from "@/endpoints/routes";
import { Project } from "@/types/project";
import { safeRequest } from "@/lib";
import { mockProjects } from "@/data/mock";

const normalizeProject = (project: Project & { _id?: string }) => {
  if (!project.id && project._id) {
    return { ...project, id: project._id };
  }
  return project;
};
  
export const fetchProjects = async (): Promise<Project[]> => {
  const response = await safeRequest<{ projects: Project[] }>(
    {
      url: API_ROUTES.PROJECT.LIST,
      method: "GET",
    },
    { projects: mockProjects }
  );

  return response.projects.map(normalizeProject);
};

export const fetchProjectById = async (id: string): Promise<Project | null> => {
  const fallback =
    mockProjects.find((item) => item.id === id) ?? mockProjects[0] ?? null;
  const response = await safeRequest<{ project: Project | null }>(
    {
      url: `${API_ROUTES.PROJECT.BY_ID}/${id}`,
      method: "GET",
    },
    { project: fallback }
  );

  return response.project ? normalizeProject(response.project) : null;
};
