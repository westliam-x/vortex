import {
  DEFAULT_SIGNAL_PROFILE,
  type SignalCollabRequest,
  type SignalProfile,
  type SignalProjectInvite,
} from "../types";

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
