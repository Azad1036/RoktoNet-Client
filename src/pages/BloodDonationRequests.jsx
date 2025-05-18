import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { useState } from "react";
import moment from "moment";
import {
  FiMapPin,
  FiDroplet,
  FiCalendar,
  FiClock,
  FiUser,
} from "react-icons/fi";

const BloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  const { isLoading } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-donation-request`);
      setRequests(res.data);
    },
  });

  const filterByReq = requests.filter(
    (filterByRequest) => filterByRequest.status === "pending"
  );

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-600">BloodBridge</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Active Blood Requests
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find urgent blood donation requests in your area and help save lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterByReq.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <FiUser className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {request.recipientName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Needs blood donation
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-600 text-sm">Location</p>
                      <p className="text-gray-800">
                        {request.district}, {request.upazila}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FiDroplet className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-600 text-sm">Blood Group</p>
                      <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                        {request.bloodGroup}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-600 text-sm">Donation Date</p>
                      <p className="text-gray-800">
                        {moment(request.donationDate).format("MMMM D, YYYY")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FiClock className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-600 text-sm">Time</p>
                      <p className="text-gray-800">{request.donationTime}</p>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/donation-requests/${request.id}`}
                  className="mt-6 inline-flex items-center justify-center w-full px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filterByReq.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white p-8 rounded-xl max-w-md mx-auto shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No active requests found
              </h3>
              <p className="mt-1 text-gray-600">
                Currently there are no pending blood donation requests
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodDonationRequests;
