import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const imageHostingAPi = import.meta.env.VITE_Image_Hosting_API;
const imageHostingKey = `https://api.imgbb.com/1/upload?key=${imageHostingAPi}`;

const Register = () => {
  // React Hook From
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  // Store district
  const [selectDistrict, setSelectDistrict] = useState("");

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // User Create Auth
  const { createNewUser, setUser } = useAuth();

  //Data fetch By upzila
  const { data, isLoading } = useQuery({
    queryKey: ["upazila"],
    queryFn: async () => {
      const res = await axios.get("/upazila.json");
      return res.data;
    },
  });

  // From Input By Usre
  const handleRegisterSubmit = async (fromData) => {
    const { name, email, bloodGroup, district, upazila } = fromData;
    // image upload to imgbb and then get an url
    const imageFile = { image: fromData.image[0] };
    const res = await axiosPublic.post(imageHostingKey, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const userRegister = {
        name,
        email,
        bloodGroup,
        district,
        upazila,
        role: "donor",
        status: "active",
        image: res.data.data.display_url,
      };
      // // User Register By Firebase
      createNewUser(fromData.email, fromData.password)
        .then(async (result) => {
          const user = result.user;
          setUser(user);
          // User Register By DB
          const data = await axiosPublic.post("/users", userRegister);
          console.log(data);
          if (data?.data?.insertedId) {
            navigate("/");
            reset();
          }
          toast.success("Register Successful");
        })
        // Firebase Error
        .catch((err) => {
          {
            err && toast.error("Register failed try again");
          }
        });
    }
  };

  if (isLoading) {
    <Loading />;
  }

  // real time  store
  watch("district");
  const password = watch("password");

  // district change value
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectDistrict(district);
    setValue("upazila", "");
  };

  //find data by district to upazilas
  const upazilas = data && selectDistrict ? data[selectDistrict] || [] : [];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-3xl border border-gray-50 transition-all hover:shadow-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-2 tracking-tight">
            Complete Registration
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Fill in your details to get started
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegisterSubmit)}
          className="space-y-4 sm:space-y-5"
        >
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <label className="cursor-pointer">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-indigo-200 transition-all duration-300 shadow-sm">
                Upload Photo
              </span>
              <input
                {...register("image", { required: "This is requried" })}
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
              />
            </label>
            <p className="text-red-500 text-sm mt-1">{errors.image?.message}</p>
          </div>

          {/* Personal Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className=" text-xs sm:text-sm font-semibold text-gray-700 mb-1 flex items-center"
              >
                <i className="fas fa-user mr-1.5 sm:mr-2 text-indigo-500"></i>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "This is requried",
                  minLength: {
                    value: 3,
                    message: "Name Must 3 Character",
                  },
                })}
                placeholder="Enter your full name"
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                title="Enter your full name"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.name?.message}
              </p>
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className=" text-xs sm:text-sm font-semibold text-gray-700 mb-1 flex items-center"
              >
                <i className="fas fa-envelope mr-1.5 sm:mr-2 text-indigo-500"></i>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "This is requried",
                })}
                placeholder="Enter your email"
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                title="Enter a valid email address"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>
          </div>

          {/* Blood and Location Section */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100 mt-3 sm:mt-4">
            <h2 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2 sm:mb-3">
              Blood Group & Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Blood Group */}
              <div>
                <label
                  htmlFor="bloodGroup"
                  className=" text-xs sm:text-sm font-semibold text-gray-700 mb-1 flex items-center"
                >
                  <i className="fas fa-tint mr-1.5 sm:mr-2 text-indigo-500"></i>
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  {...register("bloodGroup")}
                  className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  title="Select your blood group"
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

              {/* District */}
              <div>
                <label
                  htmlFor="district"
                  className=" text-xs sm:text-sm font-semibold text-gray-700 mb-1 flex items-center"
                >
                  <i className="fas fa-map-marker-alt mr-1.5 sm:mr-2 text-indigo-500"></i>
                  District
                </label>
                <select
                  id="district"
                  {...register("district")}
                  onChange={handleDistrictChange}
                  className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  title="Select your district"
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

              {/* Upazila */}
              <div>
                <label
                  htmlFor="upazila"
                  className=" text-xs sm:text-sm font-semibold text-gray-700 mb-1 flex items-center"
                >
                  <i className="fas fa-map-pin mr-1.5 sm:mr-2 text-indigo-500"></i>
                  Upazila
                </label>
                <select
                  id="upazila"
                  {...register("upazila")}
                  className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  title="Select your upazila"
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
          </div>

          {/*  Password Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className=" text-xs sm:text-sm font-semibold text-gray-700 mb-1 flex items-center"
              >
                <i className="fas fa-user mr-1.5 sm:mr-2 text-indigo-500"></i>
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "This is requried",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, special character",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                title="Enter your password"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>

            {/* confirmPassword */}
            <div>
              <label
                htmlFor="confirmPassword"
                className=" text-xs sm:text-sm font-semibold text-gray-700 mb-1 flex items-center"
              >
                <i className="fas fa-envelope mr-1.5 sm:mr-2 text-indigo-500"></i>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "This is requried",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                title="Re-enter your password"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>

          {/* Terms and Conditions Section */}
          <div>
            <div className="flex items-center justify-between mt-4 sm:mt-5">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  {...register("checkbox", {
                    required: "Accept Terms and Conditions",
                  })}
                  type="checkbox"
                  className="mr-2"
                />
                I agree to the{" "}
                <a href="#" className="text-indigo-600">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <p className="text-red-500 mt-1  text-sm">
              {errors.checkbox?.message}
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-6 sm:mt-8">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-semibold rounded-xl shadow-md bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
            >
              Register
            </button>
          </div>
          {/* Register Link */}
          <p className=" text-sm text-gray-500 ">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
