import React from "react";

type LoadingProps = {
  small?: boolean;
};

export default function Loading({ small = false }: LoadingProps) {
  if (small) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
        <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
