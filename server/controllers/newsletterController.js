// import nodemailer from "nodemailer";

// export const subscribeUser = async (req, res) => {
//   const { email } = req.body;

//   if (!email)
//     return res
//       .status(400)
//       .json({ success: false, message: "Email is required" });

//   try {
//     // Set up transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER, // your email
//         pass: process.env.SMTP_PASS, // your app password
//       },
//     });

//     // Define message
//     const message = {
//       from: `"QuickBlog" <${process.env.SMTP_USER}>`,
//       to: email,
//       subject: "Thanks for subscribing to QuickBlog!",
//       html: `
//         <h2>Welcome to QuickBlog!</h2>
//         <p>Stay tuned for the latest in tech, finance, and startups.</p>
//         <p><strong>Latest blog:</strong> <a href="https://yourdomain.com/latest-blog">Click here to read</a></p>
//       `,
//     };

//     await transporter.sendMail(message);

//     res
//       .status(200)
//       .json({ success: true, message: "Subscription successful!" });
//   } catch (error) {
//     console.error("Email error:", error);
//     res.status(500).json({ success: false, message: "Failed to send email" });
//   }
// };

import Subscriber from "../models/subscriberModel.js";
import nodemailer from "nodemailer";

export const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }

  try {
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res
        .status(409) // More accurate than 400
        .json({ success: false, message: "You are already subscribed!" });
    }

    // Save subscriber to DB
    const newSubscriber = await Subscriber.create({ email });

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Compose welcome message
    const message = {
      from: `"QuickBlog" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to QuickBlog!",
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Thanks for subscribing to QuickBlog!</h2>
          <p>You’ll now receive the latest tech blogs and exclusive updates.</p>
          <p><a href="https://yourdomain.com/blogs" target="_blank" style="color: #2563EB;">Explore Blogs</a></p>
        </div>
      `,
    };

    // Send email (don't block if it fails)
    transporter
      .sendMail(message)
      .catch((err) => console.error("Email sending failed:", err));

    return res
      .status(200)
      .json({ success: true, message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Subscription Error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Try again later." });
  }
};
