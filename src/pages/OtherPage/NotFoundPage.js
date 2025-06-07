import React from "react";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <PageMeta
        title="404 Not Found | EcoSort"
        description="Page not found - EcoSort Waste Management Dashboard"
      />

      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl font-medium mb-2">Oops! Page not found.</p>
        <p className="mb-6 text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate(-1)}
          className={`inline-block px-6 py-3 rounded-md font-semibold transition-colors duration-200 shadow ${
            theme === "dark"
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Go back to previous page
        </button>
      </div>
    </div>
  );
}
