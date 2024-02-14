import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import "react-widgets/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Home />,
        path: "/home",
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
};

export default App;
