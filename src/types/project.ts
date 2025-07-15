export interface Project {
  id: string;
  title: string;
  status: "Pending" | "In Progress" | "Completed";
}