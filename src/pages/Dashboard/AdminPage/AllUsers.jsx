import React, { useState } from "react";
import {
  FiMoreVertical,
  FiEye,
  FiUserX,
  FiUserCheck,
  FiUserPlus,
  FiShield,
} from "react-icons/fi";

export default function AllUsers() {
  /* dropdown open/close only */
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const toggleDropdown = (i) => setDropdownIndex(dropdownIndex === i ? null : i);
  const closeDropdown = () => setDropdownIndex(null);

  /* static demo users */
  const users = [
    {
      id: "user-1",
      avatar: "https://i.pravatar.cc/150?u=john@example.com",
      email: "john@example.com",
      name: "John Doe",
      role: "donor",
      status: "active",
      lastActive: "3 hours ago",
    },
    {
      id: "user-2",
      avatar: "https://i.pravatar.cc/150?u=jane@example.com",
      email: "jane@example.com",
      name: "Jane Smith",
      role: "volunteer",
      status: "blocked",
      lastActive: "12 days ago",
    },
    {
      id: "user-3",
      avatar: "https://i.pravatar.cc/150?u=bob@example.com",
      email: "bob@example.com",
      name: "Bob Johnson",
      role: "admin",
      status: "active",
      lastActive: "1 day ago",
    },
  ];

  /* badge helpers – purely for colour */
  const badge = (txt, clr) =>
    `inline-block px-2 py-1 rounded-full text-xs font-semibold ${clr}`;

  return (
    <div className="p-6 bg-gray-50 min-h-screen" onClick={closeDropdown}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">User Management</h2>

        {/* table */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs font-medium text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Last Active</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {users.map((u, i) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  {/* name + avatar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="h-10 w-10 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-gray-400 text-xs">ID: {u.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{u.lastActive}</td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        u.role === "admin"
                          ? badge("admin", "bg-purple-100 text-purple-800")
                          : u.role === "volunteer"
                          ? badge("volunteer", "bg-blue-100 text-blue-800")
                          : badge("donor", "bg-gray-100 text-gray-800")
                      }
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        u.status === "active"
                          ? badge("active", "bg-green-100 text-green-800")
                          : badge("blocked", "bg-red-100 text-red-800")
                      }
                    >
                      {u.status}
                    </span>
                  </td>

                  {/* dropdown */}
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(i);
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <FiMoreVertical />
                    </button>

                    {dropdownIndex === i && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 z-10 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                          <FiEye className="mr-2" /> View Details
                        </button>
                        <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                          {u.status === "active" ? (
                            <>
                              <FiUserX className="mr-2" /> Block User
                            </>
                          ) : (
                            <>
                              <FiUserCheck className="mr-2" /> Unblock User
                            </>
                          )}
                        </button>
                        {u.role !== "admin" && (
                          <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                            {u.role === "donor" ? (
                              <>
                                <FiUserPlus className="mr-2" /> Make Volunteer
                              </>
                            ) : (
                              <>
                                <FiShield className="mr-2" /> Make Admin
                              </>
                            )}
                          </button>
                        )}
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
  );
}
