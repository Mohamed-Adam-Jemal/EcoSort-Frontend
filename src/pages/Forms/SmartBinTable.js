"use client";

import config from '../../config';
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook
import { FaTrash, FaPlus } from "react-icons/fa"; // Import icons

export default function SmartBinTable() {
  const [smartBinData, setSmartBinData] = useState([]); // State to store SmartBin data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    status: "Inactive",
    cover: "Closed",
    location: "",
    capacity: 0,
  }); // State to store form data

  const userRole = localStorage.getItem("role");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Number of rows per page

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Use the theme context
  const { theme } = useTheme();

  // Fetch SmartBin data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.serverIp}/smartbins/`);
        setSmartBinData(response.data); // Update data
        setLoading(false); // Disable loading
      } catch (error) {
        setError(error.message); // Display error
        setLoading(false); // Disable loading
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter SmartBins based on search query
  const filteredSmartBins = smartBinData.filter((bin) =>
    bin.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSmartBins.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredSmartBins.length / rowsPerPage);

  // Handle SmartBin deletion
  const handleDelete = async (smartBinId) => {
    try {
      await axios.delete(`${config.serverIp}/smartbins/${smartBinId}/`);
      // Remove the SmartBin from state
      setSmartBinData(smartBinData.filter((bin) => bin.id !== smartBinId));
    } catch (error) {
      console.error("Error deleting SmartBin:", error);
    }
  };

  // Open the modal to add a SmartBin
  const handleAddSmartBin = () => {
    setIsModalOpen(true);
  };

  // Handle input changes in the form
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
      // Send a POST request to add a new SmartBin
      const response = await axios.post(`${config.serverIp}/smartbins/`, formData);

      // Add the new SmartBin to the state
      setSmartBinData([...smartBinData, response.data]);

      // Close the modal
      setIsModalOpen(false);

      // Reset form data
      setFormData({
        status: "Inactive",
        cover: "Closed",
        location: "",
        capacity: 0,
      });
    } catch (error) {
      console.error("Error adding SmartBin:", error);
    }
  };

  // Toggle cover status
  const toggleCover = async (smartBinId, currentCoverStatus) => {
    // Invert the cover status for the backend
    const newCoverStatus = currentCoverStatus === "Closed" ? "Opened" : "Closed";

    try {
      // Send a PATCH request to update the cover status
      await axios.patch(`${config.serverIp}/smartbins/${smartBinId}/`, {
        cover: newCoverStatus,
      });

      // Update the SmartBin data in state
      setSmartBinData((prevData) =>
        prevData.map((bin) =>
          bin.id === smartBinId ? { ...bin, cover: newCoverStatus } : bin
        )
      );
    } catch (error) {
      console.error("Error toggling cover:", error);
    }
  };

  // Display loading state
  if (loading) {
    return (
      <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
        <PageMeta
          title="SmartBin Management Dashboard | EcoSort"
          description="SmartBin management page for EcoSort - React.js dashboard template with Tailwind CSS"
        />
        <PageBreadcrumb pageTitle="SmartBin Management" />
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
          title="SmartBin Management Dashboard | EcoSort"
          description="SmartBin management page for EcoSort - React.js dashboard template with Tailwind CSS"
        />
        <PageBreadcrumb pageTitle="SmartBin Management" />
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
        title="SmartBin Management Dashboard | EcoSort"
        description="SmartBin management page for EcoSort - React.js dashboard template with Tailwind CSS"
      />
      <PageBreadcrumb pageTitle="SmartBin Management" />

      {/* Modal to add a SmartBin */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30" style={{ paddingTop: '5rem' }}>
          <div className={`rounded-lg shadow-md p-6 w-80 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              Add a SmartBin
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Status Field */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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

              {/* Capacity Field */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Capacity (L)
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
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
                  Add
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
        {/* Header with Add Button and Search Field */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div>
            <h2 className={`text-xl font-semibold ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              SmartBin Data
            </h2>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Overview of SmartBin statuses and metrics.
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
            {
            (userRole === "admin") && ( // Check if the user's role is admin or agent
              <button
                onClick={handleAddSmartBin}
                className={`p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                }`}
              >
                <FaPlus className="text-green-500" /> {/* Add Icon */}
              </button>
            )
          }
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
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Cover
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Capacity
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
              {currentRows.map((bin) => (
                <tr
                  key={bin.id}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}>
                    {bin.id}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        bin.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {bin.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <button
                      onClick={() => toggleCover(bin.id, bin.cover)}
                      className={`px-3 py-1 text-xs font-medium rounded-md ${
                        theme === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      title={bin.cover === "Closed" ? "Click to Open" : "Click to Close"} 
                    >
                      {bin.cover}
                    </button>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {bin.location}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {bin.capacity} L
                  </td>
                  {
                    userRole === "Admin" && ( // Check if the user's role is admin
                      <td
                        className={`${
                          theme === "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        <button
                          onClick={() => handleDelete(bin.id)}
                          className={`p-2 rounded-full ${
                            theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                          }`}
                        >
                          <FaTrash className="text-red-500" /> {/* Delete Icon */}
                        </button>
                      </td>
                    )
                  }
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
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, smartBinData.length)} of{" "}
            {smartBinData.length} entries
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