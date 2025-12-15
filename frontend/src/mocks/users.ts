import { UserRole } from "../types/user";
import type { TeamLeader } from "../types/user";

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
