import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import moment from "moment";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donationList = [], isLoading } = useQuery({
    queryKey: ["allDonationUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-donation-user");
      return res.data; // ⬅️ array expected
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              Funding History
            </h1>
            <p className="text-gray-600 mt-1">
              All donations made to our organization
            </p>
          </div>
          <Link
            to="/fundingPage/add-found"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            {/* plus icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Make Donation
          </Link>
        </div>

        {/* table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {donationList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No donations found
                    </td>
                  </tr>
                ) : (
                  donationList.map((d) => (
                    <tr key={d._id} className="hover:bg-gray-50">
                      {/* donor cell */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* avatar with initials */}
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                              {d.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {d.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {d.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* amount */}
                      <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                        ${Number(d.totalAmount).toLocaleString()}
                      </td>

                      {/* date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment(d?.timeNow).format("MMMM D, YYYY")}
                      </td>

                      {/* status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            d.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : d.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* simple count footer (remove if server-side pagination) */}
          <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
            Showing <span className="font-medium">{donationList.length}</span>{" "}
            donations
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;
