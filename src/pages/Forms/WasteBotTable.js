"use client";

import config from '../../config';
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook
import { FaTrash, FaPlus, FaPowerOff } from "react-icons/fa"; // Import icons

export default function WasteBotTable() {
  const [wasteBotData, setWasteBotData] = useState([]); // State to store WasteBot data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    model: "",
    status: "Inactive",
    location: "",
    autonomy: null, 
  });
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Number of rows per page


  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Use the theme context
  const { theme } = useTheme();

  // Fetch WasteBot data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.serverIp}/wastebots/`);
        setWasteBotData(response.data); // Set the fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount


   // Filter WasteBots based on search query
   const filteredWasteBots = wasteBotData.filter((wastebot) =>
    wastebot.location.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredWasteBots.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(wasteBotData.length / rowsPerPage);

  // Handle delete action
  const handleDelete = async (wasteBotId) => {
    try {
      await axios.delete(`${config.serverIp}/wastebots/${wasteBotId}/`);
      // Remove the deleted WasteBot from the state
      setWasteBotData(wasteBotData.filter((bot) => bot.id !== wasteBotId));
    } catch (error) {
      console.error("Error deleting WasteBot:", error);
    }
  };

  // Handle toggle WasteBot status (On/Off)
  const handleToggleStatus = async (wasteBotId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      const response = await axios.patch(`${config.serverIp}/wastebots/${wasteBotId}/`, {
        status: newStatus,
      });

      // Update the WasteBot status in the state
      setWasteBotData((prevData) =>
        prevData.map((bot) =>
          bot.id === wasteBotId ? { ...bot, status: newStatus } : bot
        )
      );
    } catch (error) {
      console.error("Error toggling WasteBot status:", error);
    }
  };

  // Handle add WasteBot action (open modal)
  const handleAddWasteBot = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to add a new WasteBot
      const response = await axios.post(`${config.serverIp}/wastebots/`, formData);

      // Add the new WasteBot to the state
      setWasteBotData([...wasteBotData, response.data]);

      // Close the modal
      setIsModalOpen(false);

      // Reset the form data
      setFormData({
        status: "",
        location: "",
      });
    } catch (error) {
      console.error("Error adding WasteBot:", error);
    }
  };

  // Display loading state
  if (loading) {
    return (
      <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
        <PageMeta
          title="WasteBot Management Dashboard | EcoSort"
          description="This is the WasteBot Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
        />
        <PageBreadcrumb pageTitle="WasteBot Management" />
        <div className="flex justify-center items-center h-64">
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
        <PageMeta
          title="WasteBot Management Dashboard | EcoSort"
          description="This is the WasteBot Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
        />
        <PageBreadcrumb pageTitle="WasteBot Management" />
        <div className="flex justify-center items-center h-64">
          <p className={`text-lg text-red-500`}>
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <PageMeta
        title="WasteBot Management Dashboard | EcoSort"
        description="This is the WasteBot Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="WasteBot Management" />

      {/* Modal for adding a WasteBot */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30" style={{ paddingTop: '5rem' }}>
          <div className={`rounded-lg shadow-md p-6 w-80 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              Add WasteBot
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Model Field */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                />
              </div>

              {/* Location Field */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                />
              </div>

              {/* Autonomy Field */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Autonomy (mAh)
                </label>
                <input
                  type="number"
                  name="autonomy"
                  value={formData.autonomy}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end" style={{ marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`mr-2 px-3 py-1 text-xs font-medium rounded-md ${
                    theme === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    theme === "dark" ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  Add WasteBot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Table */}
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
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`p-2 rounded-md border ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-700"
              }`}
            />
            <button
              onClick={handleAddWasteBot}
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
              }`}
            >
              <FaPlus className="text-green-500" /> {/* Add Icon */}
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
                  ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Model
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
                  Autonomy
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  On/Off
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
                  key={bot.id}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}>
                    {bot.id}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}>
                    {bot.model}
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
                    {bot.autonomy} mAh
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <button
                      onClick={() => handleToggleStatus(bot.id, bot.status)}
                      className={`p-2 rounded-full ${
                        theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                      }`}
                    >
                      <FaPowerOff
                        className={`${
                          bot.status === "Active" ? "text-green-500" : "text-red-500"
                        }`}
                      /> {/* Power Icon */}
                    </button>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <button
                      onClick={() => handleDelete(bot.id)}
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
                      ? "text-white bg-blue-600 bg-[#4CAF50]"
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