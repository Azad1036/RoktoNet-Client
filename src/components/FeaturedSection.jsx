const FeaturedSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-12">
          Why Donate With Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-red-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="text-red-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Quick Matching
            </h3>
            <p className="text-gray-600">
              Our advanced system quickly matches donors with recipients based
              on blood type and location.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-red-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="text-red-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Safe Process
            </h3>
            <p className="text-gray-600">
              All donations are handled through certified blood banks and
              medical professionals.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-red-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="text-red-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Community Impact
            </h3>
            <p className="text-gray-600">
              Join thousands of donors who have helped save lives in your local
              community.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-3xl font-bold text-red-600">10,000+</p>
            <p className="text-gray-600">Donors Registered</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-3xl font-bold text-red-600">25,000+</p>
            <p className="text-gray-600">Lives Saved</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-3xl font-bold text-red-600">50+</p>
            <p className="text-gray-600">Hospitals Partnered</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-3xl font-bold text-red-600">100%</p>
            <p className="text-gray-600">Verified Donations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
