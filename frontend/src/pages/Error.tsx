import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  message?: string;
}

export default function Error({ message }: ErrorProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message ?? "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={handleReload}
          className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 dark:hover:bg-red-500 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
