import type { TeamBase } from "./team";
import type { User } from "./user";

/**
 * Incident table
 * -------------------------------
 * id (PK)
 * title
 * decription
 * status
 * priority
 * createdAt
 * ownerId (FK to User table, nullable)
 * teamId (FK to Team table, nullable)
 *
 *
 * Incident_Technician_Assignment table
 * -------------------------------
 * incidentId (FK to Incident table)
 * technicianId (FK to User table)
 * role (enum: primary, secondary)
 */

export const IncidentStatus = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
} as const;

export type IncidentStatus =
  (typeof IncidentStatus)[keyof typeof IncidentStatus];

export const IncidentPriority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export type IncidentPriority =
  (typeof IncidentPriority)[keyof typeof IncidentPriority];

export type IncidentDTO = IncidentBase & {
  owner?: User;
  team?: TeamBase;
};

export interface IncidentBase {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  createdAt: string;

  ownerId?: string;
  teamId?: string;
}

export interface IncidentTechnicianAssignment {
  incidentId: string;
  technicianId: string;

  role?: "primary" | "secondary";
}
