import type { Client } from "@/types/client";
import type { LogEntry } from "@/types/logs";
import type { Project } from "@/types/project";
import type { Review } from "@/types/reviews";
import type { TeamMember } from "@/types/team";

export const mockProjects: Project[] = [
  {
    id: "p-1001",
    title: "Vortex Landing Refresh",
    description: "Rewrite homepage for a developer-first narrative.",
    status: "In Progress",
    type: "Paid",
    clientId: "c-101",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-14T08:30:00Z",
    priority: "High",
    techStack: ["Next.js", "Tailwind", "TypeScript"],
    deadline: "2025-02-01",
    isPublic: true,
  },
  {
    id: "p-1002",
    title: "Client Portal MVP",
    description: "Guest access, files, and approvals.",
    status: "Pending",
    type: "Paid",
    clientId: "c-102",
    createdAt: "2025-01-05T09:00:00Z",
    priority: "Medium",
    deadline: "2025-02-20",
    isPublic: false,
  },
  {
    id: "p-1003",
    title: "Invoice Template System",
    description: "PDF generation with branded templates.",
    status: "Completed",
    type: "Paid",
    clientId: "c-103",
    createdAt: "2024-12-10T09:00:00Z",
    updatedAt: "2025-01-02T16:00:00Z",
    priority: "Low",
    isPublic: true,
  },
];

export const mockClients: Client[] = [
  {
    _id: "c-101",
    name: "Remy Tran",
    email: "remy@atlas.dev",
    company: "Atlas Labs",
    projects: [mockProjects[0]],
    joinedAt: "2024-11-10T09:00:00Z",
    status: "Active",
    createdBy: "admin",
  },
  {
    _id: "c-102",
    name: "Talia Brooks",
    email: "talia@northwind.io",
    company: "Northwind",
    projects: [mockProjects[1]],
    joinedAt: "2024-12-05T09:00:00Z",
    status: "Pending",
    createdBy: "admin",
  },
  {
    _id: "c-103",
    name: "Kei Sato",
    email: "kei@orbit.studio",
    company: "Orbit Studio",
    projects: [mockProjects[2]],
    joinedAt: "2024-09-14T09:00:00Z",
    status: "Inactive",
    createdBy: "admin",
  },
];

export const mockLogs: LogEntry[] = [
  {
    _id: "l-1",
    action: "Project status updated",
    actor: { id: "u-1", name: "Nia Wells", role: "Owner" },
    target: { type: "Project", name: "Vortex Landing Refresh" },
    details: "Moved to In Progress",
    timestamp: "2025-01-14T12:30:00Z",
    status: "success",
  },
  {
    _id: "l-2",
    action: "Invoice sent",
    actor: { id: "u-2", name: "Arun Patel", role: "Finance" },
    target: { type: "Client", name: "Atlas Labs" },
    details: "Invoice #VX-2031 sent via email",
    timestamp: "2025-01-13T09:15:00Z",
    status: "success",
  },
  {
    _id: "l-3",
    action: "File uploaded",
    actor: { id: "u-3", name: "Remy Tran", role: "Client" },
    target: { type: "Project", name: "Client Portal MVP" },
    details: "Uploaded wireframes.pdf",
    timestamp: "2025-01-12T18:20:00Z",
    status: "success",
  },
];

export const mockReviews: Review[] = [
  {
    id: "r-100",
    clientId: "c-101",
    projectId: { id: "p-1003", name: "Client Portal MVP" },
    rating: 5,
    comment: "Fast turnaround and excellent communication throughout.",
    createdAt: "2025-01-05T09:00:00Z",
    status: "Approved",
    featured: true,
    clientApproved: true,
  },
  {
    id: "r-101",
    clientId: "c-102",
    projectId: { id: "p-1002", name: "Product Launch Video" },
    rating: 4,
    comment: "Strong execution, would love more proactive updates.",
    createdAt: "2025-01-09T11:00:00Z",
    status: "Pending",
    clientApproved: false,
  },
];

export const mockTeam: TeamMember[] = [
  {
    id: "t-1",
    name: "Nia Wells",
    email: "nia@vortex.app",
    role: "Admin",
    status: "Active",
    joinedAt: "2024-05-10T09:00:00Z",
    projects: ["Vortex Landing Refresh", "Client Portal MVP"],
  },
  {
    id: "t-2",
    name: "Arun Patel",
    email: "arun@vortex.app",
    role: "Developer",
    status: "Pending",
    joinedAt: "2024-12-05T09:00:00Z",
    projects: ["Invoice Template System"],
  },
];
