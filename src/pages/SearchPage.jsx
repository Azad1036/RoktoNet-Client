import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import useAxiosPublic from "../hooks/useAxiosPublic";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaRegEnvelope,
  FaTint,
} from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const SearchPage = () => {
  const [selectDistrict, setSelectDistrict] = useState("");
  const axiosPublic = useAxiosPublic();
  const [donerlist, setDonerlist] = useState([]);
  // React Hook From
  const { register, handleSubmit, setValue, watch } = useForm();

  //Data fetch By upzila
  const { data, isLoading } = useQuery({
    queryKey: ["upazila"],
    queryFn: async () => {
      const res = await axios.get("/upazila.json");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // real time  store
  watch("district");

  const handleRegisterSubmit = async (fromData) => {
    const quary = {};
    // Find Quary
    if (fromData.bloodGroup) quary.bloodGroup = fromData.bloodGroup;
    if (fromData.district) quary.district = fromData.district;
    if (fromData.upazila) quary.upazila = fromData.upazila;

    // Data fecthing
    const res = await axiosPublic.get("/searchDoner", { params: quary });
    setDonerlist(res.data);
    console.log(res);
  };

  // district change value
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectDistrict(district);
    setValue("upazila", "");
  };

  //find data by district to upazilas
  const upazilas = data && selectDistrict ? data[selectDistrict] || [] : [];
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit(handleRegisterSubmit)}
        className="mx-auto max-w-4xl bg-white rounded-xl shadow-md p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Blood Group Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <select
              {...register("bloodGroup")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
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
          </div>

          {/* District Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              id="district"
              {...register("district")}
              onChange={handleDistrictChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
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
          </div>

          {/* Upazila Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upazila
            </label>
            <select
              id="upazila"
              {...register("upazila")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Search Donors
          </button>
        </div>
      </form>

      {/* Doner Card */}
      <div>
        {donerlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
            {donerlist.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
              >
                {/* Header with Blood Group */}
                <div className="bg-red-50 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <FaUser className="text-red-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {donor.name}
                    </h3>
                  </div>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <FaTint /> {donor.bloodGroup}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaRegEnvelope className="text-red-500" />
                    <span className="text-sm">{donor.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="text-sm">
                      {donor.upazila}, {donor.district}
                    </span>
                  </div>

                  <button className="w-full mt-4 bg-white border border-red-500 text-red-600 hover:bg-red-50 py-2 rounded-md flex items-center justify-center gap-2 transition-colors duration-200">
                    <FaPhone /> Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center bg-red-50 w-16 h-16 rounded-full mb-4">
              <HiOutlineExclamationCircle className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Donors Available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Currently there are no donors matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
