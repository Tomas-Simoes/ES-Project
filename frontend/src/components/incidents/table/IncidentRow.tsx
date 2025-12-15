import { useState } from "react";
import type { Incident } from "../../../types/incident";
import { Badge } from "../util/IncidentBadges";
import { StatusIndicator } from "../util/StatusIndicator";

interface Team {
  id: number;
  name: string;
}

interface Props {
  incident: Incident;
}

const teams: Team[] = [
  { id: 1, name: "Infrastructure Team" },
  { id: 2, name: "Software Team" },
  { id: 3, name: "Security Team" },
];

export default function IncidentRow({ incident }: Props) {
  const [team, setTeam] = useState<Team | null>(null);

  const priorityColor =
    incident.priority === "High"
      ? "red"
      : incident.priority === "Medium"
      ? "yellow"
      : "green";

  return (
    <tr className="group transition hover:bg-gray-50 dark:hover:bg-gray-700/40">
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
        #{incident.id}
      </td>

      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
        {incident.title}
      </td>

      <td className="px-4 py-3 text-sm">
        <select
          value={team?.id ?? ""}
          onChange={(e) => {
            const selected =
              teams.find((t) => t.id === Number(e.target.value)) || null;
            setTeam(selected);
          }}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-sm text-gray-700 dark:text-gray-300"
        >
          <option value="">Unassigned</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </td>

      <td className="px-4 py-3">
        <StatusIndicator status={incident.status} />
      </td>

      <td className="px-4 py-3">
        <Badge label={incident.priority} color={priorityColor} />
      </td>

      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
        {incident.created_at.toLocaleString()}
      </td>
    </tr>
  );
}
