import React, { useState, useRef, useEffect } from "react";
import {
  FiMoreVertical,
  FiEye,
  FiUserX,
  FiUserCheck,
  FiUserPlus,
  FiShield,
} from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

export default function AllUsers() {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (index, event) => {
    event.stopPropagation();
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-doner`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const updateUserStatus = async (userId, currentStatus) => {
    await axiosSecure.patch(`/users/${userId}`, {
      status: currentStatus,
    });
    queryClient.invalidateQueries(["users"]);
  };

  const updateUserRole = async (userId, userrole) => {
    await axiosSecure.patch(`/users/${userId}`, { role: userrole });
    queryClient.invalidateQueries(["users"]);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">User Management</h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.image}
                          alt={`${user.name}'s avatar`}
                          className="h-10 w-10 rounded-full mr-3 object-cover"
                          onError={(e) => {
                            e.target.src = "https://i.pravatar.cc/150?img=3";
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {user.lastActive}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "volunteer"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right relative">
                      <button
                        onClick={(e) => toggleDropdown(index, e)}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label={`More actions for ${user.name}`}
                        aria-expanded={dropdownIndex === index}
                        aria-controls={`dropdown-menu-${user._id}`}
                      >
                        <FiMoreVertical />
                      </button>

                      {dropdownIndex === index && (
                        <div
                          id={`dropdown-menu-${user._id}`}
                          ref={dropdownRef}
                          className="absolute right-4 top-12 z-50 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1"
                          role="menu"
                        >
                          <button
                            onClick={() =>
                              updateUserStatus(
                                user._id,
                                user.status === "active" ? "block" : "active"
                              )
                            }
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            {user.status === "active" ? (
                              <>
                                <FiUserX className="mr-2" /> Block User
                              </>
                            ) : (
                              <>
                                <FiUserCheck className="mr-2" /> Unblock User
                              </>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              updateUserRole(
                                user._id,
                                user.role === "donor"
                                  ? "volunteer"
                                  : user.role === "volunteer"
                                  ? "admin"
                                  : "donor"
                              )
                            }
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            {user.role === "donor" ? (
                              <>
                                <FiUserPlus className="mr-2" /> Make Volunteer
                              </>
                            ) : user.role === "volunteer" ? (
                              <>
                                <FiShield className="mr-2" /> Make Admin
                              </>
                            ) : (
                              <>
                                <FiUserPlus className="mr-2" /> Make Donor
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
