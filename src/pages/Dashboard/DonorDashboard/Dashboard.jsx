import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import {
  FiDroplet,
  FiHome,
  FiUser,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { useState } from "react";

function Dashboard() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userProfile/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  if (location.pathname === "/dashboard") {
    if (data.role === "admin") {
      return <Navigate to="/dashboard/admin" />;
    } else if (data.role === "donor") {
      return <Navigate to="/dashboard/donor" />;
    } else if (data.role === "volunteer") {
      return <Navigate to="/dashboard/volunteer" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  const allDashboardLinks = (
    <>
      {data?.role === "admin" && (
        <>
          <Link
            to="/dashboard/admin"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/all-users"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiUsers className="mr-3" />
            All Users
          </Link>
          <Link
            to="/dashboard/all-donation-requests"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiDroplet className="mr-3" />
            All Donation Requests
          </Link>
          <Link
            to="/dashboard/content-management"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiSettings className="mr-3" />
            Content Management
          </Link>
        </>
      )}
      {data?.role === "donor" && (
        <>
          <Link
            to="/dashboard/donor"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiUser className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/my-donation-requests"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiDroplet className="mr-3" />
            Donation Requests
          </Link>
          <Link
            to="/dashboard/create-donation-request"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiCalendar className="mr-3" />
            Create Donation
          </Link>
        </>
      )}
      {data?.role === "volunteer" && (
        <>
          <Link
            to="/dashboard/volunteer"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/all-donation-requests"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiDroplet className="mr-3" />
            All Donation Requests
          </Link>
          <Link
            to="/dashboard/content-management"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiSettings className="mr-3" />
            Content Management
          </Link>
        </>
      )}
      <Link
        to="/dashboard/profile"
        className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setIsSidebarOpen(false)}
      >
        <FiUser className="mr-3" />
        Profile
      </Link>
      <Link
        to="/"
        className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setIsSidebarOpen(false)}
      >
        <FiHome className="mr-3" />
        Home
      </Link>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="ml-3 text-xl font-bold text-red-600 flex items-center">
            <FiDroplet className="mr-2" />
            BloodLink
          </h1>
        </div>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
            <FiUser className="text-red-600" />
          </div>
          <div className="ml-2 hidden sm:block">
            <p className="text-sm font-medium">{user?.displayName || "User"}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:pt-0 pt-16`}
        >
          <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
            {allDashboardLinks}
          </nav>
          <div className="p-4 border-t border-gray-200 md:block hidden">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <FiUser className="text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
