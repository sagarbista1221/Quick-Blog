// frontend: src/pages/admin/AddBlog.jsx  (or wherever your file is)
import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // multiple images state
  const [images, setImages] = useState([]); // File[]
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const combined = [...images, ...files].slice(0, 12); // cap to 12
    setImages(combined);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    try {
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      images.forEach((img) => formData.append("images", img));

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message || "Blog added successfully");

        // reset fields
        setImages([]);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
        setIsPublished(false);
      } else {
        toast.error(data.message || "Failed to add blog");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content here...",
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Upload Images */}
        <p>Upload images (1 - 12)</p>
        <label htmlFor="images" className="block mt-2">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={assets.upload_area}
              alt="upload-area"
              className="h-16 rounded object-cover"
            />
            <div>
              <div className="text-sm text-gray-600">Click to add images</div>
              <div className="text-xs text-gray-400">
                Max 12 images, each ≤ 5MB
              </div>
            </div>
          </div>
          <input
            onChange={handleImagesChange}
            type="file"
            id="images"
            hidden
            accept="image/*"
            multiple
          />
        </label>

        {/* preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-6 gap-2 mt-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-20 w-full rounded overflow-hidden border"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Title */}
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Subtitle */}
        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        {/* Description (Quill) */}
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg relative border rounded overflow-hidden">
          <div ref={editorRef} className="min-h-[200px]"></div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}

          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-2 right-2 text-xs text-white bg-primary px-3 py-1.5 rounded hover:bg-primary/80"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        {/* Category */}
        <p className="mt-4">Blog Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Publish toggle */}
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
