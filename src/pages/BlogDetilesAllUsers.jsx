import { FiArrowLeft, FiCalendar, FiEye, FiTag } from "react-icons/fi";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";

const BlogDetilesAllUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blog-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Error Loading Blog
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto pt-6 px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to All Blogs
        </button>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              <span>{moment(blog.createdAt).format("MMMM D, YYYY")}</span>
            </div>
            <div className="flex items-center">
              <FiEye className="mr-2" />
              <span>{blog.views || 0} views</span>
            </div>
            {blog.status && (
              <div className="flex items-center">
                <FiTag className="mr-2" />
                <span className="capitalize">{blog.status}</span>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose max-w-none prose-lg">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetilesAllUsers;
