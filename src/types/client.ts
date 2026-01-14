import { Project } from "./project";

export interface Client {
  id?: string;
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projects: Project[];
  joinedAt: string;
  avatarUrl?: string;
  notes?: string;
  status: "Active" | "Inactive" | "Pending";
  lastActivity?: string;
  createdBy: string;
  assignedTo?: string[];
}
