// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
}
export default NotFound;
