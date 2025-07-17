import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { Project } from "@/types/project";

  
export const fetchProjects = async (): Promise<Project[]> => {
  const response = await makeRequest<{ projects: Project[] }>({
    url: API_ROUTES.PROJECT.LIST,
    method: "GET",
  });

  return response.projects;
};
