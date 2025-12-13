import type { Technician } from "./technician";

export type IncidentStatus = "Open" | "In Progress" | "Resolved";
export type IncidentPriority = "Low" | "Medium" | "High";

export interface Incident {
  id: number;
  title: string;
  owner: Technician;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  created_at: Date;
}
