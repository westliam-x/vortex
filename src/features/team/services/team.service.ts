import API_ROUTES from "@/endpoints/routes";
import { makeRequest } from "@/api/request";
import type { TeamMember } from "@/types/team";
import type { AxiosRequestConfig } from "axios";

const normalizeMember = (member: TeamMember & { _id?: string }) => {
  if (!member.id && member._id) {
    return { ...member, id: member._id };
  }
  return member;
};

export const fetchTeam = async (config?: AxiosRequestConfig): Promise<TeamMember[]> => {
  const response = await makeRequest<{ members: TeamMember[] }>({
    url: API_ROUTES.TEAM.BASE,
    method: "GET",
    config,
  });
  return (response.members ?? []).map(normalizeMember);
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
