import TeamsOverview from "../components/teams/TeamsOverview";
import IncidentTable from "../components/incidents/table/IncidentTable";
import { mockIncidents } from "../mocks/incidents";

export default function ManagerDashboard() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Incident Assignment
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Assign incidents to the most suitable team
        </p>
      </header>

      <TeamsOverview />
      <IncidentTable incidents={mockIncidents} />
    </div>
  );
}
