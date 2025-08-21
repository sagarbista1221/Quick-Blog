<<<<<<< HEAD
// // frontend: src/pages/Blog.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
// import Navbar from "../components/Navbar";
// import Moment from "moment";
// import Footer from "../components/Footer";
// import Loader from "../components/Loader";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const ThumbsUpIcon = ({ filled }) => (
//   <svg
//     className={`w-5 h-5 ${filled ? "opacity-100" : "opacity-60"}`}
//     viewBox="0 0 24 24"
//     fill={filled ? "currentColor" : "none"}
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M14 9V5a3 3 0 00-3-3l-1 6H5a3 3 0 00-3 3v1a3 3 0 003 3h6l3.5 6 .5-6h3a3 3 0 003-3v-1a3 3 0 00-3-3h-4z"
//     />
//   </svg>
// );

// const ThumbsDownIcon = ({ filled }) => (
//   <svg
//     className={`w-5 h-5 ${filled ? "opacity-100" : "opacity-60"}`}
//     viewBox="0 0 24 24"
//     fill={filled ? "currentColor" : "none"}
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10 15v4a3 3 0 003 3l1-6h5a3 3 0 003-3v-1a3 3 0 00-3-3h-6L10.5 3 10 9H7a3 3 0 00-3 3v1a3 3 0 003 3h3z"
//     />
//   </svg>
// );

// const Blog = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { axios, user } = useAppContext(); // get logged-in user info

//   const [data, setData] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [name, setName] = useState(user?.name || ""); // auto-fill if logged in
//   const [content, setContent] = useState("");

//   // Like/Dislike UI state
//   const myId = user?._id || user?.id;
//   const [likeCount, setLikeCount] = useState(0);
//   const [dislikeCount, setDislikeCount] = useState(0);
//   const [likedByMe, setLikedByMe] = useState(false);
//   const [dislikedByMe, setDislikedByMe] = useState(false);
//   const [busy, setBusy] = useState(false);

//   // gallery state
//   const [index, setIndex] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const autoplayRef = useRef(null);

//   const computeInitialReactions = (blog) => {
//     const likesArr = Array.isArray(blog?.likes) ? blog.likes : [];
//     const dislikesArr = Array.isArray(blog?.dislikes) ? blog.dislikes : [];
//     setLikeCount(likesArr.length);
//     setDislikeCount(dislikesArr.length);
//     if (myId) {
//       const liked = likesArr.some((uid) => String(uid) === String(myId));
//       const disliked = dislikesArr.some((uid) => String(uid) === String(myId));
//       setLikedByMe(liked);
//       setDislikedByMe(disliked);
//     } else {
//       setLikedByMe(false);
//       setDislikedByMe(false);
//     }
//   };

//   const fetchBlogData = async () => {
//     try {
//       const { data } = await axios.get(`/api/blog/${id}`);
//       if (data.success) {
//         setData(data.blog);
//         computeInitialReactions(data.blog);
//         setIndex(0); // reset gallery index
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const { data } = await axios.post("/api/blog/comments", { blogId: id });
//       if (data.success) {
//         setComments(data.comments);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const addComment = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       toast.error("You must be logged in to comment");
//       navigate("/login");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/api/blog/add-comment", {
//         blog: id,
//         name,
//         content,
//       });

//       if (data.success) {
//         toast.success(data.message);
//         setContent(""); // clear comment textarea
//         fetchComments(); // refresh comments after adding
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleLike = async () => {
//     if (!user) {
//       toast.error("Please login to like posts");
//       return navigate("/login");
//     }
//     try {
//       setBusy(true);
//       const { data } = await axios.post(`/api/blog/${id}/like`);
//       if (data.success) {
//         setLikeCount(data.likeCount);
//         setDislikeCount(data.dislikeCount);
//         setLikedByMe(data.likedByMe);
//         setDislikedByMe(false);
//       } else {
//         toast.error(data.message || "Failed to like");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     } finally {
//       setBusy(false);
//     }
//   };

//   const handleDislike = async () => {
//     if (!user) {
//       toast.error("Please login to dislike posts");
//       return navigate("/login");
//     }
//     try {
//       setBusy(true);
//       const { data } = await axios.post(`/api/blog/${id}/dislike`);
//       if (data.success) {
//         setLikeCount(data.likeCount);
//         setDislikeCount(data.dislikeCount);
//         setLikedByMe(false);
//         setDislikedByMe(data.dislikedByMe);
//       } else {
//         toast.error(data.message || "Failed to dislike");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     } finally {
//       setBusy(false);
//     }
//   };

//   // Gallery autoplay
//   useEffect(() => {
//     if (!data || !Array.isArray(data.images) || data.images.length <= 1) return;
//     if (paused) return;

//     autoplayRef.current = setInterval(() => {
//       setIndex((prev) => (prev + 1) % data.images.length);
//     }, 3000);

//     return () => clearInterval(autoplayRef.current);
//   }, [data, paused]);

//   useEffect(() => {
//     // make sure index in bounds whenever data changes
//     if (!data || !Array.isArray(data.images)) {
//       setIndex(0);
//     } else if (index >= data.images.length) {
//       setIndex(0);
//     }
//   }, [data, index]);

//   useEffect(() => {
//     fetchBlogData();
//     fetchComments();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const goPrev = (e) => {
//     e.stopPropagation();
//     if (!data || !data.images || data.images.length === 0) return;
//     setIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
//   };

//   const goNext = (e) => {
//     e.stopPropagation();
//     if (!data || !data.images || data.images.length === 0) return;
//     setIndex((prev) => (prev + 1) % data.images.length);
//   };

//   return data ? (
//     <div className="relative">
//       <Navbar />
//       <div className="text-center mt-20 text-gray-600">
//         <p className="text-primary py-4 font-medium">
//           Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
//         </p>
//         <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-500">
//           {data.title}
//         </h1>
//         <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
//         <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
//           Admin
//         </p>

//         {/* Likes/Dislikes */}
//         <div className="flex items-center justify-center gap-4 mt-2">
//           <button
//             onClick={handleLike}
//             disabled={busy}
//             className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border ${
//               likedByMe
//                 ? "bg-primary/10 border-primary text-primary"
//                 : "border-gray-200 text-gray-600"
//             } hover:scale-102 duration-150`}
//           >
//             <ThumbsUpIcon filled={likedByMe} />
//             <span>{likeCount}</span>
//           </button>

//           <button
//             onClick={handleDislike}
//             disabled={busy}
//             className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border ${
//               dislikedByMe
//                 ? "bg-red-50 border-red-300 text-red-500"
//                 : "border-gray-200 text-gray-600"
//             } hover:scale-102 duration-150`}
//           >
//             <ThumbsDownIcon filled={dislikedByMe} />
//             <span>{dislikeCount}</span>
//           </button>

//           {likedByMe && (
//             <span className="text-xs text-primary/80">Liked by you</span>
//           )}
//           {!likedByMe && dislikedByMe && (
//             <span className="text-xs text-red-500/80">Disliked by you</span>
//           )}
//         </div>
//       </div>

//       <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
//         {/* Gallery */}
//         <div
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//           className="relative rounded-3xl mb-5"
//         >
//           <div className="w-full aspect-video bg-gray-100 flex items-center justify-center overflow-hidden rounded-3xl">
//             {Array.isArray(data.images) && data.images.length > 0 ? (
//               <img
//                 src={data.images[index]}
//                 alt={`slide-${index}`}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="text-gray-400">No images</div>
//             )}
//           </div>

//           {/* left/right arrows */}
//           {Array.isArray(data.images) && data.images.length > 1 && (
//             <>
//               <button
//                 onClick={goPrev}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
//                 aria-label="previous"
//               >
//                 ‹
//               </button>
//               <button
//                 onClick={goNext}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
//                 aria-label="next"
//               >
//                 ›
//               </button>
//             </>
//           )}

//           {/* thumbnails */}
//           {Array.isArray(data.images) && data.images.length > 1 && (
//             <div className="mt-3 flex gap-2 overflow-x-auto">
//               {data.images.map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setIndex(i);
//                   }}
//                   className={`flex-shrink-0 rounded overflow-hidden border ${
//                     i === index ? "ring-2 ring-primary" : ""
//                   }`}
//                   style={{ width: 84, height: 56 }}
//                 >
//                   <img
//                     src={img}
//                     alt={`thumb-${i}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         <div
//           className="rich-text max-w-3xl mx-auto"
//           dangerouslySetInnerHTML={{ __html: data.description }}
//         ></div>

//         {/* Comments Section */}
//         <div className="mt-14 mb-10 max-w-3xl mx-auto">
//           <p className="font-semibold mb-4">Comments ({comments.length})</p>
//           <div className="flex flex-col gap-4">
//             {comments.map((item, index) => (
//               <div
//                 key={index}
//                 className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <img src={assets.user_icon} alt="" className="w-6" />
//                   <p className="font-medium">{item.name}</p>
//                 </div>
//                 <p className="text-sm max-w-md ml-8">{item.content}</p>
//                 <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
//                   {Moment(item.createdAt).fromNow()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Add comment section */}
//         <div className="max-w-3xl mx-auto">
//           <p className="font-semibold mb-4">Add your comment</p>
//           <form
//             onSubmit={addComment}
//             className="flex flex-col items-start gap-4 max-w-lg"
//           >
//             <input
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               type="text"
//               placeholder="Name"
//               required
//               className="w-full p-2 border border-gray-300 rounded outline-none"
//               readOnly={!!user} // make read-only if user is logged in
//             />
//             <textarea
//               onChange={(e) => setContent(e.target.value)}
//               value={content}
//               placeholder="Comment"
//               className="w-full p-2 border border-gray-300 rounded outline-none h-48"
//               required
//             ></textarea>
//             <button
//               type="submit"
//               className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
//             >
//               Submit
//             </button>
//           </form>
//         </div>

//         {/* Share buttons */}
//         <div className="my-24 max-w-3xl mx-auto">
//           <p className="font-semibold my-4">
//             Share this article on social media
//           </p>
//           <div className="flex gap-4">
//             <img
//               src={assets.facebook_icon}
//               width={50}
//               alt="Share on Facebook"
//               className="cursor-pointer"
//               onClick={() =>
//                 window.open(
//                   `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                     window.location.href
//                   )}&text=${encodeURIComponent(data.title)}`,
//                   "_blank"
//                 )
//               }
//             />
//             <img
//               src={assets.twitter_icon}
//               width={50}
//               alt="Share on Twitter"
//               className="cursor-pointer"
//               onClick={() =>
//                 window.open(
//                   `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//                     window.location.href
//                   )}&text=${encodeURIComponent(data.title)}`,
//                   "_blank"
//                 )
//               }
//             />
//             <img
//               src={assets.linkedin_icon}
//               width={50}
//               alt="Share on LinkedIn"
//               className="cursor-pointer"
//               onClick={() =>
//                 window.open(
//                   `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//                     window.location.href
//                   )}`,
//                   "_blank"
//                 )
//               }
//             />
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   ) : (
//     <Loader />
//   );
// };

// export default Blog;

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
=======
// frontend: src/pages/Blog.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
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

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const location = useLocation();
  const { axios, user } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState(user?.name || "");
  const [content, setContent] = useState("");

=======
  const { axios, user } = useAppContext(); // get logged-in user info

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState(user?.name || ""); // auto-fill if logged in
  const [content, setContent] = useState("");

  // Like/Dislike UI state
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
  const myId = user?._id || user?.id;
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [likedByMe, setLikedByMe] = useState(false);
  const [dislikedByMe, setDislikedByMe] = useState(false);
  const [busy, setBusy] = useState(false);

<<<<<<< HEAD
=======
  // gallery state
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplayRef = useRef(null);

  const computeInitialReactions = (blog) => {
    const likesArr = Array.isArray(blog?.likes) ? blog.likes : [];
    const dislikesArr = Array.isArray(blog?.dislikes) ? blog.dislikes : [];
    setLikeCount(likesArr.length);
    setDislikeCount(dislikesArr.length);
    if (myId) {
      const liked = likesArr.some((uid) => String(uid) === String(myId));
      const disliked = dislikesArr.some((uid) => String(uid) === String(myId));
      setLikedByMe(liked);
      setDislikedByMe(disliked);
    } else {
      setLikedByMe(false);
      setDislikedByMe(false);
    }
  };

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setData(data.blog);
        computeInitialReactions(data.blog);
<<<<<<< HEAD
        setIndex(0);
=======
        setIndex(0); // reset gallery index
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!user) {
      toast.error("You must be logged in to comment");
      navigate("/login", { state: { from: location } }); // ✅ pass redirect info
      return;
    }
=======

    if (!user) {
      toast.error("You must be logged in to comment");
      navigate("/login");
      return;
    }

>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
<<<<<<< HEAD
        setContent("");
        fetchComments();
=======
        setContent(""); // clear comment textarea
        fetchComments(); // refresh comments after adding
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like posts");
<<<<<<< HEAD
      return navigate("/login", { state: { from: location } }); // ✅ redirect
=======
      return navigate("/login");
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
    }
    try {
      setBusy(true);
      const { data } = await axios.post(`/api/blog/${id}/like`);
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

  const handleDislike = async () => {
    if (!user) {
      toast.error("Please login to dislike posts");
<<<<<<< HEAD
      return navigate("/login", { state: { from: location } }); // ✅ redirect
=======
      return navigate("/login");
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
    }
    try {
      setBusy(true);
      const { data } = await axios.post(`/api/blog/${id}/dislike`);
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

<<<<<<< HEAD
  // gallery autoplay
  useEffect(() => {
    if (!data || !Array.isArray(data.images) || data.images.length <= 1) return;
    if (paused) return;
    autoplayRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.images.length);
    }, 3000);
=======
  // Gallery autoplay
  useEffect(() => {
    if (!data || !Array.isArray(data.images) || data.images.length <= 1) return;
    if (paused) return;

    autoplayRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.images.length);
    }, 3000);

>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
    return () => clearInterval(autoplayRef.current);
  }, [data, paused]);

  useEffect(() => {
<<<<<<< HEAD
=======
    // make sure index in bounds whenever data changes
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
    if (!data || !Array.isArray(data.images)) {
      setIndex(0);
    } else if (index >= data.images.length) {
      setIndex(0);
    }
  }, [data, index]);

  useEffect(() => {
    fetchBlogData();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const goPrev = (e) => {
    e.stopPropagation();
    if (!data || !data.images || data.images.length === 0) return;
    setIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    if (!data || !data.images || data.images.length === 0) return;
    setIndex((prev) => (prev + 1) % data.images.length);
  };

  return data ? (
    <div className="relative">
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-500">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Admin
        </p>

        {/* Likes/Dislikes */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={handleLike}
            disabled={busy}
            className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border ${
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
            className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border ${
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
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        {/* Gallery */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative rounded-3xl mb-5"
        >
          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center overflow-hidden rounded-3xl">
            {Array.isArray(data.images) && data.images.length > 0 ? (
              <img
                src={data.images[index]}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">No images</div>
            )}
          </div>

          {/* left/right arrows */}
          {Array.isArray(data.images) && data.images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                aria-label="previous"
              >
                ‹
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                aria-label="next"
              >
                ›
              </button>
            </>
          )}

          {/* thumbnails */}
          {Array.isArray(data.images) && data.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {data.images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={`flex-shrink-0 rounded overflow-hidden border ${
                    i === index ? "ring-2 ring-primary" : ""
                  }`}
                  style={{ width: 84, height: 56 }}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add comment section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
              readOnly={!!user} // make read-only if user is logged in
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share buttons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <img
              src={assets.facebook_icon}
              width={50}
              alt="Share on Facebook"
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent(data.title)}`,
                  "_blank"
                )
              }
            />
            <img
              src={assets.twitter_icon}
              width={50}
              alt="Share on Twitter"
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent(data.title)}`,
                  "_blank"
                )
              }
            />
            <img
              src={assets.linkedin_icon}
              width={50}
              alt="Share on LinkedIn"
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    window.location.href
                  )}`,
                  "_blank"
                )
              }
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
