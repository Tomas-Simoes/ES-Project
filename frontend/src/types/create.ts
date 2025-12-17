export interface CreateIncidentForm {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  teamId?: string;
  ownerId?: string;
}

export interface CreateTechnicianForm {
  name: string;
  email: string;
  password: string;
  teamId?: string;
}

export interface CreateTeamLeaderForm {
  technicianId: string;
  teamId: string;
}

export interface CreateTeamForm {
  name: string;
  description: string;
  leaderId?: string;
}
