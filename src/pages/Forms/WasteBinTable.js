"use client";

import config from '../../config';
import React, { useState, useEffect } from "react";
import axios from "axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext";
import { FaTrash, FaPlus, FaPowerOff } from "react-icons/fa";

export default function WasteBinTable() {
  const [wasteBinData, setWasteBinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Type: "",
    location: "",
    capacity: 0,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();

  // Fetch WasteBin data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.serverIp}/wastebins/`);
        setWasteBinData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter WasteBins
  const filteredWasteBins = wasteBinData.filter((bin) =>
    bin.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredWasteBins.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredWasteBins.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete
  const handleDelete = async (wasteBinId) => {
    try {
      await axios.delete(`${config.serverIp}/wastebins/${wasteBinId}/`);
      setWasteBinData(wasteBinData.filter((bin) => bin.id !== wasteBinId));
    } catch (error) {
      console.error("Error deleting WasteBin:", error);
    }
  };

  // Add WasteBin
  const handleAddWasteBin = () => setIsModalOpen(true);

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
      const response = await axios.post(`${config.serverIp}/wastebins/`, formData);
      setWasteBinData([...wasteBinData, response.data]);
      setIsModalOpen(false);
      setFormData({
        Type: "",
        location: "",
        capacity: 0,
      });
    } catch (error) {
      console.error("Error adding WasteBin:", error);
    }
  };

  if (loading) {
    return (
      <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
        <PageMeta
          title="WasteBin Management Dashboard | EcoSort"
          description="WasteBin management page"
        />
        <PageBreadcrumb pageTitle="WasteBin Management" />
        <div className="flex justify-center items-center h-64">
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
        <PageMeta
          title="WasteBin Management Dashboard | EcoSort"
          description="WasteBin management page"
        />
        <PageBreadcrumb pageTitle="WasteBin Management" />
        <div className="flex justify-center items-center h-64">
          <p className={`text-lg text-red-500`}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <PageMeta
        title="WasteBin Management Dashboard | EcoSort"
        description="WasteBin management page"
      />
      <PageBreadcrumb pageTitle="WasteBin Management" />

      {/* Add WasteBin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30" style={{ paddingTop: '5rem' }}>
          <div className={`rounded-lg shadow-md p-6 w-80 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              Add WasteBin
            </h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                />
              </div>

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
                  Add WasteBin
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
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div>
            <h2 className={`text-xl font-semibold ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              WasteBin Data
            </h2>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Overview of WasteBin status and assignments.
            </p>
          </div>
          <div className="flex items-center space-x-4">
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
              onClick={handleAddWasteBin}
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
              }`}
            >
              <FaPlus className="text-green-500" />
            </button>
          </div>
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
                  ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Type
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
                        bin.type === "Plastic"
                          ? "bg-blue-100 text-blue-800"
                          : bin.type === "Paper"
                          ? "bg-green-100 text-green-800"
                          : bin.type === "Metal"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {bin.type.toUpperCase()}
                    </span>
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
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <button
                      onClick={() => handleDelete(bin.id)}
                      className={`p-2 rounded-full ${
                        theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                      }`}
                    >
                      <FaTrash className="text-red-500" />
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
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredWasteBins.length)} of{" "}
            {filteredWasteBins.length} entries
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
                      ? "text-white bg-blue-600"
                      : "text-white bg-blue-600"
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