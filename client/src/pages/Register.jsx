import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  const { axios, theme } = useAppContext(); // ✅ get theme
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const res = await axios.post("/api/users/register", {
        name: formData.name,
        role: "users",
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        toast.success("Registration successful");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("/login");
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 text-gray-900"
      } min-h-screen`}
    >
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          } w-full max-w-md rounded-2xl shadow-2xl p-8`}
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Your Account
          </h2>
          <p className="text-center mb-8">Join us today! It’s free and easy.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none
                  border-gray-300 dark:border-gray-600
                  focus:ring-purple-400 dark:focus:ring-purple-500
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none
                  border-gray-300 dark:border-gray-600
                  focus:ring-purple-400 dark:focus:ring-purple-500
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none
                  border-gray-300 dark:border-gray-600
                  focus:ring-purple-400 dark:focus:ring-purple-500
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none
                  border-gray-300 dark:border-gray-600
                  focus:ring-purple-400 dark:focus:ring-purple-500
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-medium hover:underline dark:text-purple-400"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
