import React, { useState } from "react";
import {
  FiMoreVertical,
  FiEye,
  FiUserCheck,
  FiUserX,
  FiUserPlus,
  FiShield,
} from "react-icons/fi";

const AllUsers = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [users, setUsers] = useState([
    {
      id: "user-1",
      avatar: "https://i.pravatar.cc/150?u=john@example.com",
      email: "john@example.com",
      name: "John Doe",
      role: "donor",
      status: "active",
      lastActive: "2023-05-15T10:30:00Z",
    },
    {
      id: "user-2",
      avatar: "https://i.pravatar.cc/150?u=jane@example.com",
      email: "jane@example.com",
      name: "Jane Smith",
      role: "volunteer",
      status: "blocked",
      lastActive: "2023-04-20T14:15:00Z",
    },
    {
      id: "user-3",
      avatar: "https://i.pravatar.cc/150?u=bob@example.com",
      email: "bob@example.com",
      name: "Bob Johnson",
      role: "admin",
      status: "active",
      lastActive: "2023-05-17T08:45:00Z",
    },
    {
      id: "user-4",
      avatar: "https://i.pravatar.cc/150?u=alice@example.com",
      email: "alice@example.com",
      name: "Alice Brown",
      role: "donor",
      status: "blocked",
      lastActive: "2023-03-10T16:20:00Z",
    },
    {
      id: "user-5",
      avatar: "https://i.pravatar.cc/150?u=charlie@example.com",
      email: "charlie@example.com",
      name: "Charlie Davis",
      role: "volunteer",
      status: "active",
      lastActive: "2023-05-16T11:10:00Z",
    },
    {
      id: "user-6",
      avatar: "https://i.pravatar.cc/150?u=diana@example.com",
      email: "diana@example.com",
      name: "Diana Wilson",
      role: "donor",
      status: "active",
      lastActive: "2023-05-14T09:25:00Z",
    },
    {
      id: "user-7",
      avatar: "https://i.pravatar.cc/150?u=eve@example.com",
      email: "eve@example.com",
      name: "Eve Taylor",
      role: "volunteer",
      status: "blocked",
      lastActive: "2023-02-28T13:40:00Z",
    },
    {
      id: "user-8",
      avatar: "https://i.pravatar.cc/150?u=frank@example.com",
      email: "frank@example.com",
      name: "Frank Moore",
      role: "donor",
      status: "active",
      lastActive: "2023-05-17T07:15:00Z",
    },
  ]);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const closeDropdown = () => {
    setDropdownIndex(null);
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    closeDropdown();
  };

  const updateUserRole = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    closeDropdown();
  };

  const formatLastActive = (dateString) => {
    const now = new Date();
    const lastActive = new Date(dateString);
    const diffInHours = Math.floor((now - lastActive) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    if (status === "active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const getRoleBadge = (role) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (role) {
      case "admin":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case "volunteer":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen" onClick={closeDropdown}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <div className="flex space-x-4">
            <div className="bg-white p-2 rounded-lg shadow-sm flex items-center">
              <span className="text-gray-500 mr-2">Total Users:</span>
              <span className="font-bold">{users.length}</span>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm flex items-center">
              <span className="text-gray-500 mr-2">Active:</span>
              <span className="font-bold text-green-600">
                {users.filter((u) => u.status === "active").length}
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar}
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatLastActive(user.lastActive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getRoleBadge(user.role)}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiMoreVertical className="h-5 w-5" />
                      </button>

                      {/* Dropdown menu */}
                      {dropdownIndex === index && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute z-10 mt-1 right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            <button
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => {}}
                            >
                              <FiEye className="mr-2" /> View Details
                            </button>

                            {user.status === "active" ? (
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() =>
                                  updateUserStatus(user.id, "blocked")
                                }
                              >
                                <FiUserX className="mr-2" /> Block User
                              </button>
                            ) : (
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() =>
                                  updateUserStatus(user.id, "active")
                                }
                              >
                                <FiUserCheck className="mr-2" /> Unblock User
                              </button>
                            )}

                            {user.role === "donor" && (
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() =>
                                  updateUserRole(user.id, "volunteer")
                                }
                              >
                                <FiUserPlus className="mr-2" /> Make Volunteer
                              </button>
                            )}

                            {(user.role === "donor" ||
                              user.role === "volunteer") && (
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => updateUserRole(user.id, "admin")}
                              >
                                <FiShield className="mr-2" /> Make Admin
                              </button>
                            )}
                          </div>
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
};

export default AllUsers;
