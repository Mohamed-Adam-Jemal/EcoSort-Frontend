"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook
import { FaTrash, FaPlus } from "react-icons/fa"; // Import icons

export default function UserTable() {
  const [userData, setUserData] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  }); // State to store form data

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Number of rows per page

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Use the theme context
  const { theme } = useTheme();

  // Fetch user data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.145:8000/users/");
        setUserData(response.data); // Set the fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter users based on search query
  const filteredUsers = userData.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  // Handle delete action
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/users/${userId}/`);
      // Remove the deleted user from the state
      setUserData(userData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle add user action (open modal)
  const handleAddUser = () => {
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
      // Send POST request to add a new user
      const response = await axios.post("http://127.0.0.1:8000/users/", formData);
      
      // Add the new user to the state
      setUserData([...userData, response.data]);
      
      // Close the modal
      setIsModalOpen(false);
      
      // Reset the form data
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Display loading state
  if (loading) {
    return (
      <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
        <PageMeta
          title="User Management Dashboard | EcoSort"
          description="This is the User Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
        />
        <PageBreadcrumb pageTitle="Users" />
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
          title="User Management Dashboard | EcoSort"
          description="This is the User Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
        />
        <PageBreadcrumb pageTitle="Users" />
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
        title="User Management Dashboard | EcoSort"
        description="This is the User Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />

      {/* Modal for adding a user */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30" style={{ paddingTop: '5rem' }}>
          <div className={`rounded-lg shadow-md p-6 w-80 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              Add User
            </h2>
            <form onSubmit={handleSubmit}>
              {/* First Name Field */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
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
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                />
              </div>

              {/* Role Field as a Select Dropdown */}
              <div className="mb-3">
                <label className={`block text-xs font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } p-1 text-sm`}
                  required
                >
                  <option value="" disabled>Select a role</option>
                  <option value="Agent">Agent</option>
                  <option value="User">User</option>
                </select>
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
                  Add User
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
              User Data
            </h2>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Overview of registered users.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`p-2 rounded-md border ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-700"
              }`}
            />
            <button
              onClick={handleAddUser}
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
                 ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  First Name
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Last Name
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Email
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Password
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Role
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Date Joined
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
              {currentRows.map((user) => (
                <tr
                  key={user.id}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}>
                    {user.id}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.first_name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.last_name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.email}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.password.slice(20,30)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.role}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.date_joined}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <button
                      onClick={() => handleDelete(user.id)}
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
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, userData.length)} of{" "}
            {userData.length} entries
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