import React from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.removeItem("token");
    toast.error("Please Login");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
