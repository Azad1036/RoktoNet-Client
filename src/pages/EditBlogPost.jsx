import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const imageHostingAPi = import.meta.env.VITE_Image_Hosting_API;
const imageHostingKey = `https://api.imgbb.com/1/upload?key=${imageHostingAPi}`;

export default function EditBlogPosts() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const editorRef = useRef(null);

  const onSubmit = async (data) => {
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHostingKey, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const addBlogPost = {
      ...data,
      status: "draft",
      image: res.data.data.display_url,
    };

    const response = await axiosSecure.post("/blog-post", addBlogPost);
    if (response?.data?.insertedId) {
      navigate(-1);
      reset();
    }
    toast.success("Blog Post Successful");

    editorRef.current?.setEditorValue("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            {...register("title", { required: "Title is required" })}
            className={`w-full px-4 py-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <div
            className={`border rounded ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
          >
            <JoditEditor
              ref={editorRef}
              config={{ height: 400 }}
              onBlur={(newContent) => setValue("content", newContent)}
            />
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              reset();
              editorRef.current?.setEditorValue("");
            }}
            className="px-6 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
}
