import {
  FiUser,
  FiMail,
  FiMapPin,
  FiDroplet,
  FiCalendar,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";

const CreateDonationRequest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 bg-clip-text  bg-gradient-to-r from-red-600 to-red-400">
            Create Blood Donation Request
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Help save lives by requesting blood donations
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Requester Name
                </label>
                <div className="flex items-center p-3 bg-gray-100 rounded-lg border border-gray-200">
                  <FiUser className="mr-3 text-red-500" size={20} />
                  <span className="text-gray-800 font-medium">User's Name</span>
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Requester Email
                </label>
                <div className="flex items-center p-3 bg-gray-100 rounded-lg border border-gray-200">
                  <FiMail className="mr-3 text-red-500" size={20} />
                  <span className="text-gray-800 font-medium">
                    user@example.com
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter recipient name"
                  />
                  <FiUser
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <select className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none transition-all duration-200">
                    <option>Select blood group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                  <FiDroplet
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District
                </label>
                <div className="relative">
                  <select className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none transition-all duration-200">
                    <option>Select district</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                    <option>Khulna</option>
                  </select>
                  <FiMapPin
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upazila
                </label>
                <div className="relative">
                  <select className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none transition-all duration-200">
                    <option>Select upazila</option>
                    <option>Dhanmondi</option>
                    <option>Mirpur</option>
                    <option>Gulshan</option>
                  </select>
                  <FiMapPin
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hospital Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter hospital name"
                  />
                  <FiMapPin
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter full address"
                  />
                  <FiMapPin
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                  <FiCalendar
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                  <FiClock
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Request Message
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Explain why you need blood donation..."
                ></textarea>
                <FiMessageSquare
                  className="absolute left-3 top-3.5 text-red-500"
                  size={20}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
