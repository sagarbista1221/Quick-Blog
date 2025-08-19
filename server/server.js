import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import newsletterRouter from "./routes/newsletterRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ Import new user routes

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is working"));

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes); // ✅ Mount user routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

export default app;
