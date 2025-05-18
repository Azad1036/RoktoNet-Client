import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddFundingPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userProfile/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmitFrom = async (e) => {
    e.preventDefault();
    const from = e.target;
    const totalAmount = from.number.value;
    const name = user?.displayName;
    const email = user?.email;
    const timeNow = new Date();

    const donationAmaount = {
      name,
      email,
      totalAmount,
      timeNow,
      status: "Completed"
    };

    const data = await axiosSecure.post("/donation-amount", donationAmaount);
    if (data?.data?.insertedId) {
      navigate("/fundingPage");
      toast.success("Donation Successful");
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 border border-gray-300 rounded-lg">
      {/* Informative Message */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <p className="font-medium">Note about payment methods:</p>
        <p className="mt-1">
          I am sincerely sorry that I was unable to add a payment method due to
          time constraints.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Payment Form</h2>
      <form onSubmit={handleSubmitFrom}>
        {/* Name Field - Disabled */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            defaultValue={data?.name || "Not Found"}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Email Field - Disabled */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <input
            type="email"
            defaultValue={data?.email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Amount Field - Editable */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Amount:
          </label>
          <input
            type="number"
            name="number"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}

export default AddFundingPage;
