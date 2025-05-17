import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent]   = useState("");        // শুধু শেষ পর্যন্ত রাখা
  const [errors, setErrors]     = useState({ title: "", content: "" });

  const editor = useRef(null);   // Jodit reference

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = { title: "", content: "" };
    if (!title.trim())   err.title   = "Title is required";
    if (!content.trim()) err.content = "Content is required";
    setErrors(err);
    if (err.title || err.content) return;

    console.log({ title, thumbnail, content });
    alert("Blog created!");
    setTitle(""); setThumbnail(null); setContent("");
    document.getElementById("blog-thumbnail").value = null;
    editor.current?.setEditorValue("");               // এডিটর ক্লিয়ার
  };

  const handleCancel = () => {
    setTitle(""); setThumbnail(null); setContent("");
    setErrors({ title: "", content: "" });
    document.getElementById("blog-thumbnail").value = null;
    editor.current?.setEditorValue("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Add New Blog</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter blog title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
          <input
            id="blog-thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <div className={`border rounded ${errors.content ? "border-red-500" : "border-gray-300"}`}>
            <JoditEditor
              ref={editor}
              defaultValue={content}          // value নয়
              config={{
                height: 400,
                toolbarAdaptive: false,
                buttons: ["bold","italic","underline","|","ul","ol","|","image","link","|","undo","redo"],
              }}
              onBlur={(newContent) => setContent(newContent)}  // শুধু ব্লারে স্টেট
            />
          </div>
          {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPage;
