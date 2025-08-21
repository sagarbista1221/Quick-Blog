// routes/blogRoutes.js
import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogsById,
  generateContent,
  getAllBlogs,
  getBlogComments,
  getBlogsById,
  togglePublish,
  toggleLike,
  toggleDislike,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// upload multiple images (field name 'images'), max 12
blogRouter.post("/add", upload.array("images", 12), auth, addBlog);
blogRouter.get("/all", getAllBlogs);

blogRouter.post("/:blogId/like", auth, toggleLike);
blogRouter.post("/:blogId/dislike", auth, toggleDislike);

blogRouter.get("/:blogId", getBlogsById);
blogRouter.post("/delete", auth, deleteBlogsById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", auth, generateContent);

export default blogRouter;
