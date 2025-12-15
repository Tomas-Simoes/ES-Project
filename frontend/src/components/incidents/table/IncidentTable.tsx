import type { IncidentDTO } from "../../../types/incident";
import IncidentRow from "./IncidentRow";

interface Props {
  incidents: IncidentDTO[];
}

export default function IncidentTable({ incidents }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {[
              "ID",
              "Title",
              "Owner",
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
          {incidents.map((incident) => (
            <IncidentRow key={incident.id} incident={incident} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
