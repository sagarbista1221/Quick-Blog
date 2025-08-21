// // server/routes/adminRoutes.js
// import express from "express";
// import {
//   adminLogin,
//   registerAdmin,
//   approveCommentById,
//   deleteCommentsById,
//   getAllBlogsAdmin,
//   getAllComments,
//   getDashboard,
//   getAllAdmins,
//   deleteAdminById,
// } from "../controllers/adminController.js";
// import auth from "../middleware/auth.js";

// const adminRouter = express.Router();

// // Public routes
// adminRouter.post("/register", registerAdmin);
// adminRouter.post("/login", adminLogin);

// // Protected admin routes (require auth middleware)
// adminRouter.get("/list", auth, getAllAdmins);
// adminRouter.delete("/delete/:id", auth, deleteAdminById);

// adminRouter.get("/comments", auth, getAllComments);
// adminRouter.post("/delete-comment", auth, deleteCommentsById);
// adminRouter.post("/approve-comment", auth, approveCommentById);

// adminRouter.get("/blogs", auth, getAllBlogsAdmin);

// adminRouter.get("/dashboard", auth, getDashboard);

// export default adminRouter;

// server/routes/adminRoutes.js
import express from "express";
import {
  adminLogin,
  registerAdmin,
  approveCommentById,
  deleteCommentsById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  getAllAdmins,
  deleteAdminById,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// Public
adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", adminLogin);

// Protected (require valid token)
adminRouter.get("/list", auth, getAllAdmins);
adminRouter.delete("/delete/:id", auth, deleteAdminById);

adminRouter.get("/comments", auth, getAllComments);
adminRouter.post("/delete-comment", auth, deleteCommentsById);
adminRouter.post("/approve-comment", auth, approveCommentById);

adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;
