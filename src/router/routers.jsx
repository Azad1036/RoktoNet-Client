import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import BloodDonationRequests from "../pages/BloodDonationRequests";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "searchpage",
        element: <SearchPage/>
      },
      {
        path: "bloodDonationRequests",
        element: <BloodDonationRequests/>
      }
    ],
  },
]);

export default routers;
