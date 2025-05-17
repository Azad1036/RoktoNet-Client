import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import {
  FiDroplet,
  FiHome,
  FiUser,
  FiCalendar,
  FiUsers,
  FiBarChart,
  FiSettings,
} from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

function Dashboard() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userProfile/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // ensure query runs only when user is available
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  // ✅ Auto-Redirect when visiting /dashboard root
  if (location.pathname === "/dashboard") {
    if (data.role === "admin") {
      return <Navigate to="/dashboard/admin" />;
    } else if (data.role === "donor") {
      return <Navigate to="/dashboard/donor" />;
    } else {
      return <Navigate to="/dashboard/user-home" />;
    }
  }

  const allDashboardLinks = (
    <>
      {data?.role === "admin" && (
        <>
          <Link
            to="/dashboard/admin"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/all-users"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
          >
            <FiHome className="mr-3" />
            All Users
          </Link>
          <Link
            to="/dashboard/all-donation-requests"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
          >
            <FiDroplet className="mr-3" />
            All Donation Requests
          </Link>
          <Link
            to="/dashboard/content-management"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
          >
            <FiDroplet className="mr-3" />
            Content Management
          </Link>
        </>
      )}

      {data?.role === "donor" && (
        <>
          <Link
            to="/dashboard/donor"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
          >
            <FiUser className="mr-3" />
            Profile
          </Link>
          <Link
            to="/dashboard/my-donation-requests"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
          >
            <FiDroplet className="mr-3" />
            Donation Requests
          </Link>
          <Link
            to="/dashboard/create-donation-request"
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
          >
            <FiCalendar className="mr-3" />
            Create Donation
          </Link>
        </>
      )}

      {/* You can add other roles here similarly */}

      <Link
        to="/"
        className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
      >
        <FiHome className="mr-3" />
        Home
      </Link>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed md:relative inset-y-0 left-0 z-40 flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-xl font-bold text-red-600 flex items-center">
            <FiDroplet className="mr-2" />
            BloodLink
          </h1>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {allDashboardLinks}
        </nav>

        <div className="p-4 border-t border-gray-200">
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
  );
}

export default Dashboard;
