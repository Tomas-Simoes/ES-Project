import { UserRole } from "../types/user";
import type { Technician, TeamLeader } from "../types/user";

export const mockTechnicians: Technician[] = [
  {
    id: "t1",
    name: "Alice",
    email: "alice@example.com",
    role: UserRole.TECHNICIAN,
    teamId: "team-1",
  },
  {
    id: "t2",
    name: "Bob",
    email: "bob@example.com",
    role: UserRole.TECHNICIAN,
  },
  {
    id: "t3",
    name: "Charlie",
    email: "charlie@example.com",
    role: UserRole.TECHNICIAN,
  },
  {
    id: "t4",
    name: "Diana",
    email: "diana@example.com",
    role: UserRole.TECHNICIAN,
    teamId: "team-2",
  },
];

export const mockTeamLeaders: TeamLeader[] = [
  {
    id: "l1",
    name: "Eve",
    email: "eve@example.com",
    role: UserRole.TEAM_LEADER,
    teamId: "team-1",
  },
  {
    id: "l2",
    name: "Frank",
    email: "frank@example.com",
    role: UserRole.TEAM_LEADER,
    teamId: "team-2",
  },
];
