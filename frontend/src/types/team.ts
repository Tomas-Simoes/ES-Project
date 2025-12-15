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

export interface TeamWithDetails extends TeamBase {
  leader: User;
  technicians: User[];
}
