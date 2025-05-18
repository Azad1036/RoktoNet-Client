import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../components/Loading";

const Blog = () => {
  const axiosSecure = useAxiosSecure();
  const [filterByBlog, setFilterByBlog] = useState([]);
  const { isLoading } = useQuery({
    queryKey: ["blogView"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/content-view-blog`);
      setFilterByBlog(res.data);
    },
  });

  const publishBlog = filterByBlog.filter((blog) => blog.status === "publish");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest articles and insights from our team
          </p>
        </div>

        {/* Blog List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishBlog.map((blog) => (
            <Link
              to={`/blog/blog-detiles/${blog._id}`}
              key={blog._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {blog.status}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <FiEye className="mr-1" />
                  <span>Read more</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filterByBlog.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center max-w-3xl mx-auto">
            <div className="mx-auto max-w-md">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
                <FiEye className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-2xl font-medium text-gray-900">
                No blog posts available
              </h3>
              <p className="mt-2 text-gray-500">
                There are currently no published blog posts to display.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
