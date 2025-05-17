import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiDroplet,
  FiCalendar,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreateDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const { user } = useAuth();
  const [selectDistrict, setSelectDistrict] = useState("");
  const { reqId } = useParams();
  const navigate = useNavigate();

  // User
  const { refetch, data, isLoading } = useQuery({
    queryKey: ["updateProfile", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/edit-request/${reqId}`);
      return res.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Upazila
  const { data: upazilaData, isLoading: upazilaLoading } = useQuery({
    queryKey: ["upazila"],
    queryFn: async () => {
      const res = await axios.get("/upazila.json");
      return res.data;
    },
  });

  // Create Donation Request
  const CreateDonationRequest = async (data) => {
    const createDontion = await axiosSecure.put(
      `/update-donation-requests/${reqId}`,
      data
    );

    if (createDontion.data.acknowledged) {
      toast.success("Update Donation Request Successfull");
      navigate("/dashboard/my-donation-requests");
    }
    reset();
  };

  // real time  store
  watch("district");

  // district change value
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectDistrict(district);
    setValue("upazila", "");
  };

  const upazilas =
    upazilaData && selectDistrict ? upazilaData[selectDistrict] || [] : [];

  // loading
  if (isLoading) return <Loading />;
  if (upazilaLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 bg-clip-text  bg-gradient-to-r from-red-600 to-red-400">
            Update Blood Donation Request
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSubmit(CreateDonationRequest)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue={data.recipientName}
                    {...register("recipientName")}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter recipient name"
                  />
                  <FiUser
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    {...register("bloodGroup")}
                    defaultValue={data.bloodGroup}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none transition-all duration-200"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  <FiDroplet
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District
                </label>
                <div className="relative">
                  <select
                    {...register("district")}
                    defaultValue={data.district}
                    onChange={handleDistrictChange}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none transition-all duration-200"
                  >
                    <option value="">Select District</option>
                    <option value="Bagerhat">Bagerhat</option>
                    <option value="Bandarban">Bandarban</option>
                    <option value="Barguna">Barguna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Bhola">Bhola</option>
                    <option value="Bogura">Bogura</option>
                    <option value="Brahmanbaria">Brahmanbaria</option>
                    <option value="Chandpur">Chandpur</option>
                    <option value="Chapai_Nawabganj">Chapai Nawabganj</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Chuadanga">Chuadanga</option>
                    <option value="Coxs_Bazar">Cox's Bazar</option>
                    <option value="Cumilla">Cumilla</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Dinajpur">Dinajpur</option>
                    <option value="Faridpur">Faridpur</option>
                    <option value="Feni">Feni</option>
                    <option value="Gaibandha">Gaibandha</option>
                    <option value="Gazipur">Gazipur</option>
                    <option value="Gopalganj">Gopalganj</option>
                    <option value="Habiganj">Habiganj</option>
                    <option value="Jamalpur">Jamalpur</option>
                    <option value="Jashore">Jashore</option>
                    <option value="Jhalokati">Jhalokati</option>
                    <option value="Jhenaidah">Jhenaidah</option>
                    <option value="Joypurhat">Joypurhat</option>
                    <option value="Khagrachhari">Khagrachhari</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Kishoreganj">Kishoreganj</option>
                    <option value="Kurigram">Kurigram</option>
                    <option value="Kushtia">Kushtia</option>
                    <option value="Lakshmipur">Lakshmipur</option>
                    <option value="Lalmonirhat">Lalmonirhat</option>
                    <option value="Madaripur">Madaripur</option>
                    <option value="Magura">Magura</option>
                    <option value="Manikganj">Manikganj</option>
                    <option value="Meherpur">Meherpur</option>
                    <option value="Moulvibazar">Moulvibazar</option>
                    <option value="Munshiganj">Munshiganj</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Naogaon">Naogaon</option>
                    <option value="Narail">Narail</option>
                    <option value="Narayanganj">Narayanganj</option>
                    <option value="Narsingdi">Narsingdi</option>
                    <option value="Natore">Natore</option>
                    <option value="Netrokona">Netrokona</option>
                    <option value="Nilphamari">Nilphamari</option>
                    <option value="Noakhali">Noakhali</option>
                    <option value="Pabna">Pabna</option>
                    <option value="Panchagarh">Panchagarh</option>
                    <option value="Patuakhali">Patuakhali</option>
                    <option value="Pirojpur">Pirojpur</option>
                    <option value="Rajbari">Rajbari</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Rangamati">Rangamati</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Satkhira">Satkhira</option>
                    <option value="Shariatpur">Shariatpur</option>
                    <option value="Sherpur">Sherpur</option>
                    <option value="Sirajganj">Sirajganj</option>
                    <option value="Sunamganj">Sunamganj</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Tangail">Tangail</option>
                    <option value="Thakurgaon">Thakurgaon</option>
                  </select>
                  <FiMapPin
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upazila
                </label>
                <div className="relative">
                  <select
                    {...register("upazila")}
                    defaultValue={data.upazila}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none transition-all duration-200"
                  >
                    <option value="">Select Upazila</option>
                    {upazilas.map((upazila) => (
                      <option key={upazila} value={upazila}>
                        {upazila}
                      </option>
                    ))}
                  </select>
                  <FiMapPin
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hospital Name
                </label>
                <div className="relative">
                  <input
                    {...register("hospitalName")}
                    defaultValue={data.hospitalName}
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter hospital name"
                  />
                  <FiMapPin
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Address
                </label>
                <div className="relative">
                  <input
                    {...register("fullAddress")}
                    defaultValue={data.fullAddress}
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter full address"
                  />
                  <FiMapPin
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Date
                </label>
                <div className="relative">
                  <input
                    {...register("donationDate")}
                    defaultValue={data.donationDate}
                    type="date"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                  <FiCalendar
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Time
                </label>
                <div className="relative">
                  <input
                    {...register("donationTime")}
                    defaultValue={data.donationTime}
                    type="time"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                  <FiClock
                    className="absolute left-3 top-3.5 text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Request Message
              </label>
              <div className="relative">
                <textarea
                  {...register("requestMessage")}
                  defaultValue={data.requestMessage}
                  rows={4}
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Explain why you need blood donation..."
                ></textarea>
                <FiMessageSquare
                  className="absolute left-3 top-3.5 text-red-500"
                  size={20}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
