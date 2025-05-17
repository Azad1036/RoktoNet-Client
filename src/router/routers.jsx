import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import FundingPage from "../pages/FundingPage";
import DonationRequests from "../pages/Dashboard/DonorDashboard/DonationRequests";
import CreateDonationRequest from "../pages/Dashboard/DonorDashboard/CreateDonationRequest";
import EditProfilePage from "../pages/Dashboard/DonorDashboard/EditProfilePage";
import Dashboard from "./../pages/Dashboard/DonorDashboard/Dashboard";
import UserDashboard from "../pages/Dashboard/DonorDashboard/UserDashBorad";
import AdminDashboard from "../pages/Dashboard/AdminPage/AdminDashboard";
import AllUsers from "../pages/Dashboard/AdminPage/AllUsers";
import AllDonationsRequests from "../pages/Dashboard/AdminPage/AllDonationsRequests";
import ContentManagement from "../pages/Dashboard/AdminPage/ContentManagement";
import AddBlogPage from "../pages/Dashboard/AdminPage/AddBlogPage";

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
      { path: "donor", element: <UserDashboard /> },
      { path: "profile", element: <EditProfilePage /> },
      { path: "EditProfilePage", element: <EditProfilePage /> },
      { path: "my-donation-requests", element: <DonationRequests /> },
      { path: "create-donation-request", element: <CreateDonationRequest /> },

      // Admin Page
      {
        path: "admin",
        element: <AdminDashboard />,
      },

      // Admin All Users
      {
        path: "all-users",
        element: <AllUsers />,
      },

      // Admin All Donation Request Page
      {
        path: "all-donation-requests",
        element: <AllDonationsRequests />,
      },

      // Admin ContentManagement Page
      {
        path: "content-management",
        element: <ContentManagement />,
      },

      //Add Blog Page
      {
        path: "content-management/add-blog",
        element: <AddBlogPage />,
      },
    ],
  },
]);

export default routers;
