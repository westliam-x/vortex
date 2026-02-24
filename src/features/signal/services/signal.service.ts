import {
  DEFAULT_SIGNAL_PROFILE,
  type SignalCollabRequest,
  type SignalProfile,
  type SignalProjectInvite,
} from "../types";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";

const SIGNAL_ACTIVE_KEY = "vortex:signal:active";
const SIGNAL_PROFILE_KEY = "vortex:signal:profile";
const collabKey = (projectId: string) => `vortex:signal:collab:${projectId}`;
const inviteKey = (projectId: string) => `vortex:signal:invites:${projectId}`;

const safeWindow = () => typeof window !== "undefined";

export const readSignalActive = (): boolean => {
  if (!safeWindow()) return false;
  return window.localStorage.getItem(SIGNAL_ACTIVE_KEY) === "true";
};

export const writeSignalActive = (active: boolean) => {
  if (!safeWindow()) return;
  window.localStorage.setItem(SIGNAL_ACTIVE_KEY, String(active));
};

export const readSignalProfile = (): SignalProfile => {
  if (!safeWindow()) return DEFAULT_SIGNAL_PROFILE;
  const raw = window.localStorage.getItem(SIGNAL_PROFILE_KEY);
  if (!raw) return DEFAULT_SIGNAL_PROFILE;
  try {
    const parsed = JSON.parse(raw) as Partial<SignalProfile>;
    return {
      ...DEFAULT_SIGNAL_PROFILE,
      ...parsed,
      roles: Array.isArray(parsed.roles) ? parsed.roles : DEFAULT_SIGNAL_PROFILE.roles,
      stackTags: Array.isArray(parsed.stackTags) ? parsed.stackTags : DEFAULT_SIGNAL_PROFILE.stackTags,
    };
  } catch {
    return DEFAULT_SIGNAL_PROFILE;
  }
};

export const writeSignalProfile = (profile: SignalProfile) => {
  if (!safeWindow()) return;
  window.localStorage.setItem(SIGNAL_PROFILE_KEY, JSON.stringify(profile));
};

export const signalStorageKeys = {
  active: SIGNAL_ACTIVE_KEY,
  profile: SIGNAL_PROFILE_KEY,
} as const;

export const readCollabRequest = (projectId: string): SignalCollabRequest | null => {
  if (!safeWindow() || !projectId) return null;
  const raw = window.localStorage.getItem(collabKey(projectId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SignalCollabRequest;
  } catch {
    return null;
  }
};

export const writeCollabRequest = (projectId: string, request: SignalCollabRequest) => {
  if (!safeWindow() || !projectId) return;
  window.localStorage.setItem(collabKey(projectId), JSON.stringify(request));
};

export const readProjectInvites = (projectId: string): SignalProjectInvite[] => {
  if (!safeWindow() || !projectId) return [];
  const raw = window.localStorage.getItem(inviteKey(projectId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as SignalProjectInvite[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeProjectInvites = (projectId: string, invites: SignalProjectInvite[]) => {
  if (!safeWindow() || !projectId) return;
  window.localStorage.setItem(inviteKey(projectId), JSON.stringify(invites));
};

export const appendProjectInvite = (projectId: string, invite: SignalProjectInvite) => {
  const current = readProjectInvites(projectId);
  writeProjectInvites(projectId, [invite, ...current]);
};

type SignalCollabResponse = {
  request: {
    roleNeeded: string;
    requiredStack: string[];
    budgetMin?: number;
    budgetMax?: number;
    notes?: string;
    status: "OPEN" | "CLOSED";
    createdAt: string;
  } | null;
};

const normalizeCollabRequest = (projectId: string, input: NonNullable<SignalCollabResponse["request"]>): SignalCollabRequest => ({
  projectId,
  roleNeeded: input.roleNeeded as SignalCollabRequest["roleNeeded"],
  requiredStack: input.requiredStack ?? [],
  budgetMin: typeof input.budgetMin === "number" ? input.budgetMin : null,
  budgetMax: typeof input.budgetMax === "number" ? input.budgetMax : null,
  notes: input.notes ?? "",
  status: input.status === "OPEN" ? "Open" : "Closed",
  createdAt: input.createdAt,
});

export const fetchProjectCollabRequest = async (projectId: string): Promise<SignalCollabRequest | null> => {
  const response = await makeRequest<SignalCollabResponse>({
    url: `${API_ROUTES.SIGNAL.PROJECTS}/${projectId}/request`,
    method: "GET",
  });
  if (!response.request) return null;
  return normalizeCollabRequest(projectId, response.request);
};

export const upsertProjectCollabRequest = async (
  projectId: string,
  payload: Pick<SignalCollabRequest, "roleNeeded" | "requiredStack" | "budgetMin" | "budgetMax" | "notes">
): Promise<SignalCollabRequest> => {
  const response = await makeRequest<SignalCollabResponse>({
    url: `${API_ROUTES.SIGNAL.PROJECTS}/${projectId}/request`,
    method: "POST",
    data: {
      roleNeeded: payload.roleNeeded,
      requiredStack: payload.requiredStack,
      budgetMin: payload.budgetMin ?? undefined,
      budgetMax: payload.budgetMax ?? undefined,
      notes: payload.notes ?? undefined,
    },
  });
  if (!response.request) {
    throw new Error("Failed to save collaboration request");
  }
  return normalizeCollabRequest(projectId, response.request);
};

export const closeProjectCollabRequest = async (projectId: string): Promise<SignalCollabRequest> => {
  const response = await makeRequest<SignalCollabResponse>({
    url: `${API_ROUTES.SIGNAL.PROJECTS}/${projectId}/request/close`,
    method: "PATCH",
  });
  if (!response.request) {
    throw new Error("No active collaboration request");
  }
  return normalizeCollabRequest(projectId, response.request);
};
