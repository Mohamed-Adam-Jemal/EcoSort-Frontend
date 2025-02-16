import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("user"); // Check if the user is authenticated
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;