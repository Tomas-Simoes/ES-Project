import { useState } from "react";
import type { Incident } from "../../../types/incident";
import type { Technician } from "../../../types/technician";
import { Badge } from "../util/IncidentBadges";
import { StatusIndicator } from "../util/StatusIndicator";
import { useAuth } from "../../../context/AuthContext";
import { RoleRender } from "../../RoleRender";

interface Props {
  incident: Incident;
}

export default function IncidentRow({ incident }: Props) {
  const { role } = useAuth();
  const [owner, setOwner] = useState<Technician | null>(incident.owner || null);

  const priorityColor =
    incident.priority === "High"
      ? "red"
      : incident.priority === "Medium"
      ? "yellow"
      : "green";

  // Mock technicians data
  const technicians: Technician[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 4, name: "Diana", email: "diana@example.com" },
  ];

  return (
    <tr className="group transition hover:bg-gray-50 dark:hover:bg-gray-700/40">
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
        #{incident.id}
      </td>

      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
        {incident.title}
      </td>

      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {["admin", "manager"].includes(role) ? (
          <select
            value={owner?.id ?? ""}
            onChange={(e) => {
              const selected =
                technicians.find(
                  (tech) => tech.id === Number(e.target.value)
                ) || null;
              setOwner(selected);
            }}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-300"
          >
            <option value="">Unassigned</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name}
              </option>
            ))}
          </select>
        ) : (
          <span>{owner ? owner.name : "Unassigned"}</span>
        )}
      </td>

      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {incident.description}
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
