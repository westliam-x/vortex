export type SignalRole = "Backend" | "Frontend" | "UI/UX" | "DevOps" | "PM";
export type CollabRequestStatus = "Open" | "Closed";

export type SignalProfile = {
  headline: string;
  roles: SignalRole[];
  stackTags: string[];
  hourlyMin: number | null;
  hourlyMax: number | null;
  timezone: string;
  bio: string;
  updatedAt: string | null;
};

export const SIGNAL_ROLE_OPTIONS: SignalRole[] = ["Backend", "Frontend", "UI/UX", "DevOps", "PM"];

export const DEFAULT_SIGNAL_PROFILE: SignalProfile = {
  headline: "",
  roles: [],
  stackTags: [],
  hourlyMin: null,
  hourlyMax: null,
  timezone: "UTC",
  bio: "",
  updatedAt: null,
};

export type SignalCollabRequest = {
  projectId: string;
  roleNeeded: SignalRole;
  requiredStack: string[];
  budgetMin: number | null;
  budgetMax: number | null;
  notes: string;
  status: CollabRequestStatus;
  createdAt: string;
};

export type SignalProjectInvite = {
  id: string;
  projectId: string;
  candidateName: string;
  role: SignalRole;
  message?: string;
  status: "Pending" | "Accepted" | "Declined";
  sentAt: string;
};
