import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import FundingPage from "../pages/FundingPage";
import Dashboard from "../pages/Dashboard/AdminPage/Dashboard";
import UserDashBorad from "../pages/Dashboard/AdminPage/UserDashBorad";
import ProfilePage from "../pages/Dashboard/AdminPage/ProfilePage";
import EditProfilePage from "../pages/Dashboard/AdminPage/EditProfilePage";
import DonationRequests from "../pages/Dashboard/DonorDashboard/DonationRequests";
import CreateDonationRequest from "../pages/Dashboard/DonorDashboard/CreateDonationRequest";

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
        path: "searchdoner",
        element: <SearchPage />,
      },
      {
        path: "bloodDonationRequests",
        element: <BloodDonationRequests />,
      },
      {
        path: "blogDetailsPage",
        element: <BlogDetailsPage />,
      },
      {
        path: "fundingPage",
        element: <FundingPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "", element: <UserDashBorad /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "EditProfilePage", element: <EditProfilePage /> },
      { path: "my-donation-requests", element: <DonationRequests /> },
      { path: "create-donation-request", element: <CreateDonationRequest /> },
    ],
  },
]);

export default routers;
