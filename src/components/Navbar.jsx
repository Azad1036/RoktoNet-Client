import { useState } from "react";
import { FaHeart, FaUser, FaSignInAlt, FaBlog, FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-red-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and main nav items */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaHeart className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">RoktoNet</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-800 flex items-center"
                >
                  <FaHome className="mr-1" /> Home
                </Link>
                <Link
                  to={"/bloodDonationRequests"}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-800 flex items-center"
                >
                  <FaHeart className="mr-1" /> Donation Requests
                </Link>
                <Link
                  to={"/blogDetailsPage"}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-800 flex items-center"
                >
                  <FaBlog className="mr-1" /> Blog
                </Link>
                {user?.email && (
                  <Link
                    to={"/fundingPage"}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-800"
                  >
                    Funding
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!user?.email ? (
                <Link
                  to={"/login"}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-800 flex items-center"
                >
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
              ) : (
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="max-w-xs flex items-center text-sm rounded-full focus:outline-none"
                      id="user-menu"
                    >
                      <div className="h-8 w-8 rounded-full bg-red-800 flex items-center justify-center">
                        <FaUser />
                      </div>
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <Link
                        to={"/dashboard"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => logoutUser()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-red-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 flex items-center"
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              href="#donate"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 flex items-center"
            >
              <FaHeart className="mr-2" /> Donation Requests
            </Link>
            <Link
              href="#blog"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 flex items-center"
            >
              <FaBlog className="mr-2" /> Blog
            </Link>
            {user?.email && (
              <Link
                href="#funding"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700"
              >
                Funding
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-red-700">
            {!user?.email ? (
              <Link
                to={"/login"}
                className="block w-full px-5 py-3 text-center font-medium text-white hover:bg-red-700 flex items-center justify-center"
              >
                <FaSignInAlt className="mr-2" /> Login
              </Link>
            ) : (
              <>
                <div className="flex items-center px-5">
                  <div className="h-10 w-10 rounded-full bg-red-700 flex items-center justify-center">
                    <FaUser />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium">User Dashboard</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href="#dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => logoutUser()}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
