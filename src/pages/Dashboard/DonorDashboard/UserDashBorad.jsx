import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // User Data
  const { data: isUserName, isLoading: isDataLoadin } = useQuery({
    queryKey: ["userProfile", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userProfile/${user.email}`);
      return res.data;
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["donationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donation-requests/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isDataLoadin) return <Loading />;

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inprogress":
        return "bg-blue-100 text-blue-800";
      case "done":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const donationRequests = (data || [])
    .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))
    .slice(0, 3);

  const handlePostDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete-donation-request/${id}`);

        if (res.data?.acknowledged) {
          // Update query cache after deletion
          queryClient.setQueryData(
            ["donationRequests", user?.email],
            (oldData) => {
              return oldData?.filter((item) => item._id !== id);
            }
          );

          Swal.fire(
            "Deleted!",
            "Your donation request has been deleted.",
            "success"
          );
        }
      }
    });
  };

  const handleChangeStatus = async (userId, currentStatus) => {
    const data = await axiosSecure.patch(`/status-update-donor/${userId}`, {
      status: currentStatus,
    });
    console.log(data);
    queryClient.invalidateQueries(["donationRequests"]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h1 className="text-2xl font-bold text-red-700 mb-2">
          Welcome, {isUserName.name}!
        </h1>
        <p className="text-gray-600">
          Thank you for being a blood donor and helping save lives.
        </p>
      </section>

      {/* Recent Donation Requests Section */}
      {donationRequests.length > 0 && (
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-red-700 mb-5">
            Your Recent Donation Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donation Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donationRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.recipientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.district}, {request.upazila}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.donationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.donationTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.bloodGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                      {request.status === "inprogress" && (
                        <div className="mt-2 space-x-2">
                          <button
                            onClick={() =>
                              handleChangeStatus(request._id, "done")
                            }
                            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Mark as Done
                          </button>
                          <button
                            onClick={() =>
                              handleChangeStatus(request._id, "canceled")
                            }
                            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Link
                        to={`/dashboard/edit-donations-request/${request._id}`}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-green-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handlePostDelete(request._id)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/dashboard/view-detiles-page/${request._id}`}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-green-600"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Link
              to={"/dashboard/my-donation-requests"}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              View All My Requests
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserDashboard;
