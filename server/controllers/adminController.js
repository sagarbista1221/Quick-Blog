// import Blog from "../models/Blog.js";
// import jwt from "jsonwebtoken";
// import Comment from "../models/Comment.js";
// import bcrypt from "bcrypt";
// import AdminModel from "../models/Admin.js"; // Make sure you have this model

// // Admin registration function
// export const registerAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if username already exists
//     const existingAdmin = await AdminModel.findOne({ username });
//     if (existingAdmin) {
//       return res.status(400).json({ error: "Username already taken" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create and save new admin
//     const newAdmin = new AdminModel({ username, password: hashedPassword });
//     await newAdmin.save();

//     res.status(201).json({ message: "Admin registered successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Admin login function
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // For now, your login checks environment variables; you may want to change this to check DB later
//     if (
//       email !== process.env.ADMIN_EMAIL ||
//       password !== process.env.ADMIN_PASSWORD
//     ) {
//       return res.json({ success: false, message: "Invalid Credentials" });
//     }
//     const token = jwt.sign({ email }, process.env.JWT_SECRET);
//     res.json({ success: true, token });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
// export const deleteAdminById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await AdminModel.findByIdAndDelete(id);

//     if (!deleted) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Admin not found" });
//     }

//     res.json({ success: true, message: "Admin deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllBlogsAdmin = async (req, res) => {
//   try {
//     const blogs = await Blog.find({}).sort({ createdAt: -1 });
//     res.json({ success: true, blogs });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
// // adminController.js
// export const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await AdminModel.find({}, "-password"); // exclude password
//     res.json({ success: true, admins });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllComments = async (req, res) => {
//   try {
//     const comments = await Comment.find({})
//       .populate("blog")
//       .sort({ createdAt: -1 });
//     res.json({ success: true, comments });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const getDashboard = async (req, res) => {
//   try {
//     const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
//     const blogs = await Blog.countDocuments();
//     const comments = await Comment.countDocuments();
//     const drafts = await Blog.countDocuments({ isPublished: false });

//     const dashboardData = {
//       blogs,
//       comments,
//       drafts,
//       recentBlogs,
//     };
//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const deleteCommentsById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await Comment.findByIdAndDelete(id);

//     // Delete all comments associated with the blog
//     await Comment.deleteMany({ blog: id });

//     res.json({ success: true, message: "Comment deleted successfully" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const approveCommentById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await Comment.findByIdAndUpdate(id, { isApproved: true });
//     res.json({ success: true, message: "Comment approved successfully" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

//gggggggggggggggggggggppppppppppppppppppppppttttttttttttt

// server/controllers/adminController.js
// import AdminModel from "../models/Admin.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import Blog from "../models/Blog.js";
// import Comment from "../models/Comment.js";

// /*
//  * Register new admin with email and password
//  * (public route — consider protecting in production)
//  */
// export const registerAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res
//         .status(400)
//         .json({ success: false, message: "Email and password required" });

//     const existingAdmin = await AdminModel.findOne({ email });
//     if (existingAdmin) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already taken" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newAdmin = new AdminModel({ email, password: hashedPassword });
//     await newAdmin.save();

//     res
//       .status(201)
//       .json({ success: true, message: "Admin registered successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /*
//  * Admin login with email & password from DB
//  */
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res
//         .status(400)
//         .json({ success: false, message: "Email and password required" });

//     const admin = await AdminModel.findOne({ email });
//     if (!admin) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: admin._id, email: admin.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /*
//  * Get all admins (exclude password)
//  */
// export const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await AdminModel.find({}, "-password -__v").sort({
//       createdAt: -1,
//     });
//     res.json({ success: true, admins });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /*
//  * Delete admin by id
//  */
// export const deleteAdminById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await AdminModel.findByIdAndDelete(id);

//     if (!deleted) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Admin not found" });
//     }

//     res.json({ success: true, message: "Admin deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /*
//  * Delete a single comment by id
//  */
// export const deleteCommentsById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id)
//       return res
//         .status(400)
//         .json({ success: false, message: "Comment id required" });

//     const deleted = await Comment.findByIdAndDelete(id);
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Comment not found" });

//     res.json({ success: true, message: "Comment deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /*
//  * Approve a comment by id
//  */
// export const approveCommentById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id)
//       return res
//         .status(400)
//         .json({ success: false, message: "Comment id required" });

//     const updated = await Comment.findByIdAndUpdate(
//       id,
//       { isApproved: true },
//       { new: true }
//     );
//     if (!updated)
//       return res
//         .status(404)
//         .json({ success: false, message: "Comment not found" });

//     res.json({
//       success: true,
//       message: "Comment approved successfully",
//       comment: updated,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /*
//  * Get all blogs for admin
//  */
// export const getAllBlogsAdmin = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json({ success: true, blogs });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /*
//  * Get all comments (optionally populate blog info)
//  */
// export const getAllComments = async (req, res) => {
//   try {
//     const comments = await Comment.find()
//       .populate("blog")
//       .sort({ createdAt: -1 });
//     res.json({ success: true, comments });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /*
//  * Dashboard stats: total blogs, total comments, total admins, recent blogs
//  */

// export const getDashboard = async (req, res) => {
//   try {
//     const totalBlogs = await Blog.countDocuments();
//     const totalComments = await Comment.countDocuments();
//     const totalAdmins = await AdminModel.countDocuments();
//     const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

//     res.json({
//       success: true,
//       dashboardData: {
//         blogs: totalBlogs,
//         comments: totalComments,
//         drafts: 0, // If you track drafts, replace with real count
//         admins: totalAdmins,
//         recentBlogs,
//       },
//     });
//   } catch (error) {
//     console.error("Dashboard error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// ggggggggggggggggggggpppppppppppttttttttttttttt

// server/controllers/adminController.js
// import AdminModel from "../models/Admin.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import Blog from "../models/Blog.js";
// import Comment from "../models/Comment.js";

// /* Register new admin */
// export const registerAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res
//         .status(400)
//         .json({ success: false, message: "Email and password required" });

//     const existingAdmin = await AdminModel.findOne({ email });
//     if (existingAdmin) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already taken" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newAdmin = new AdminModel({ email, password: hashedPassword });
//     await newAdmin.save();

//     res
//       .status(201)
//       .json({ success: true, message: "Admin registered successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* Admin login (returns token) */
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res
//         .status(400)
//         .json({ success: false, message: "Email and password required" });

//     const admin = await AdminModel.findOne({ email });
//     if (!admin)
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch)
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: admin._id, email: admin.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* Get all admins (exclude password) */
// export const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await AdminModel.find({}, "-password -__v").sort({
//       createdAt: -1,
//     });
//     res.json({ success: true, admins });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* Delete admin by id */
// export const deleteAdminById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await AdminModel.findByIdAndDelete(id);
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Admin not found" });
//     res.json({ success: true, message: "Admin deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* Delete a single comment by id */
// export const deleteCommentsById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id)
//       return res
//         .status(400)
//         .json({ success: false, message: "Comment id required" });

//     const deleted = await Comment.findByIdAndDelete(id);
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Comment not found" });

//     res.json({ success: true, message: "Comment deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* Approve a comment by id */
// export const approveCommentById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id)
//       return res
//         .status(400)
//         .json({ success: false, message: "Comment id required" });

//     const updated = await Comment.findByIdAndUpdate(
//       id,
//       { isApproved: true },
//       { new: true }
//     );
//     if (!updated)
//       return res
//         .status(404)
//         .json({ success: false, message: "Comment not found" });

//     res.json({
//       success: true,
//       message: "Comment approved successfully",
//       comment: updated,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* Get all blogs for admin */
// export const getAllBlogsAdmin = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json({ success: true, blogs });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* Get all comments (populate blog) */
// export const getAllComments = async (req, res) => {
//   try {
//     const comments = await Comment.find()
//       .populate("blog")
//       .sort({ createdAt: -1 });
//     res.json({ success: true, comments });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* Dashboard stats and recent blogs -- RETURNS dashboardData to match frontend */
// export const getDashboard = async (req, res) => {
//   try {
//     const totalBlogs = await Blog.countDocuments();
//     const totalComments = await Comment.countDocuments();
//     const totalAdmins = await AdminModel.countDocuments();
//     const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

//     res.json({
//       success: true,
//       dashboardData: {
//         blogs: totalBlogs,
//         comments: totalComments,
//         drafts: 0, // replace with real count if you track drafts (e.g., Blog.countDocuments({ isPublished: false }))
//         admins: totalAdmins,
//         recentBlogs,
//       },
//     });
//   } catch (error) {
//     console.error("Dashboard error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

//ggggggggggggggggggpppppppppppppttttttttttttttt

import AdminModel from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

/* Register new admin */
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminModel({ name, email, password: hashedPassword });
    await newAdmin.save();

    res
      .status(201)
      .json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error("Register Admin Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// /* Admin login */
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email and password required" });
//     }

//     const admin = await AdminModel.findOne({ email });
//     if (!admin) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: admin._id, email: admin.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ success: true, token });
//   } catch (error) {
//     console.error("Admin Login Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
/* Admin login */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return token AND admin user info
    res.json({
      success: true,
      data: {
        token,
        user: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: "admin",
        },
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Get all admins */
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find({}, "-password -__v").sort({
      createdAt: -1,
    });
    res.json({ success: true, admins });
  } catch (error) {
    console.error("Get Admins Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Delete admin */
export const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AdminModel.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    res.json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete Admin Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Delete comment */
export const deleteCommentsById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Comment id required" });
    }

    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Approve comment */
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Comment id required" });
    }

    const updated = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({
      success: true,
      message: "Comment approved successfully",
      comment: updated,
    });
  } catch (error) {
    console.error("Approve Comment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Get all blogs */
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    console.error("Get Blogs Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Get all comments */
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    console.error("Get Comments Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Dashboard */
// export const getDashboard = async (req, res) => {
//   try {
//     const totalBlogs = await Blog.countDocuments();
//     const totalComments = await Comment.countDocuments();
//     const totalAdmins = await AdminModel.countDocuments();
//     const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

//     res.json({
//       success: true,
//       dashboardData: {
//         blogs: totalBlogs,
//         comments: totalComments,
//         drafts: 0,
//         admins: totalAdmins,
//         recentBlogs,
//       },
//     });
//   } catch (error) {
//     console.error("Dashboard Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
