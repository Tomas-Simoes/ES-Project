import { UserRole } from "./user";
import type { User } from "./user";
import type { IncidentBase } from "./incident";

export interface TechnicianBase extends User {
  role: typeof UserRole.TECHNICIAN;
}

export interface TechnicianWithIncidents extends TechnicianBase {
  incidents: IncidentBase[];
}

export type Technician = TechnicianBase | TechnicianWithIncidents;
