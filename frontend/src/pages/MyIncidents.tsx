import { useState } from "react";
import MyIncidentStats from "../components/myIncidents/MyIncidentStats";
import IncidentList from "../components/myIncidents/IncidentList";
import UrgentPanel from "../components/myIncidents/UrgentPanel";
import WeeklySummary from "../components/myIncidents/WeeklySummary";
import PriorityBreakdown from "../components/myIncidents/PriorityBreakdown";
import { mockMyIncidents } from "../mocks/my-incidents";

export default function MyIncidents() {
  const [filter, setFilter] = useState<
    "all" | "open" | "in-progress" | "resolved"
  >("all");

  const myIncidents = mockMyIncidents;

  const filteredIncidents = myIncidents.filter((inc) => {
    if (filter === "all") return true;
    if (filter === "open") return inc.status === "Open";
    if (filter === "in-progress") return inc.status === "In Progress";
    if (filter === "resolved") return inc.status === "Resolved";
    return true;
  });

  const stats = {
    total: myIncidents.length,
    open: myIncidents.filter((i) => i.status === "Open").length,
    inProgress: myIncidents.filter((i) => i.status === "In Progress").length,
    resolved: myIncidents.filter((i) => i.status === "Resolved").length,
  };

  const urgentIncidents = myIncidents
    .filter((i) => i.priority === "High" && i.status !== "Resolved")
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Incidents
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage and track your assigned incidents
        </p>
      </div>

      <MyIncidentStats
        open={stats.open}
        inProgress={stats.inProgress}
        resolved={stats.resolved}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncidentList
            incidents={filteredIncidents}
            filter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />
        </div>

        <div className="space-y-4">
          <UrgentPanel incidents={urgentIncidents} />
          <WeeklySummary />
          <PriorityBreakdown incidents={myIncidents} />
        </div>
      </div>
    </div>
  );
}
