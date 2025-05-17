import { FiUser, FiMail, FiMapPin, FiDroplet } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { MdAvTimer } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

const ProfilePage = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userProfile/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { name, email, bloodGroup, district, upazila, image } = data;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Profile Information
          </h1>
          <Link
            to={"/dashboard/EditProfilePage"}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Profile
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Avatar */}
              <div className="sm:col-span-6 flex items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <div>
                    {image ? (
                      <img
                        className="h-16 w-16 rounded-full"
                        src={image}
                        alt=""
                      />
                    ) : (
                      <RxAvatar />
                    )}
                  </div>
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  Click on edit profile to change photo
                </span>
              </div>

              {/* Name */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1 text-sm text-gray-900 p-2 bg-gray-50 rounded">
                  {name}
                </div>
              </div>

              {/* Email (non-editable) */}
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 flex items-center text-sm text-gray-900 p-2 bg-gray-50 rounded">
                  <FiMail className="mr-2 text-gray-400" />
                  {email}
                </div>
              </div>

              {/* District */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <div className="mt-1 flex items-center text-sm text-gray-900 p-2 bg-gray-50 rounded">
                  <FiMapPin className="mr-2 text-gray-400" />
                  {district || "Not Found"}
                </div>
              </div>

              {/* Upazila */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Upazila
                </label>
                <div className="mt-1 flex items-center text-sm text-gray-900 p-2 bg-gray-50 rounded">
                  <FiMapPin className="mr-2 text-gray-400" />
                  {upazila || "Not Found"}
                </div>
              </div>

              {/* Blood Group */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <div className="mt-1 flex items-center text-sm text-gray-900 p-2 bg-gray-50 rounded">
                  <FiDroplet className="mr-2 text-gray-400" />
                  {bloodGroup}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button (hidden in view mode) */}
          <div className="px-4 py-4 bg-gray-50 text-right sm:px-6 hidden">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
