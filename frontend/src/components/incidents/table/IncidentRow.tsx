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
  fetchIncidentsForTeams?: never;
  teams?: never;
  onAssignTechnicians?: (technicianIds: string[]) => void;
  onUnassignTechnicians?: (technicianId: string) => void;
  onAssignTeams?: never;
}

interface PropsWithTeams {
  incident: IncidentDTO;
  technicians?: never;
  fetchIncidentsForTechnicians?: never;
  fetchIncidentsForTeams?: (teamId: string) => Promise<IncidentDTO[]>;
  teams: TeamDTO[];
  onAssignTechnicians?: never;
  onUnassignTechnicians?: never;
  onAssignTeams?: (teamId: string) => void;
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

  // Carregamento Inicial de Atribuições
  useEffect(() => {
    if (firstLoadRef.current) {
      const loadInitialData = async () => {
        try {
          if (technicians && fetchIncidentsForTechnicians) {
            const techMap = await fetchIncidentsForTechnicians();
            const assignedIds = (techMap[incident.id] || []).map((t) => t.id);
            setSelectedIds(assignedIds);
          } else if (teams) {
            // Se o incidente já possui um time atribuído no objeto principal
            if (incident.teamId) {
              setSelectedIds([incident.teamId]);
            }
          }
        } catch (err) {
          console.error("Error loading initial row data:", err);
        } finally {
          firstLoadRef.current = false;
        }
      };
      loadInitialData();
    }
  }, [incident, technicians, teams, fetchIncidentsForTechnicians]);

  const handleToggleSelection = (id: string) => {
    if (technicians) {
      // Lógica de múltiplos técnicos
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
      // Lógica de time único
      console.log("Handle assign disparado para o time:", id);
      setSelectedIds([id]);
      onAssignTeams?.(id); // Dispara o handleAssign no Manager.tsx
      setIsOpen(false); // Fecha o menu após selecionar
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
                (technicians ? "Assign Technician" : "Assign Team")}
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
                  <div
                    key={item.id}
                    onClick={() => handleToggleSelection(item.id)}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                  >
                    <input
                      type={technicians ? "checkbox" : "radio"}
                      name={`incident-assign-${incident.id}`}
                      checked={selectedIds.includes(item.id)}
                      onChange={() => {}} // Tratado pelo onClick da div
                      className="h-4 w-4 accent-blue-500 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>
                  </div>
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
