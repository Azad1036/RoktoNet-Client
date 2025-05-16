import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FiDroplet,
  FiHome,
  FiUser,
  FiCalendar,
  FiUsers,
  FiBarChart,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

function Dashboard() {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Check if current route matches the link
  const isActive = (path) => {
    return (
      location.pathname === `/dashboard${path}` ||
      (path === "" && location.pathname === "/dashboard")
    );
  };

  return (
    <div className="flex h-screen  bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {mobileSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } 
                   md:translate-x-0 transform transition-transform duration-200 ease-in-out
                   fixed md:relative inset-y-0 left-0 z-40
                   flex flex-col w-64 bg-white border-r border-gray-200`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-xl font-bold text-red-600 flex items-center">
            <FiDroplet className="mr-2" />
            BloodLink
          </h1>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          <Link
            to=""
            className={`flex items-center w-full p-3 rounded-lg ${
              isActive("") ? "bg-red-50 text-red-600" : "hover:bg-gray-100"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/profile"
            className={`flex items-center w-full p-3 rounded-lg ${
              isActive("/profile")
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiUser className="mr-3" />
            Profile
          </Link>
          <Link
            to="/dashboard/my-donation-requests"
            className={`flex items-center w-full p-3 rounded-lg ${
              isActive("/inventory")
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiDroplet className="mr-3" />
            Donation Requests
          </Link>
          <Link
            to="/dashboard/drives"
            className={`flex items-center w-full p-3 rounded-lg ${
              isActive("/drives")
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiCalendar className="mr-3" />
            Donation Drives
          </Link>
          <Link
            to="/dashboard/recipients"
            className={`flex items-center w-full p-3 rounded-lg ${
              isActive("/recipients")
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiUsers className="mr-3" />
            Recipients
          </Link>
          <Link
            to="/dashboard/reports"
            className={`flex items-center w-full p-3 rounded-lg ${
              isActive("/reports")
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiBarChart className="mr-3" />
            Reports
          </Link>
          <Link
            to="/dashboard/settings"
            className={`flex items-center w-full p-3 rounded-lg ${
              isActive("/settings")
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiSettings className="mr-3" />
            Settings
          </Link>
          <Link
            to="/"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiHome className="mr-3" />
            Home
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <FiUser className="text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">bloodbank@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto  pt-16 md:pt-0">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
