import React from "react";
import { Link } from "react-router-dom";

const ContentManagement = () => {
  const dummyBlogs = [
    {
      id: 1,
      title: "Understanding React Hooks",
      thumbnail: "https://via.placeholder.com/150",
      status: "draft",
    },
    {
      id: 2,
      title: "Mastering JavaScript Closures",
      thumbnail: "https://via.placeholder.com/150",
      status: "published",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Content Management
          </h2>
          <Link
            to="/dashboard/content-management/add-blog"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Blog
          </Link>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="filter" className="mr-2 text-sm font-medium">
            Filter:
          </label>
          <select
            id="filter"
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Blog List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded shadow p-4 relative">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm mb-4">
                Status:{" "}
                <span className="font-medium capitalize">{blog.status}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {blog.status === "draft" ? (
                  <button className="px-3 py-1 text-sm bg-green-600 text-white rounded">
                    Publish
                  </button>
                ) : (
                  <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded">
                    Unpublish
                  </button>
                )}
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded">
                  Delete
                </button>
                <button className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
