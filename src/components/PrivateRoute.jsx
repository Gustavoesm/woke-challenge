import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { authenticatedUser } = useAuth();
  return authenticatedUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
