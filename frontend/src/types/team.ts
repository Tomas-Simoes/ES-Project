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
