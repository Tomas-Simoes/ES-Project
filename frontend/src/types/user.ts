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

export interface Technician extends User {
  role: typeof UserRole.TECHNICIAN;
}

export interface TeamLeader extends User {
  role: typeof UserRole.TEAM_LEADER;
}
