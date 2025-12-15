import type { TeamLeader, Technician } from "./user";

export interface TeamBase {
  id: string;
  name: string;
  leaderId: string;
}

export interface TeamWithDetails extends TeamBase {
  leader: TeamLeader;
  technicians: Technician[];
}

export interface TeamUI {
  id: string;
  name: string;
  category: string;
  leader: TeamLeader;
  technicians: Technician[];
}

export type Team = TeamBase | TeamWithDetails;
