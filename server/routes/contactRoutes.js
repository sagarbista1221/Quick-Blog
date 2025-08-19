// import express from "express";
// import Contact from "../models/contactModel.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     if (!name || !email || !message) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields required" });
//     }

//     await Contact.create({ name, email, message });
//     res.json({ success: true, message: "Message saved successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;

import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

// POST /api/contact - save a message (you have this already)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }
    await Contact.create({ name, email, message });
    res.json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// NEW: GET /api/contact/messages - get all contact messages for admin
router.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
});

export default router;
