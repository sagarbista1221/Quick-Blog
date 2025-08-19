import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

const UserLogin = () => {
  const { axios, setUser, setToken, theme } = useAppContext(); // ✅ get theme
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", formData);
      if (data.success) {
        toast.success("Login successful");
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setUser(data.data.user);
        setToken(data.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;

        if (data.data.user.role === "admin") navigate("/admin");
        else navigate("/");
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900"
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
            Welcome Back 👋
          </h2>
          <p className="text-center mb-8">
            {theme === "dark"
              ? "Login to continue in dark mode"
              : "Please log in to continue"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none
                  border-gray-300 dark:border-gray-600
                  focus:ring-indigo-400 dark:focus:ring-indigo-500
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
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none
                  border-gray-300 dark:border-gray-600
                  focus:ring-indigo-400 dark:focus:ring-indigo-500
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline dark:text-indigo-400"
            >
              Register
            </Link>
            <Link
              to="/admin"
              className="block mt-4 text-center text-indigo-600 hover:underline"
            >
              Login as Admin
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserLogin;
