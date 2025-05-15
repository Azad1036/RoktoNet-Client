import { Link } from "react-router-dom";

const Banner = () => {
  
  return (
    <div className="relative bg-red-50 py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-white opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Content centered without image */}
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-6">
              Save Lives With Your Blood Donation
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Join our community of donors and help those in need. Every drop
              counts in saving lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={"/register"}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Join as a Donor
              </Link>

              <Link
                to={"/searchdoner"}
                className="bg-white hover:bg-gray-100 text-red-600 font-semibold py-3 px-6 border border-red-600 rounded-lg shadow-md transition duration-300"
              >
                Search Donors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
