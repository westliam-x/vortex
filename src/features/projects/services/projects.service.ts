import API_ROUTES from "@/endpoints/routes";
import { Project } from "@/types/project";
import { makeRequest } from "@/api/request";
import type { PaginationMeta } from "@/types/api";

const normalizeProject = (project: Project & { _id?: string }) => {
  if (!project.id && project._id) {
    return { ...project, id: project._id };
  }
  return project;
};

type ProjectListParams = {
  page: number;
  limit: number;
  filters?: {
    search?: string;
    status?: string;
    sort?: string;
  };
};

type PaginatedProjectsResponse = {
  data: Project[];
  pagination: PaginationMeta;
};

export const fetchProjects = async ({
  page = 1,
  limit = 20,
  filters,
}: Partial<ProjectListParams> = {}): Promise<PaginatedProjectsResponse> => {
  const response = await makeRequest<PaginatedProjectsResponse>({
    url: API_ROUTES.PROJECT.LIST,
    method: "GET",
    config: {
      params: {
        page,
        limit,
        ...(filters ?? {}),
      },
    },
  });

  return {
    data: (response.data ?? []).map(normalizeProject),
    pagination: response.pagination,
  };
};

export const fetchProjectById = async (id: string): Promise<Project | null> => {
  const response = await makeRequest<{ project: Project | null }>({
    url: `${API_ROUTES.PROJECT.BY_ID}/${id}`,
    method: "GET",
  });

  return response.project ? normalizeProject(response.project) : null;
};
