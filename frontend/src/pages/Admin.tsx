import { useState } from "react";
import { Shield, AlertCircle, UsersRound } from "lucide-react";
import { FormCard } from "../components/form/FormCard";
import type {
  CreateTeamForm,
  CreateIncidentForm,
  CreateTeamLeaderForm,
} from "../types/create";
import { IncidentForm } from "../components/admin/IncidentForm";
import { TeamLeaderForm } from "../components/admin/TeamLeaderForm";
import { TeamForm } from "../components/admin/TeamForm";
import { useCreate } from "../hooks/create/useCreate";
import { useTechnicians } from "../hooks/technicians/useTechnicians";
import { useTeams } from "../hooks/teams/useTeams";
import { useUsers } from "../hooks/users/useUsers";

const ActionCard = ({
  icon: Icon,
  title,
  description,
  color,
  isActive,
  onClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  description: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <FormCard
    className={`cursor-pointer hover:border-${color}-500/50 transition-all group ${
      isActive ? `border-${color}-500 bg-${color}-500/10` : ""
    }`}
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center space-y-3 py-4">
      <Icon
        className={`w-12 h-12 text-${color}-400 group-hover:scale-110 transition-transform`}
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  </FormCard>
);

export default function AdminManagement() {
  const [activeForm, setActiveForm] = useState<
    "incident" | "technician" | "leader" | "team" | null
  >(null);

  const { team, teamLeader, incident } = useCreate();
  const { technicians } = useTechnicians();
  const { teams } = useTeams();
  const { users } = useUsers();

  const handleCreateIncident = async (data: CreateIncidentForm) => {
    console.log("Creating incident:", data);
    const success = await incident.createIncident(data);
    if (success) alert("Incident created successfully!" + success);
  };

  const handleCreateTeamLeader = async (data: CreateTeamLeaderForm) => {
    console.log("Creating team leader:", data);
    const success = await teamLeader.createTeamLeader(
      data.teamId,
      data.technicianId
    );
    if (success) alert("Incident created successfully!" + success);
  };

  const handleCreateTeam = async (data: CreateTeamForm) => {
    console.log("Creating team:", data);
    const success = await team.createTeam(data);
    if (success) alert("Incident created successfully!" + success);
  };

  return (
    <div className="text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Admin Management
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Create and manage incidents, technicians, team leaders, and teams
          </p>
        </div>

        {/* Action Cards - Always visible */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard
              icon={AlertCircle}
              title="Create Incident"
              description="Add a new incident to the system"
              color="red"
              isActive={activeForm === "incident"}
              onClick={() =>
                setActiveForm(activeForm === "incident" ? null : "incident")
              }
            />

            <ActionCard
              icon={Shield}
              title="Create Team Leader"
              description="Add a new team leader"
              color="green"
              isActive={activeForm === "leader"}
              onClick={() =>
                setActiveForm(activeForm === "leader" ? null : "leader")
              }
            />

            <ActionCard
              icon={UsersRound}
              title="Create Team"
              description="Add a new team to the organization"
              color="purple"
              isActive={activeForm === "team"}
              onClick={() =>
                setActiveForm(activeForm === "team" ? null : "team")
              }
            />
          </div>
        </div>

        {activeForm && (
          <FormCard className="max-w-2xl mx-auto">
            {activeForm === "incident" && (
              <IncidentForm
                onSubmit={handleCreateIncident}
                onCancel={() => setActiveForm(null)}
              />
            )}
            {activeForm === "leader" && (
              <TeamLeaderForm
                onSubmit={handleCreateTeamLeader}
                onCancel={() => setActiveForm(null)}
                users={users}
                teams={teams}
              />
            )}
            {activeForm === "team" && (
              <TeamForm
                onSubmit={handleCreateTeam}
                onCancel={() => setActiveForm(null)}
                technicians={technicians}
              />
            )}
          </FormCard>
        )}
      </div>
    </div>
  );
}
