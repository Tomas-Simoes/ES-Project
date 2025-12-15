// src/components/teams/TeamForm.tsx
import { useState } from "react";
import type { Technician, TeamLeader } from "../../types/user";

interface Props {
  technicians: Technician[];
  leaders: TeamLeader[];
  onCreate: (team: {
    name: string;
    category: string;
    leaderId: string;
    technicianIds: string[];
  }) => void;
  onClose: () => void;
}

export default function TeamForm({
  technicians,
  leaders,
  onCreate,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const toggleTech = (id: string) => {
    setSelectedTechs((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!name || !leaderId) {
      alert("Please fill in all required fields");
      return;
    }

    onCreate({
      name,
      category,
      leaderId,
      technicianIds: selectedTechs,
    });
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Create Team
      </h2>

      {/* Team name */}
      <input
        type="text"
        placeholder="Team name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />

      {/* Category */}
      <input
        type="text"
        placeholder="Category (e.g. Security, Infra)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />

      {/* Leader */}
      <select
        value={leaderId}
        onChange={(e) => setLeaderId(e.target.value)}
        className="w-full mb-3 px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        <option value="">Select team leader</option>
        {leaders.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>

      {/* Technicians */}
      <div className="mb-3 max-h-48 overflow-y-auto space-y-1">
        {technicians.map((tech) => (
          <label
            key={tech.id}
            className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {tech.name}
              {tech.teamId && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600">
                  In team
                </span>
              )}
            </span>
            <input
              type="checkbox"
              disabled={!!tech.teamId}
              checked={selectedTechs.includes(tech.id)}
              onChange={() => toggleTech(tech.id)}
              className="cursor-pointer disabled:cursor-not-allowed"
            />
          </label>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between gap-2">
        <button
          onClick={handleCreate}
          className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
        >
          Create
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-full transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
