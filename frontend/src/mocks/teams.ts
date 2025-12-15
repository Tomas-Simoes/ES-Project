// src/mocks/teams.ts
import type { TeamDTO } from "../types/team";
import { mockTeamLeaders } from "./users";
import { mockTechnicians } from "./technicans";

export const mockTeams: TeamDTO[] = [
  {
    id: "team-1",
    name: "Infrastructure Team",
    leaderId: "l1",
    leader: mockTeamLeaders[0],
    technicians: [mockTechnicians[0], mockTechnicians[1]],
  },
  {
    id: "team-2",
    name: "Database Operations",
    leaderId: "l2",
    leader: mockTeamLeaders[1],
    technicians: [mockTechnicians[2]],
  },
  {
    id: "team-3",
    name: "Security Team",
    leaderId: "l1",
    leader: mockTeamLeaders[0],
    technicians: [mockTechnicians[3]],
  },
  {
    id: "team-4",
    name: "Service Desk First Line",
    leaderId: "l1",
    leader: mockTeamLeaders[0],
    technicians: [mockTechnicians[0], mockTechnicians[2]],
  },
  {
    id: "team-5",
    name: "Network & Cloud",
    leaderId: "l1",
    leader: mockTeamLeaders[0],
    technicians: [mockTechnicians[1], mockTechnicians[3]],
  },
];
