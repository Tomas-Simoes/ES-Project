import type { TeamWithDetails } from "./team";

/**
 * User table
 * -------------------------------
 * id (PK)
 * name
 * email
 * role (enum: viewer, technician, team_leader, manager, admin)
 * teamId (FK to Team table, nullable -  a user can have no team)
 */

export const UserRole = {
  VIEWER: "viewer",
  TECHNICIAN: "technician",
  TEAM_LEADER: "team_leader",
  MANAGER: "manager",
  ADMIN: "admin",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  teamId?: string;
}

export interface UserWithTeam extends User {
  team: TeamWithDetails;
}

export interface Technician extends User {
  role: typeof UserRole.TECHNICIAN;
}

export interface TechnicianWithMetrics extends Technician {
  status: "available" | "busy" | "overloaded";
  totalIncidents: number;
  openIncidents: number;
  inProgressIncidents: number;
  resolvedToday: number;
  avgResolutionTime: string;
  workloadPercentage: number;
  lastActivity: string;
  highPriorityCount: number;
}

export interface TeamLeader extends User {
  role: typeof UserRole.TEAM_LEADER;
}
