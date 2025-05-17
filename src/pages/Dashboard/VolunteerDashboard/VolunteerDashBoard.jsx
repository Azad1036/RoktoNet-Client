import { FaUsers, FaHandHoldingUsd, FaTint } from "react-icons/fa";

const VolunteerDashBoard = () => {
  const stats = [
    {
      title: "Total Donors",
      value: "1,248",
      icon: <FaUsers className="text-3xl" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Total Funding",
      value: "$24,750",
      icon: <FaHandHoldingUsd className="text-3xl" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Blood Donation Requests",
      value: "86",
      icon: <FaTint className="text-3xl" />,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-blue-600 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-lg opacity-90 mt-2">
          Here's what's happening with your donation platform today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1"
          >
            <div
              className={`${stat.bgColor} ${stat.textColor} w-16 h-16 rounded-full flex items-center justify-center mr-4`}
            >
              {stat.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerDashBoard;
