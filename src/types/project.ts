import { Client } from "./client";

// types/project.ts
export interface Project {
  id: string;
  title: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed" | "Archived";
  type: "Free" | "Paid";
  clientId: Client | string; 
  startDate?: string;
  endDate?: Date;
  deadline?: string;
  createdAt: string;
  updatedAt?: string;
  assignedTo?: string[];
  techStack?: string[];
  team?: string[];
  budget?: number;
  priority?: "Low" | "Medium" | "High";
  feedback?: string;
  isPublic?: boolean;
}
