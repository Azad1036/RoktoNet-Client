import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { FiEdit3, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: allBlog, isLoading } = useQuery({
    queryKey: ["blogView"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/content-view-blog`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleBlogStatus = async (blogId, blogStatus) => {
    await axiosSecure.patch(`/update-blog-status/${blogId}`, {
      status: blogStatus,
    });
    queryClient.invalidateQueries(["blogView"]);
  };

  const handleBlogDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/blog-delete/${id}`);

        if (res.data?.acknowledged) {
          queryClient.invalidateQueries(["blogView"]);
          Swal.fire(
            "Deleted!",
            "Your donation request has been deleted.",
            "success"
          );
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Content Management
            </h2>
            <p className="text-gray-600 mt-1">
              Manage your blog posts and content
            </p>
          </div>
          <Link
            to="/dashboard/content-management/add-blog"
            className="flex items-center px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            <FiEye className="mr-2" />
            Add New Blog
          </Link>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-full md:w-auto">
              <label
                htmlFor="filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Status
              </label>
              <select
                id="filter"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Posts</option>
                <option value="draft">Drafts</option>
                <option value="publish0">Published</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Posts
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlog.map((blog) => (
            <Link
              to={`/dashboard/blog-details/${blog._id}`}
              key={blog._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    blog.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {blog.status}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {blog.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() =>
                      handleBlogStatus(
                        blog._id,
                        blog.status === "draft" ? "publish" : "draft"
                      )
                    }
                    className={`flex items-center px-3 py-1.5 text-sm rounded-md ${
                      blog.status === "draft"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    }`}
                  >
                    {blog.status === "draft" ? (
                      <>
                        <FiEye className="mr-1.5" /> Publish
                      </>
                    ) : (
                      <>
                        <FiEyeOff className="mr-1.5" /> Unpublish
                      </>
                    )}
                  </button>

                  <Link
                    onClick={() => toast.success("This time Not Exit ")}
                    className="flex items-center px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                  >
                    <FiEdit3 className="mr-1.5" /> Edit
                  </Link>

                  <button
                    onClick={() => handleBlogDelete(blog._id)}
                    className="flex items-center px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                  >
                    <FiTrash2 className="mr-1.5" /> Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {allBlog.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No blog posts found
              </h3>
              <p className="mt-1 text-gray-500">
                Get started by creating a new blog post.
              </p>
              <div className="mt-6">
                <Link
                  to="/dashboard/content-management/add-blog"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiEye className="-ml-1 mr-2 h-5 w-5" />
                  Add New Blog
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
