import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";
import type { TeamMember } from "@/types/team";
import type { AxiosRequestConfig } from "axios";
import type { PaginationMeta } from "@/types/api";

const normalizeMember = (member: TeamMember & { _id?: string }) => {
  if (!member.id && member._id) {
    return { ...member, id: member._id };
  }
  return member;
};

type TeamListParams = {
  page: number;
  limit: number;
  filters?: {
    search?: string;
    status?: string;
    sort?: string;
  };
  config?: AxiosRequestConfig;
};

type PaginatedTeamResponse = {
  data: TeamMember[];
  pagination: PaginationMeta;
};

export const fetchTeam = async ({
  page = 1,
  limit = 20,
  filters,
  config,
}: Partial<TeamListParams> = {}): Promise<PaginatedTeamResponse> => {
  const response = await makeRequest<PaginatedTeamResponse>({
    url: API_ROUTES.TEAM.BASE,
    method: "GET",
    config: {
      ...config,
      params: {
        page,
        limit,
        ...(filters ?? {}),
      },
    },
  });
  return {
    data: (response.data ?? []).map(normalizeMember),
    pagination: response.pagination,
  };
};

export const updateTeamRole = async (memberId: string, role: TeamMember["role"]) => {
  const response = await makeRequest<{ member: TeamMember }>({
    url: `${API_ROUTES.TEAM.BASE}/${memberId}/role`,
    method: "PATCH",
    data: { role },
  });
  return normalizeMember(response.member);
};

export const removeTeamMember = async (memberId: string) => {
  await makeRequest({
    url: `${API_ROUTES.TEAM.BASE}/${memberId}/remove`,
    method: "PATCH",
  });
};
