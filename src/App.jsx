import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

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
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
