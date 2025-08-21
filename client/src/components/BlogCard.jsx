// frontend: src/components/BlogCard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ThumbsUpIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "opacity-100" : "opacity-60"}`}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 9V5a3 3 0 00-3-3l-1 6H5a3 3 0 00-3 3v1a3 3 0 003 3h6l3.5 6 .5-6h3a3 3 0 003-3v-1a3 3 0 00-3-3h-4z"
    />
  </svg>
);

const ThumbsDownIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "opacity-100" : "opacity-60"}`}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 15v4a3 3 0 003 3l1-6h5a3 3 0 003-3v-1a3 3 0 00-3-3h-6L10.5 3 10 9H7a3 3 0 00-3 3v1a3 3 0 003 3h3z"
    />
  </svg>
);

const BlogCard = ({ blog }) => {
  const { title, description, category, images = [], _id } = blog;
  const navigate = useNavigate();
  const { axios, user } = useAppContext();

  const myId = user?._id || user?.id;

  const initiallyLikedByMe = useMemo(() => {
    if (!myId || !blog?.likes) return false;
    return blog.likes.some((id) => String(id) === String(myId));
  }, [blog?.likes, myId]);

  const initiallyDislikedByMe = useMemo(() => {
    if (!myId || !blog?.dislikes) return false;
    return blog.dislikes.some((id) => String(id) === String(myId));
  }, [blog?.dislikes, myId]);

  const [likeCount, setLikeCount] = useState(
    Array.isArray(blog.likes) ? blog.likes.length : 0
  );
  const [dislikeCount, setDislikeCount] = useState(
    Array.isArray(blog.dislikes) ? blog.dislikes.length : 0
  );
  const [likedByMe, setLikedByMe] = useState(initiallyLikedByMe);
  const [dislikedByMe, setDislikedByMe] = useState(initiallyDislikedByMe);
  const [busy, setBusy] = useState(false);

  // carousel state
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images, paused]);

  useEffect(() => {
    // reset index if images changes and index out of bounds
    if (images && index >= images.length) setIndex(0);
  }, [images, index]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to like posts");
      return navigate("/login");
    }
    try {
      setBusy(true);
      const { data } = await axios.post(`/api/blog/${_id}/like`);
      if (data.success) {
        setLikeCount(data.likeCount);
        setDislikeCount(data.dislikeCount);
        setLikedByMe(data.likedByMe);
        setDislikedByMe(false);
      } else {
        toast.error(data.message || "Failed to like");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDislike = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to dislike posts");
      return navigate("/login");
    }
    try {
      setBusy(true);
      const { data } = await axios.post(`/api/blog/${_id}/dislike`);
      if (data.success) {
        setLikeCount(data.likeCount);
        setDislikeCount(data.dislikeCount);
        setLikedByMe(false);
        setDislikedByMe(data.dislikedByMe);
      } else {
        toast.error(data.message || "Failed to dislike");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setBusy(false);
    }
  };

  const displayImage = images && images.length ? images[index] : null;

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer"
    >
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative"
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt=""
            className="aspect-video object-cover w-full"
          />
        ) : (
          <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}

        {/* small dots indicator */}
        {images && images.length > 1 && (
          <div className="absolute left-2 bottom-2 flex gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
        {category}
      </span>

      <div className="flex items-center gap-4 px-5 pt-3">
        <button
          onClick={handleLike}
          disabled={busy}
          className={`flex items-center gap-1 text-sm px-2 py-1 rounded-md border ${
            likedByMe
              ? "bg-primary/10 border-primary text-primary"
              : "border-gray-200 text-gray-600"
          } hover:scale-102 duration-150`}
        >
          <ThumbsUpIcon filled={likedByMe} />
          <span>{likeCount}</span>
        </button>

        <button
          onClick={handleDislike}
          disabled={busy}
          className={`flex items-center gap-1 text-sm px-2 py-1 rounded-md border ${
            dislikedByMe
              ? "bg-red-50 border-red-300 text-red-500"
              : "border-gray-200 text-gray-600"
          } hover:scale-102 duration-150`}
        >
          <ThumbsDownIcon filled={dislikedByMe} />
          <span>{dislikeCount}</span>
        </button>

        {likedByMe && (
          <span className="text-xs text-primary/80">Liked by you</span>
        )}
        {!likedByMe && dislikedByMe && (
          <span className="text-xs text-red-500/80">Disliked by you</span>
        )}
      </div>

      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-500">{title}</h5>
        <p
          className="mb-3 text-xs text-gray-600"
          dangerouslySetInnerHTML={{ __html: (description || "").slice(0, 80) }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
