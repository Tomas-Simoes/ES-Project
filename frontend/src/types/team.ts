import type { User } from "./user";

/**
 * Team table
 * -------------------------------
 * id (PK)
 * name
 * leaderId (FK to User table)
 */

export interface TeamBase {
  id: string;
  name: string;
  leaderId: string;
}

export type TeamDTO = TeamBase & {
  leader: User;
  technicians: User[];
};

export interface TeamWithMetrics {
  team: TeamBase;
  totals: {
    totalTechs: number;
    availableTechs: number;
    busyTechs: number;
    totalIncidents: number;
    openIncidents: number;
    inProgressIncidents: number;
    resolvedToday: number;
    highPriorityCount: number;
    avgResolutionTime: string;
    workloadAvgPercentage: number;
  };
}
