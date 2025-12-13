interface StatusIndicatorProps {
  status: "Open" | "In Progress" | "Resolved";
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const base = "inline-flex items-center gap-2 text-sm font-medium";

  if (status === "Resolved") {
    return (
      <span className={`${base} text-green-600 dark:text-green-400`}>
        <span className="h-2 w-2 rounded-full bg-green-500" />
        Resolved
      </span>
    );
  }

  if (status === "In Progress") {
    return (
      <span className={`${base} text-blue-600 dark:text-blue-400`}>
        <span className="h-3 w-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        In Progress
      </span>
    );
  }

  return (
    <span className={`${base} text-gray-600 dark:text-gray-300`}>
      <span className="h-2 w-2 rounded-full bg-gray-400" />
      Open
    </span>
  );
}
