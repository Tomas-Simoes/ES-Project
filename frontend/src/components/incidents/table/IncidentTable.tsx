import type { IncidentDTO } from "../../../types/incident";
import type { Technician } from "../../../types/user";
import type { TeamDTO } from "../../../types/team";
import IncidentRow from "./IncidentRow";

interface PropsWithTechnicians {
  incidents: IncidentDTO[];
  technicians: Technician[];
  fetchIncidentsForTechnicians?: () => Promise<Record<string, Technician[]>>;
  teams?: never;
  onAssignTechnicians?: (incidentId: string, technicianIds: string[]) => void;
  onUnassignTechnicians?: (incidentId: string, technicianId: string) => void;
  onAssignTeams?: never;
}

interface PropsWithTeams {
  incidents: IncidentDTO[];
  technicians?: never;
  fetchIncidentsForTechnicians?: never;
  teams: TeamDTO[];
  onAssignTechnicians?: never;
  onUnassignTechnicians?: never;
  onAssignTeams?: (incidentId: string, teamId: string) => void;
}

type Props = PropsWithTechnicians | PropsWithTeams;

export default function IncidentTable({
  incidents,
  technicians,
  fetchIncidentsForTechnicians,
  teams,
  onAssignTechnicians,
  onUnassignTechnicians,
  onAssignTeams,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {[
              "ID",
              "Title",
              "Assignment",
              "Description",
              "Status",
              "Priority",
              "Created at",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-200 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {incidents.map((incident) => {
            if (technicians) {
              return (
                <IncidentRow
                  key={incident.id}
                  incident={incident}
                  technicians={technicians}
                  fetchIncidentsForTechnicians={fetchIncidentsForTechnicians}
                  onAssignTechnicians={
                    onAssignTechnicians
                      ? (techIds) => onAssignTechnicians(incident.id, techIds)
                      : undefined
                  }
                  onUnassignTechnicians={
                    onUnassignTechnicians
                      ? (techId) => onUnassignTechnicians(incident.id, techId)
                      : undefined
                  }
                />
              );
            } else {
              return (
                <IncidentRow
                  key={incident.id}
                  incident={incident}
                  teams={teams!}
                  onAssignTeams={
                    onAssignTeams
                      ? (teamId) => onAssignTeams(incident.id, teamId)
                      : undefined
                  }
                />
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
