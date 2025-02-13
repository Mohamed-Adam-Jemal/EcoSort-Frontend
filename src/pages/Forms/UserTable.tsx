"use client";

import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook
import { FaTrash, FaPlus } from "react-icons/fa"; // Import icons

export default function UserTable() {
  // Sample user data (replace with data from your backend)
  const userData = [
    {
      userId: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      password: "********", // Masked for security
      dateJoined: "2023-09-15",
    },
    {
      userId: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      password: "********",
      dateJoined: "2023-09-20",
    },
    {
      userId: 3,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      username: "alicej",
      password: "********",
      dateJoined: "2023-09-25",
    },
    {
      userId: 4,
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      username: "bobbrown",
      password: "********",
      dateJoined: "2023-10-01",
    },
    {
      userId: 5,
      firstName: "Charlie",
      lastName: "Davis",
      email: "charlie.davis@example.com",
      username: "charlied",
      password: "********",
      dateJoined: "2023-10-05",
    },
    {
      userId: 6,
      firstName: "Eva",
      lastName: "Green",
      email: "eva.green@example.com",
      username: "evagreen",
      password: "********",
      dateJoined: "2023-10-10",
    },
    {
      userId: 7,
      firstName: "Frank",
      lastName: "Wilson",
      email: "frank.wilson@example.com",
      username: "frankw",
      password: "********",
      dateJoined: "2023-10-15",
    },
    {
      userId: 8,
      firstName: "Grace",
      lastName: "Harris",
      email: "grace.harris@example.com",
      username: "graceh",
      password: "********",
      dateJoined: "2023-10-20",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Number of rows per page

  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = userData.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(userData.length / rowsPerPage);

  // Use the theme context
  const { theme } = useTheme();

  // Handle delete action (to be linked to an HTTP DELETE request later)
  const handleDelete = (userId: number) => {
    console.log(`Delete user with ID: ${userId}`);
    // Add your DELETE request logic here
  };

  // Handle add user action (to be linked to a form or modal later)
  const handleAddUser = () => {
    console.log("Add a new user");
    // Add your logic to open a form or modal for adding a user
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <PageMeta
        title="User Management Dashboard | EcoSort"
        description="This is the User Management Dashboard page for EcoSort - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />

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
        User Data
        </h2>
        <p className={`text-sm ${
        theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>
        Overview of registered users.
        </p>
    </div>
    <div>
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


        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${
              theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  User ID
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
                  Username
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>
                  Password
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
                  key={user.userId}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}>
                    {user.userId}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.firstName}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.lastName}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.email}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.username}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.password}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {user.dateJoined}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    <button
                      onClick={() => handleDelete(user.userId)}
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