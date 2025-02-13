"use client";

import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook
import { FaTrash, FaPlus } from "react-icons/fa"; // Import icons

export default function WasteBotTable() {
  // Sample WasteBot data (replace with data from your backend)
  const wasteBotData = [
    {
      wasteBotId: 1,
      status: "Active",
      location: "Zone A",
      userId: "USER-001",
    },
    {
      wasteBotId: 2,
      status: "Inactive",
      location: "Zone B",
      userId: "USER-002",
    },
    {
      wasteBotId: 3,
      status: "Maintenance",
      location: "Zone C",
      userId: "USER-003",
    },
    {
      wasteBotId: 4,
      status: "Active",
      location: "Zone D",
      userId: "USER-004",
    },
    {
      wasteBotId: 5,
      status: "Active",
      location: "Zone E",
      userId: "USER-005",
    },
    {
      wasteBotId: 6,
      status: "Inactive",
      location: "Zone F",
      userId: "USER-006",
    },
    {
      wasteBotId: 7,
      status: "Active",
      location: "Zone G",
      userId: "USER-007",
    },
    {
      wasteBotId: 8,
      status: "Maintenance",
      location: "Zone H",
      userId: "USER-008",
    },
    {
      wasteBotId: 9,
      status: "Inactive",
      location: "Zone I",
      userId: "USER-009",
    },
    {
      wasteBotId: 10,
      status: "Active",
      location: "Zone J",
      userId: "USER-010",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Number of rows per page

  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = wasteBotData.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(wasteBotData.length / rowsPerPage);

  // Use the theme context
  const { theme } = useTheme();

  // Handle delete action (to be linked to an HTTP DELETE request later)
  const handleDelete = (wasteBotId: number) => {
    console.log(`Delete WasteBot with ID: ${wasteBotId}`);
    // Add your DELETE request logic here
  };

  // Handle add WasteBot action (to be linked to a form or modal later)
  const handleAddWasteBot = () => {
    console.log("Add a new WasteBot");
    // Add your logic to open a form or modal for adding a WasteBot
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <PageMeta
        title="WasteBot Management Dashboard | EcoSort"
        description="This is the WasteBot Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="WasteBot Management" />

      <div className={`rounded-lg shadow-md overflow-hidden ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Header with Add Button */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div>
            <h2 className={`text-xl font-semibold ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              WasteBot Data
            </h2>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Overview of WasteBot status and assignments.
            </p>
          </div>
          <div>
            <button
              onClick={handleAddWasteBot}
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
              }`}
            >
              <FaPlus className="text-green-500" /> {/* Plus Icon */}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${
              theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  WasteBot ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  User ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-200"
            }`}>
              {currentRows.map((bot) => (
                <tr
                  key={bot.wasteBotId}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}>
                    {bot.wasteBotId}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        bot.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : bot.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {bot.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {bot.location}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {bot.userId}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <button
                      onClick={() => handleDelete(bot.wasteBotId)}
                      className={`p-2 rounded-full ${
                        theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                      }`}
                    >
                      <FaTrash className="text-red-500" /> {/* Delete Icon */}
                    </button>
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
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, wasteBotData.length)} of{" "}
            {wasteBotData.length} entries
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