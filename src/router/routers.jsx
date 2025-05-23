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
import VolunteerDashBoard from "../pages/Dashboard/VolunteerDashboard/VolunteerDashBoard";
import AllDontaionsReq from "../pages/Dashboard/VolunteerDashboard/AllDontaionsReq";
import VolunteerContentManagement from "../pages/Dashboard/VolunteerDashboard/VolunteerContentManagement";
import ProfilePage from "./../pages/Dashboard/DonorDashboard/ProfilePage";
import PrivateRouters from "./PrivateRouters";
import EditDonationsRequest from "../pages/Dashboard/DonorDashboard/EditDonationsRequest";
import ViewDetilesPage from "../pages/Dashboard/DonorDashboard/ViewDetilesPage";
import EditBlogPosts from "../pages/EditBlogPost";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import Blog from "../pages/Blog";
import BlogDetilesAllUsers from "../pages/BlogDetilesAllUsers";
import AddFundingPage from "../pages/AddFundingPage";

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
        path: "donation-request-details/:id",
        element: (
          <PrivateRouters>
            <DonationRequestDetails />
          </PrivateRouters>
        ),
      },
      {
        path: "blogDetailsPage",
        element: <BlogDetailsPage />,
      },
      {
        path: "fundingPage",
        element: <FundingPage />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/blog-detiles/:id",
        element: <BlogDetilesAllUsers />,
      },
      {
        path: "fundingPage/add-found",
        element: <AddFundingPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouters>
        <Dashboard />
      </PrivateRouters>
    ),
    children: [
      // Doner Page
      {
        path: "donor",
        element: (
          <PrivateRouters>
            <UserDashboard />
          </PrivateRouters>
        ),
      },
      { path: "profile", element: <ProfilePage /> },
      { path: "EditProfilePage", element: <EditProfilePage /> },
      { path: "my-donation-requests", element: <DonationRequests /> },
      {
        path: "edit-donations-request/:reqId",
        element: <EditDonationsRequest />,
      },
      { path: "create-donation-request", element: <CreateDonationRequest /> },
      { path: "view-detiles-page/:reqId", element: <ViewDetilesPage /> },

      // Admin Page
      // Admin DashBoard
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
      {
        path: "content-management/edit-blog",
        element: <EditBlogPosts />,
      },
      {
        path: "blog-details/:id",
        element: <BlogDetailsPage />,
      },

      // Volunteer Page
      // Volunteer DashBoard
      {
        path: "volunteer",
        element: <VolunteerDashBoard />,
      },

      // Volunteer All Donation Request Page
      {
        path: "all-donation-requests",
        element: <AllDontaionsReq />,
      },

      // Volunteer ContentManagement Page
      {
        path: "content-management",
        element: <VolunteerContentManagement />,
      },
    ],
  },
]);

export default routers;
