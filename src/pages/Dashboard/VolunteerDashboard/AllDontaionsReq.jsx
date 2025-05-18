import {
  FiClock,
  FiCheck,
  FiX,
  FiRefreshCw,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";

const AllDontaionsReq = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donationRequests, isLoading } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-donation-request`);
      return res.data;
    },
  });

  const [filterRequest, setFilterRequest] = useState(donationRequests || []);

  const handleFilterReqest = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setFilterRequest(donationRequests);
    } else {
      setFilterRequest(donationRequests.filter((req) => req.status === value));
    }
  };

  useEffect(() => {
    if (donationRequests) setFilterRequest(donationRequests);
  }, [donationRequests]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          All Donation Requests
        </h1>
        <p className="text-gray-600">
          Track all your blood donation requests and their status
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Search requests..."
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
              <FiFilter className="text-gray-500" />
              <select
                onChange={handleFilterReqest}
                className="appearance-none bg-transparent pr-8 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filterRequest.map((request) => (
                <tr
                  key={request._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-medium">
                          {request.recipientName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.recipientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.district}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">
                      {request.bloodGroup}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {request.hospitalName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {request.donationDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "inprogress"
                          ? "bg-blue-100 text-blue-800"
                          : request.status === "done"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status === "pending" && (
                        <>
                          <FiClock className="mr-1 mt-0.5" /> Pending
                        </>
                      )}
                      {request.status === "inprogress" && (
                        <>
                          <FiRefreshCw className="mr-1 mt-0.5" /> In Progress
                        </>
                      )}
                      {request.status === "done" && (
                        <>
                          <FiCheck className="mr-1 mt-0.5" /> Completed
                        </>
                      )}
                      {request.status === "canceled" && (
                        <>
                          <FiX className="mr-1 mt-0.5" /> Canceled
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900 mr-3">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDontaionsReq;
