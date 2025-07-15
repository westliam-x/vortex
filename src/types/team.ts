export type TeamRole = "Admin" | "Developer" | "Project Manager" | "Client";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: TeamRole;
  projects: string[];
  status: "Active" | "Suspended" | "Pending";
  joinedAt: string;
}
