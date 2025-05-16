import { FiClock, FiCheck, FiX, FiRefreshCw, FiFilter } from "react-icons/fi";

const DonationRequests = () => {
  // Sample static data for UI demonstration
  const donationRequests = [
    {
      _id: "1",
      recipientName: "John Doe",
      bloodGroup: "A+",
      hospital: "City Medical Center",
      address: "123 Main St, Dhaka",
      date: "2023-05-15",
      status: "pending",
    },
    {
      _id: "2",
      recipientName: "Sarah Smith",
      bloodGroup: "B-",
      hospital: "Central Hospital",
      address: "456 Park Ave, Chittagong",
      date: "2023-05-10",
      status: "inprogress",
    },
    {
      _id: "3",
      recipientName: "Michael Johnson",
      bloodGroup: "O+",
      hospital: "General Hospital",
      address: "789 Oak Rd, Sylhet",
      date: "2023-05-05",
      status: "done",
    },
    {
      _id: "4",
      recipientName: "Emily Wilson",
      bloodGroup: "AB+",
      hospital: "Children's Hospital",
      address: "321 Pine St, Khulna",
      date: "2023-04-28",
      status: "canceled",
    },
    {
      _id: "5",
      recipientName: "David Brown",
      bloodGroup: "A-",
      hospital: "University Hospital",
      address: "654 Elm St, Rajshahi",
      date: "2023-04-20",
      status: "pending",
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          My Donation Requests
        </h1>

        {/* Filter Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2">
            <FiFilter className="text-gray-500" />
            <select
              className="appearance-none bg-transparent pr-8 focus:outline-none"
              disabled
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donationRequests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.recipientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.bloodGroup}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.hospital}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                          <FiClock className="mr-1" /> Pending
                        </>
                      )}
                      {request.status === "inprogress" && (
                        <>
                          <FiRefreshCw className="mr-1" /> In Progress
                        </>
                      )}
                      {request.status === "done" && (
                        <>
                          <FiCheck className="mr-1" /> Completed
                        </>
                      )}
                      {request.status === "canceled" && (
                        <>
                          <FiX className="mr-1" /> Canceled
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - UI Only */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">5</span> of{" "}
                <span className="font-medium">5</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  disabled
                >
                  Previous
                </button>
                <button
                  aria-current="page"
                  className="z-10 bg-red-50 border-red-500 text-red-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </button>
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  disabled
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;
