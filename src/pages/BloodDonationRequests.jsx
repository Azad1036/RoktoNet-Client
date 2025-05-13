// src/pages/BloodDonationRequests.jsx
import { Link } from "react-router-dom";

const BloodDonationRequests = () => {
  // Hardcoded static data
  const requests = [
    {
      id: 1,
      recipientName: "John Doe",
      district: "Dhaka",
      upazila: "Mirpur",
      bloodGroup: "B+",
      date: "2023-08-20",
      time: "10:00 AM",
    },
    {
      id: 2,
      recipientName: "Sarah Smith",
      district: "Chittagong",
      upazila: "Patiya",
      bloodGroup: "O+",
      date: "2023-08-21",
      time: "2:30 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-600">BloodBridge</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Active Blood Requests
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">
                {request.recipientName}
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span>{" "}
                  {request.district}, {request.upazila}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Blood Group:</span>
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded">
                    {request.bloodGroup}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span> {request.date}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Time:</span> {request.time}
                </p>
              </div>

              <div className="mt-4">
                <Link
                  to={`/donation-requests/${request.id}`}
                  className="inline-block w-full text-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center">
            © 2023 BloodBridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BloodDonationRequests;
