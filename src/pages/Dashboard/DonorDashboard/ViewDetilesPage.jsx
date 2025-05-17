import {
  FiUser,
  FiDroplet,
  FiMapPin,
  FiCalendar,
  FiMail,
  FiArrowLeft,
} from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewDetailsPage() {
  const axiosSecure = useAxiosSecure();
  const { reqId } = useParams();
  const navigate = useNavigate();

  // Fetch donation request details
  const { data, isLoading } = useQuery({
    queryKey: ["donationRequest", reqId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/edit-request/${reqId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-red-600 flex items-center gap-2">
            <FiDroplet className="text-red-600" size={24} />
            Donation Request Details
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FiArrowLeft size={18} />
            Back
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <FiUser className="text-red-500" size={20} />
            <p>
              <span className="font-semibold">Requester:</span> {data.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiUser className="text-red-500" size={20} />
            <p>
              <span className="font-semibold">Recipient:</span>{" "}
              {data.recipientName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiDroplet className="text-red-500" size={20} />
            <p>
              <span className="font-semibold">Blood Group:</span>{" "}
              <span className="text-red-600 font-bold">{data.bloodGroup}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiMapPin className="text-red-500" size={20} />
            <p>
              <span className="font-semibold">Location:</span> {data.district} ›{" "}
              {data.upazila}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiMapPin className="text-red-500" size={20} />
            <p>
              <span className="font-semibold">Hospital:</span>{" "}
              {data.hospitalName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiMapPin className="text-red-500" size={20} />
            <p>
              <span className="font-semibold">Address:</span> {data.fullAddress}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiCalendar className="text-red-500" size={20} />
            <p>
              <span className="font-semibold">Date & Time:</span>{" "}
              {data.donationDate} • {data.donationTime}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiMail className="text-red-500" size={20} />
            <p>
              <span className="font-semibold">Contact Email:</span> {data.email}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm leading-relaxed text-gray-600">
          <span className="font-semibold">Request Message:</span>{" "}
          {data.requestMessage}
        </div>

        <div className="text-right">
          <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
}
