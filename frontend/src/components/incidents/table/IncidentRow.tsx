import type { IncidentDTO } from "../../../types/incident";
import type { Technician } from "../../../types/user";
import type { TeamDTO } from "../../../types/team";
import { Badge } from "../util/IncidentBadges";
import { StatusIndicator } from "../util/StatusIndicator";
import { useState, useRef, useEffect } from "react";

interface PropsWithTechnicians {
  incident: IncidentDTO;
  technicians: Technician[];
  fetchIncidentsForTechnicians?: () => Promise<Record<string, Technician[]>>;
  teams?: never;
  onAssignTechnicians?: (technicianIds: string[]) => void;
  onUnassignTechnicians?: (technicianId: string) => void;
  onAssignTeams?: never;
}

interface PropsWithTeams {
  incident: IncidentDTO;
  technicians?: never;
  fetchIncidentsForTechnicians?: never;
  teams: TeamDTO[];
  onAssignTechnicians?: never;
  onUnassignTechnicians?: never;
  onAssignTeams?: (teamId: string) => void; // single selection
}

type Props = PropsWithTechnicians | PropsWithTeams;

export default function IncidentRow({
  incident,
  technicians,
  fetchIncidentsForTechnicians,
  teams,
  onAssignTechnicians,
  onUnassignTechnicians,
  onAssignTeams,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstLoadRef = useRef(true);

  const priorityColor =
    incident.priority === "High"
      ? "red"
      : incident.priority === "Medium"
      ? "yellow"
      : "green";

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch dos técnicos atribuídos na primeira vez que abre
  useEffect(() => {
    if (
      isOpen &&
      technicians &&
      fetchIncidentsForTechnicians &&
      firstLoadRef.current
    ) {
      const loadAssigned = async () => {
        try {
          const techMap = await fetchIncidentsForTechnicians();
          const assignedTechs = techMap[incident.id] || [];
          const assignedIds = assignedTechs.map((t) => t.id);
          setSelectedIds(assignedIds);
        } catch (err) {
          console.error(
            `Failed to fetch technicians for incident ${incident.id}`,
            err
          );
          setSelectedIds([]);
        } finally {
          firstLoadRef.current = false;
        }
      };
      loadAssigned();
    }
  }, [isOpen, technicians, fetchIncidentsForTechnicians, incident.id]);

  const handleToggleSelection = (id: string) => {
    if (technicians) {
      let newSelection: string[];
      if (selectedIds.includes(id)) {
        newSelection = selectedIds.filter((i) => i !== id);
        onUnassignTechnicians?.(id);
      } else {
        newSelection = [...selectedIds, id];
        onAssignTechnicians?.(newSelection);
      }
      setSelectedIds(newSelection);
    } else if (teams) {
      // single-select para team
      setSelectedIds([id]);
      onAssignTeams?.(id);
      setIsOpen(false);
    }
  };

  const items = technicians || teams || [];
  const selectedNames = items
    .filter((item) => selectedIds.includes(item.id))
    .map((item) => item.name)
    .join(", ");

  return (
    <tr className="group transition hover:bg-gray-50 dark:hover:bg-gray-700/40">
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
        #{incident.id}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
        {incident.title}
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full min-w-[200px] px-3 py-2 text-left text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <span className="block truncate text-gray-700 dark:text-gray-300">
              {selectedNames ||
                `Select ${technicians ? "technicians" : "team"}...`}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {isOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
              {items.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No {technicians ? "technicians" : "teams"} available
                </div>
              ) : (
                items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleToggleSelection(item.id)}
                      className="h-4 w-4 accent-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      disabled={!!teams} // single-select para teams
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>
                  </label>
                ))
              )}
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
        {incident.description}
      </td>
      <td className="px-4 py-3">
        <StatusIndicator status={incident.status} />
      </td>
      <td className="px-4 py-3">
        <Badge label={incident.priority} color={priorityColor} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
        {new Date(incident.createdAt).toLocaleString()}
      </td>
    </tr>
  );
}
