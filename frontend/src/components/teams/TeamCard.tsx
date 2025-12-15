// src/components/teams/TeamCard.tsx
import { Trash2 } from "lucide-react";
import type { TeamUI } from "../../types/team";

interface Props {
  team: TeamUI;
  onDelete?: (teamId: string) => void;
}

export default function TeamCard({ team, onDelete }: Props) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${team.name}"?`)) {
      onDelete?.(team.id);
    }
  };

  return (
    <div className="w-72 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow relative group">
      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/40"
          aria-label="Delete team"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <div className="mb-3">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          {team.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {team.category}
        </p>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Leader:</span> {team.leader.name}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 whitespace-nowrap">
            {team.technicians.length} tech
            {team.technicians.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
