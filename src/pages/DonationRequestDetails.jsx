import moment from "moment";
import {
  FiArrowLeft,
  FiDroplet,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiInfo,
} from "react-icons/fi";

import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: request,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-request/${id}`);
      return res.data;
    },
  });

  const { data, isLoading: userDataLoading } = useQuery({
    queryKey: ["userProfile", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userProfile/${user.email}`);
      return res.data;
    },
  });

  const handleDonate = (data, id, currentStatus) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      text: "Want to come forward to donate blood and be a part of this noble cause?",
      footer: `<b>${data.name}</b> &nbsp;|&nbsp; ${data.email}`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/boold-donation-status/${id}`, {status: currentStatus});
        if (res.data?.acknowledged) {
          Swal.fire(
            "Thanks!",
            "Give a drop of blood, spread humanity.",
            "success"
          );
        }
        navigate(-1)
      }
    });
  };

  if (isLoading) return <Loading />;
  if (userDataLoading) return <Loading />;
  if (isError) return <div>Error loading request details</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft className="mr-2" />
            Back to Requests
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Request Header */}
          <div className="bg-red-50 px-6 py-4 border-b border-red-100">
            <h1 className="text-2xl font-bold text-gray-800">
              Blood Donation Request
            </h1>
            <div className="flex items-center mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  request.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {request.status}
              </span>
            </div>
          </div>

          {/* Request Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiUser className="mr-2 text-red-500" />
                  Patient Information
                </h2>
                <div className="space-y-3 pl-8">
                  <div>
                    <p className="text-sm text-gray-500">Recipient Name</p>
                    <p className="font-medium">{request.recipientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hospital Name</p>
                    <p className="font-medium">{request.hospitalName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient Condition</p>
                    <p className="font-medium">
                      {request.patientCondition || "Not Found"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Donation Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiDroplet className="mr-2 text-red-500" />
                  Donation Details
                </h2>
                <div className="space-y-3 pl-8">
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium">
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">
                        {request.bloodGroup}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Donation Date</p>
                    <p className="font-medium flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      {moment(request.donationDate).format("MMMM D, YYYY")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Donation Time</p>
                    <p className="font-medium flex items-center">
                      <FiClock className="mr-2 text-gray-400" />
                      {request.donationTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiMapPin className="mr-2 text-red-500" />
                  Location
                </h2>
                <div className="space-y-3 pl-8">
                  <div>
                    <p className="text-sm text-gray-500">District</p>
                    <p className="font-medium">{request.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Upazila</p>
                    <p className="font-medium">{request.upazila}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Address</p>
                    <p className="font-medium">{request.fullAddress}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiPhone className="mr-2 text-red-500" />
                  Contact
                </h2>
                <div className="space-y-3 pl-8">
                  <div>
                    <p className="text-sm text-gray-500">Requester Name</p>
                    <p className="font-medium">{request.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Requester Email</p>
                    <p className="font-medium">{request.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {request.additionalInfo && (
              <div className="mt-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiInfo className="mr-2 text-red-500" />
                  Additional Information
                </h2>
                <div className="pl-8">
                  <p className="text-gray-700">{request.additionalInfo}</p>
                </div>
              </div>
            )}

            {/* Donate Button */}
            {request.status === "pending" && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => handleDonate(data, request._id, "inprogress")}
                  className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Donate Blood
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
