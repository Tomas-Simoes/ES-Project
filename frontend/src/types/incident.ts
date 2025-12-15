import type { Technician } from "./user";
import type { TeamBase } from "./team";

export type IncidentStatus = "Open" | "In Progress" | "Resolved";
export type IncidentPriority = "Low" | "Medium" | "High";

export interface IncidentBase {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  created_at: Date;
  // Foreign Keys
  ownerId?: string;
  teamId?: string;
}

export interface IncidentWithDetails extends IncidentBase {
  owner?: Technician;
  team?: TeamBase;
}

export type Incident = IncidentBase | IncidentWithDetails;
