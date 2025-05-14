// src/pages/FundingPage.jsx

const FundingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-600">ফান্ডিং হিস্টরি</h1>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ফান্ড দিন
            </span>
          </button>
        </div>

        {/* Total Fund Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            মোট সংগ্রহ: <span className="text-red-600">৳ ১,২৫,০০০</span>
          </h2>
        </div>

        {/* Funding Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-4 text-left text-red-600 font-semibold">নাম</th>
                <th className="px-6 py-4 text-left text-red-600 font-semibold">পরিমাণ</th>
                <th className="px-6 py-4 text-left text-red-600 font-semibold">তারিখ</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {/* Sample Data 1 */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">আহমেদ রিয়াদ</td>
                <td className="px-6 py-4 text-green-600 font-medium">৳ ৫,০০০</td>
                <td className="px-6 py-4">১০ এপ্রিল ২০২৪</td>
              </tr>

              {/* Sample Data 2 */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">ফারহানা তাবাসসুম</td>
                <td className="px-6 py-4 text-green-600 font-medium">৳ ২,০০০</td>
                <td className="px-6 py-4">৮ এপ্রিল ২০২৪</td>
              </tr>

              {/* Sample Data 3 */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">জুবায়ের ইসলাম</td>
                <td className="px-6 py-4 text-green-600 font-medium">৳ ১০,০০০</td>
                <td className="px-6 py-4">৫ এপ্রিল ২০২৪</td>
              </tr>
            </tbody>
          </table>

          {/* Pagination (Placeholder) */}
          <div className="flex justify-center p-4 border-t">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-100 text-red-600 rounded">১</button>
              <button className="px-4 py-2 hover:bg-red-100 rounded">২</button>
              <button className="px-4 py-2 hover:bg-red-100 rounded">৩</button>
            </div>
          </div>
        </div>

        {/* Payment Modal (Hidden by default) */}
        <div className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">পেমেন্ট করুন</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">কার্ড নম্বর</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">মেয়াদ শেষ</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded" 
                    placeholder="MM/YY"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">CVC</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded" 
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">পরিমাণ</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded" 
                  placeholder="৳"
                />
              </div>

              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">
                পেমেন্ট সম্পন্ন করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;