import { FaUsers, FaHandHoldingUsd, FaTint } from "react-icons/fa";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // User Data
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userProfile/${user.email}`);
      return res.data;
    },
  });
  // Donerlist
  const { data: donerlist, isLoading: donorlistLoading } = useQuery({
    queryKey: ["totalDoner"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-doner?role=donor`);
      return res.data;
    },
  });
  // User Data
  const { data: donationReqlist, isLoading: donetionLoading } = useQuery({
    queryKey: ["totalDonationReq"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-donation-request`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (donorlistLoading) {
    return <Loading />;
  }

  if (donetionLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-blue-600 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold">Welcome Back {data.name}!</h1>
        <p className="text-lg opacity-90 mt-2">
          Here's what's happening with your donation platform today.
        </p>
      </div>

      {/* Stats Cards – each card hard-coded */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Donors */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center hover:shadow-lg transition duration-300 hover:-translate-y-1">
          <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
            <FaUsers className="text-3xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {donerlist.length}
            </h2>
            <p className="text-gray-600">Total Donors</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center hover:shadow-lg transition duration-300 hover:-translate-y-1">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
            <FaHandHoldingUsd className="text-3xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">$24,750</h2>
            <p className="text-gray-600">Total Funding</p>
          </div>
        </div>

        {/* Blood Donation Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center hover:shadow-lg transition duration-300 hover:-translate-y-1">
          <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
            <FaTint className="text-3xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {donationReqlist.length}
            </h2>
            <p className="text-gray-600">Blood Donation Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
