import { Link } from 'react-router-dom';

const BlogDetailsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Blood Donation Blogs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blog Card 1 */}
        <div className="border rounded-lg p-4 shadow-sm">
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Blog" 
            className="w-full h-40 object-cover mb-3"
          />
          <h3 className="text-lg font-semibold">Importance of Blood Donation</h3>
          <p className="text-gray-600 mb-3">Blood donation saves lives. Learn how your contribution...</p>
          <Link to="/blogs/1" className="text-red-600 hover:underline">
            Read More
          </Link>
        </div>

        {/* Blog Card 2 */}
        <div className="border rounded-lg p-4 shadow-sm">
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Blog" 
            className="w-full h-40 object-cover mb-3"
          />
          <h3 className="text-lg font-semibold">Donation Process Guide</h3>
          <p className="text-gray-600 mb-3">Step-by-step guide to blood donation process...</p>
          <Link to="/blogs/2" className="text-red-600 hover:underline">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;