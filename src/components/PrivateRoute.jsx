import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
