"use client";

import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook

export default function WasteTable() {
  // Sample waste data (replace with data from your backend)
  const wasteData = [
    { wasteId: 1, type: "Plastic", timeOfPicking: "2023-10-01 10:30 AM", wasteBinId: "BIN-001", wasteBotId: "BOT-001" },
    { wasteId: 2, type: "Paper", timeOfPicking: "2023-10-01 11:15 AM", wasteBinId: "BIN-002", wasteBotId: "BOT-002" },
    { wasteId: 3, type: "Metal", timeOfPicking: "2023-10-01 12:00 PM", wasteBinId: "BIN-003", wasteBotId: "BOT-001" },
    { wasteId: 4, type: "Glass", timeOfPicking: "2023-10-01 01:45 PM", wasteBinId: "BIN-001", wasteBotId: "BOT-003" },
    { wasteId: 5, type: "Plastic", timeOfPicking: "2023-10-02 09:00 AM", wasteBinId: "BIN-002", wasteBotId: "BOT-002" },
    { wasteId: 6, type: "Paper", timeOfPicking: "2023-10-02 10:30 AM", wasteBinId: "BIN-003", wasteBotId: "BOT-001" },
    { wasteId: 7, type: "Metal", timeOfPicking: "2023-10-02 12:00 PM", wasteBinId: "BIN-001", wasteBotId: "BOT-003" },
    { wasteId: 8, type: "Glass", timeOfPicking: "2023-10-02 02:00 PM", wasteBinId: "BIN-002", wasteBotId: "BOT-002" },
    { wasteId: 9, type: "Plastic", timeOfPicking: "2023-10-03 08:00 AM", wasteBinId: "BIN-003", wasteBotId: "BOT-001" },
    { wasteId: 10, type: "Paper", timeOfPicking: "2023-10-03 11:00 AM", wasteBinId: "BIN-001", wasteBotId: "BOT-003" },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Number of rows per page

  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = wasteData.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(wasteData.length / rowsPerPage);

  // Use the theme context
  const { theme } = useTheme();

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <PageMeta
        title="Waste Management Dashboard | EcoSort"
        description="This is the Waste Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Collected Waste" />

      <div className={`rounded-lg shadow-md overflow-hidden ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <div className={`p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <h2 className={`text-xl font-semibold ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}>
            Collected Waste Data
          </h2>
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Overview of waste collected by WasteBots.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${
              theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Waste ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Type
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Time of Picking
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  WasteBin ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  WasteBot ID
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-200"
            }`}>
              {currentRows.map((waste) => (
                <tr
                  key={waste.wasteId}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}>
                    {waste.wasteId}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        waste.type === "Plastic"
                          ? "bg-blue-100 text-blue-800"
                          : waste.type === "Paper"
                          ? "bg-green-100 text-green-800"
                          : waste.type === "Metal"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {waste.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {waste.timeOfPicking}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {waste.wasteBinId}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {waste.wasteBotId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`flex justify-between items-center p-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, wasteData.length)} of{" "}
            {wasteData.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300 bg-gray-700" : "text-gray-700 bg-white"
              } border ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              } rounded-md ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-4 py-2 text-sm font-medium ${
                  currentPage === page
                    ? theme === "dark"
                      ? "text-white bg-blue-600 border border-blue-600"
                      : "text-white bg-blue-500 border border-blue-500"
                    : theme === "dark"
                    ? "text-gray-300 bg-gray-700 border border-gray-600 hover:bg-gray-600"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                } rounded-md`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300 bg-gray-700" : "text-gray-700 bg-white"
              } border ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              } rounded-md ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}