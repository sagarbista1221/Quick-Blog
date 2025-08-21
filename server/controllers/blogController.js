// controllers/blogController.js
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import Subscriber from "../models/subscriberModel.js";
import nodemailer from "nodemailer";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    // blog JSON payload
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog || "{}"
    );

    // multer array of files
    const imageFiles = req.files;

    if (
      !title ||
      !description ||
      !category ||
      !imageFiles ||
      imageFiles.length === 0
    ) {
      return res.json({
        success: false,
        message: "Missing required fields or images",
      });
    }

    // limit number of images (optional)
    const MAX_IMAGES = 12;
    if (imageFiles.length > MAX_IMAGES) {
      return res.json({
        success: false,
        message: `Max ${MAX_IMAGES} images allowed`,
      });
    }

    const images = [];

    // upload each file to ImageKit and build optimized URL
    for (const file of imageFiles) {
      const fileBuffer = fs.readFileSync(file.path);

      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: file.originalname,
        folder: "/blogs",
      });

      const optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      images.push(optimizedImageUrl);

      // cleanup temp file
      try {
        fs.unlinkSync(file.path);
      } catch (err) {
        console.warn("Temp file delete failed:", file.path, err.message);
      }
    }

    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      images,
      isPublished,
      // likes/dislikes default to []
    });

    // send if published
    if (isPublished) {
      sendBlogToSubscribers(newBlog);
    }

    return res.json({
      success: true,
      message: "Blog added successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Blog Creation Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Send blog to all subscribers (uses the first image if available)
const sendBlogToSubscribers = async (blog) => {
  try {
    const subscribers = await Subscriber.find();
    if (subscribers.length === 0) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const firstImage = blog.images && blog.images.length ? blog.images[0] : "";

    const mailOptionsBase = {
      from: `"QuickBlog" <${process.env.SMTP_USER}>`,
      subject: `📰 New Blog: ${blog.title}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>${blog.title}</h2>
          ${blog.subTitle ? `<h4>${blog.subTitle}</h4>` : ""}
          ${
            firstImage
              ? `<img src="${firstImage}" alt="blog image" style="width:100%; max-width:600px; border-radius:8px;" />`
              : ""
          }
          <p>${(blog.description || "").slice(0, 200)}...</p>
          <p><a href="https://yourdomain.com/blogs/${
            blog._id
          }" target="_blank" style="color:#2563EB;">Read Full Blog</a></p>
        </div>
      `,
    };

    for (let subscriber of subscribers) {
      await transporter.sendMail({
        ...mailOptionsBase,
        to: subscriber.email,
      });
    }

    console.log("Blog sent to all subscribers.");
  } catch (error) {
    console.error("Failed to send blog to subscribers:", error.message);
  }
};

// ----------------------
// Existing controllers (unchanged except they will now return images array)
// ----------------------
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogsById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogsById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing blog id" });
    }

    // Ensure blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Delete comments that belong to this blog
    try {
      await Comment.deleteMany({ blog: id });
    } catch (commentErr) {
      console.warn(
        "Failed to delete comments for blog",
        id,
        commentErr.message
      );
      // continue deletion even if comments deletion had issue
    }

    // Delete the blog itself
    await Blog.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Blog and its comments deleted successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();

    if (blog.isPublished) {
      sendBlogToSubscribers(blog);
    }

    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Like/dislike handlers unchanged
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId =
      req.userId || req?.user?._id || req?.admin?.id || req?.admin?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in token",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    const userIdStr = String(userId);
    const liked = blog.likes.some((id) => String(id) === userIdStr);
    const disliked = blog.dislikes.some((id) => String(id) === userIdStr);

    if (liked) {
      blog.likes = blog.likes.filter((id) => String(id) !== userIdStr);
    } else {
      blog.likes.push(userId);
      if (disliked) {
        blog.dislikes = blog.dislikes.filter((id) => String(id) !== userIdStr);
      }
    }

    await blog.save();

    return res.json({
      success: true,
      blog,
      likeCount: blog.likes.length,
      dislikeCount: blog.dislikes.length,
      likedByMe: !liked,
      dislikedByMe: false,
      message: liked ? "Like removed" : "Liked",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const toggleDislike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId =
      req.userId || req?.user?._id || req?.admin?.id || req?.admin?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in token",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    const userIdStr = String(userId);
    const liked = blog.likes.some((id) => String(id) === userIdStr);
    const disliked = blog.dislikes.some((id) => String(id) === userIdStr);

    if (disliked) {
      blog.dislikes = blog.dislikes.filter((id) => String(id) !== userIdStr);
    } else {
      blog.dislikes.push(userId);
      if (liked) {
        blog.likes = blog.likes.filter((id) => String(id) !== userIdStr);
      }
    }

    await blog.save();

    return res.json({
      success: true,
      blog,
      likeCount: blog.likes.length,
      dislikeCount: blog.dislikes.length,
      likedByMe: false,
      dislikedByMe: !disliked,
      message: disliked ? "Dislike removed" : "Disliked",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
