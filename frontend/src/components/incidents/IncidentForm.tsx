import { useState } from "react";
import type { Technician } from "../../types/technician";
import type { Incident } from "../../types/incident";

interface Props {
  technicians: Technician[];
  onCreate: (incident: Omit<Incident, "id" | "created_at">) => void;
  onClose: () => void;
}

export default function IncidentForm({
  technicians,
  onCreate,
  onClose,
}: Props) {
  const [newIncident, setNewIncident] = useState({
    title: "",
    owner: technicians[0],
    description: "",
    status: "Open" as Incident["status"],
    priority: "Low" as Incident["priority"],
  });

  const handleCreateIncident = async () => {
    onCreate(newIncident);
    setNewIncident({
      title: "",
      owner: technicians[0],
      description: "",
      status: "Open",
      priority: "Low",
    });
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
        Create Incident
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={newIncident.title}
        onChange={(e) =>
          setNewIncident({ ...newIncident, title: e.target.value })
        }
        className="w-full mb-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
      />

      <select
        value={newIncident.owner.id}
        onChange={(e) =>
          setNewIncident({
            ...newIncident,
            owner: technicians.find(
              (tech) => tech.id === Number(e.target.value)
            )!,
          })
        }
        className="w-full mb-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
      >
        {technicians.map((tech) => (
          <option key={tech.id} value={tech.id}>
            {tech.name}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Description"
        value={newIncident.description}
        onChange={(e) =>
          setNewIncident({ ...newIncident, description: e.target.value })
        }
        className="w-full mb-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
      />

      <select
        value={newIncident.status}
        onChange={(e) =>
          setNewIncident({
            ...newIncident,
            status: e.target.value as Incident["status"],
          })
        }
        className="w-full mb-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <select
        value={newIncident.priority}
        onChange={(e) =>
          setNewIncident({
            ...newIncident,
            priority: e.target.value as Incident["priority"],
          })
        }
        className="w-full mb-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <div className="flex justify-between mt-2">
        <button
          onClick={handleCreateIncident}
          className="w-1/2 py-2 mr-1 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
        >
          Create
        </button>
        <button
          onClick={onClose}
          className="w-1/2 py-2 ml-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-full transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
