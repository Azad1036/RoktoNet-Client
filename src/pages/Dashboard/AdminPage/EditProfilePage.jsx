import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const imageHostingAPi = import.meta.env.VITE_Image_Hosting_API;
const imageHostingKey = `https://api.imgbb.com/1/upload?key=${imageHostingAPi}`;

const EditProfilePage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useAuth();
  const [selectDistrict, setSelectDistrict] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: upazilaData } = useQuery({
    queryKey: ["upazila"],
    queryFn: async () => {
      const res = await axios.get("/upazila.json");
      return res.data;
    },
  });

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userProfile/${user.email}`);
      return res.data;
    },
  });

  // Set default values when userData is loaded
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("bloodGroup", userData.bloodGroup);
      setValue("district", userData.district);
      setValue("upazila", userData.upazila);
      setSelectDistrict(userData.district || "");
    }
  }, [userData, setValue]);

  const handleRegisterSubmit = async (formData) => {
    const { name, bloodGroup, district, upazila, image } = formData;

    let imageURL = userData.image;

    // Only upload if new image selected
    if (image && image.length > 0) {
      const imageFile = { image: image[0] };
      const res = await axiosPublic.post(imageHostingKey, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        imageURL = res.data.data.display_url;
      }
    }

    const updatedUser = {
      name,
      bloodGroup,
      district,
      upazila,
      image: imageURL,
    };

    const res = await axiosSecure.put(
      `/updateProfile/${user?.email}`,
      updatedUser
    );
    if (res.status === 200) {
      toast.success("Profile updated successfully!");
      navigate("/dashboard/profile"); // or your profile page
    }
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectDistrict(district);
    setValue("upazila", ""); // reset upazila selection
  };

  const upazilas =
    upazilaData && selectDistrict ? upazilaData[selectDistrict] || [] : [];

  if (userLoading) return <Loading />;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-3xl border border-gray-50">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-900">
            Update Profile
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(handleRegisterSubmit)}
          className="space-y-5"
        >
          {/* Upload Image */}
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-200 transition">
                Upload Photo
              </span>
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter full name"
                className="w-full px-4 py-2 border rounded-xl bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-2 border rounded-xl bg-gray-100 text-gray-500"
              />
            </div>
          </div>

          {/* Blood Group, District, Upazila */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Blood Group
              </label>
              <select
                {...register("bloodGroup")}
                className="w-full px-4 py-2 border rounded-xl bg-white"
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                District
              </label>
              <select
                {...register("district")}
                onChange={handleDistrictChange}
                className="w-full px-4 py-2 border rounded-xl bg-white"
              >
                <option value="">Select District</option>
                {Object.keys(upazilaData || {}).map((district) => (
                  <option key={district} value={district}>
                    {district.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Upazila
              </label>
              <select
                {...register("upazila")}
                className="w-full px-4 py-2 border rounded-xl bg-white"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
