// import React, { useState } from "react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const { axios, setToken } = useAppContext();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/admin/login", {
//         email,
//         password,
//       });

//       if (data.success) {
//         setToken(data.token);
//         localStorage.setItem("token", data.token);
//         axios.defaults.headers.common["Authorization"] = data.token;
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
//         <div className="flex flex-col items-center justify-center">
//           <div className="w-full py-6 text-center">
//             <h1 className="text-3xl font-bold">
//               <span className="text-primary">Admin</span>Login
//             </h1>
//             <p className="font-light">
//               Enter your credentials to access the admin panel
//             </p>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="mt-6 w-full sm:max-w-md text-gray-600"
//           >
//             <div className="flex flex-col">
//               <label>Email</label>
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 type="email"
//                 required
//                 placeholder="Your Email Id"
//                 className="border-b-2 border-gray-300 p-2 outline-none mb-6"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label>Password</label>
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 type="password"
//                 required
//                 placeholder="Your Password"
//                 className="border-b-2 border-gray-300 p-2 outline-none mb-6"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
//             >
//               Login
//             </button>
//           </form>

//           <span>
//             Don't Have An Account?{" "}
//             <Link
//               to="/register"
//               className="text-primary px-4 py-2 rounded hover:text-primary/80"
//             >
//               Register
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const { axios, setToken, setUser } = useAppContext();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/admin/login", {
//         email,
//         password,
//       });

//       if (data.success) {
//         toast.success("Admin login successful");

//         // Save token and user
//         localStorage.setItem("token", data.data.token);
//         localStorage.setItem("user", JSON.stringify(data.data.user));
//         setToken(data.data.token);
//         setUser(data.data.user);

//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.data.token}`;

//         navigate("/admin"); // redirect to admin dashboard
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
//         <div className="flex flex-col items-center justify-center">
//           <div className="w-full py-6 text-center">
//             <h1 className="text-3xl font-bold">
//               <span className="text-primary">Admin</span> Login
//             </h1>
//             <p className="font-light">
//               Enter your credentials to access the admin panel
//             </p>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="mt-6 w-full sm:max-w-md text-gray-600"
//           >
//             <div className="flex flex-col">
//               <label>Email</label>
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 type="email"
//                 required
//                 placeholder="Admin Email"
//                 className="border-b-2 border-gray-300 p-2 outline-none mb-6"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label>Password</label>
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 type="password"
//                 required
//                 placeholder="Admin Password"
//                 className="border-b-2 border-gray-300 p-2 outline-none mb-6"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

// import React, { useState } from "react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const { axios, setToken, setUser } = useAppContext();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/admin/login", {
//         email,
//         password,
//       });

//       if (data.success) {
//         toast.success("Admin login successful");

//         // Save token & user
//         localStorage.setItem("token", data.data.token);
//         localStorage.setItem("user", JSON.stringify(data.data.user));
//         setToken(data.data.token);
//         setUser(data.data.user);

//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.data.token}`;

//         navigate("/admin"); // redirect to admin dashboard
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <div className="w-full max-w-sm p-6 border rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-2 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-2 border rounded"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

// import React, { useState } from "react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { Mail, Lock } from "lucide-react";
// import { motion } from "framer-motion";
// import Navbar from "../../components/Navbar";

// const AdminLogin = () => {
//   const { axios, setToken, setUser, theme } = useAppContext();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/admin/login", {
//         email,
//         password,
//       });

//       if (data.success) {
//         toast.success("Admin login successful");

//         // Save token & user
//         localStorage.setItem("token", data.data.token);
//         localStorage.setItem("user", JSON.stringify(data.data.user));
//         setToken(data.data.token);
//         setUser(data.data.user);

//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.data.token}`;

//         navigate("/admin"); // redirect to admin dashboard
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };
//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center ${
//         theme === "dark"
//           ? "bg-gray-900"
//           : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
//       }`}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${
//           theme === "dark"
//             ? "bg-gray-800 text-gray-100 shadow-gray-700"
//             : "bg-white text-gray-800 shadow-gray-300"
//         }`}
//       >
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Welcome Back, <span className="text-indigo-600">Admin</span>
//         </h2>
//         <p className="text-center text-gray-500 mb-8">
//           Enter your credentials to access the admin dashboard
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Input */}
//           <div className="relative">
//             <Mail
//               className={`absolute left-3 top-3 ${
//                 theme === "dark" ? "text-gray-400" : "text-gray-400"
//               }`}
//               size={20}
//             />
//             <input
//               type="email"
//               placeholder="Admin Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className={`w-full pl-10 pr-3 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
//                 theme === "dark"
//                   ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-200 placeholder-gray-400"
//                   : "bg-gray-100 border-gray-300 focus:ring-indigo-400 text-gray-800 placeholder-gray-500"
//               }`}
//             />
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <Lock
//               className={`absolute left-3 top-3 ${
//                 theme === "dark" ? "text-gray-400" : "text-gray-400"
//               }`}
//               size={20}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className={`w-full pl-10 pr-3 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
//                 theme === "dark"
//                   ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-200 placeholder-gray-400"
//                   : "bg-gray-100 border-gray-300 focus:ring-indigo-400 text-gray-800 placeholder-gray-500"
//               }`}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 shadow-lg transition-all"
//           >
//             Login
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar"; // import Navbar

const AdminLogin = () => {
  const { axios, setToken, setUser, theme } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        toast.success("Admin login successful");

        // Save token & user
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setToken(data.data.token);
        setUser(data.data.user);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;

        navigate("/admin"); // redirect to admin dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-900 min-h-screen"
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen"
      }
    >
      {/* Navbar */}
      <Navbar />

      {/* Login Form */}
      <div className="flex items-center justify-center mt-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${
            theme === "dark"
              ? "bg-gray-800 text-gray-100 shadow-gray-700"
              : "bg-white text-gray-800 shadow-gray-300"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Welcome Back, <span className="text-indigo-600">Admin</span>
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Enter your credentials to access the admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <Mail
                className={`absolute left-3 top-3 text-gray-400`}
                size={20}
              />
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-10 pr-3 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-200 placeholder-gray-400"
                    : "bg-gray-100 border-gray-300 focus:ring-indigo-400 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock
                className={`absolute left-3 top-3 text-gray-400`}
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full pl-10 pr-3 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-200 placeholder-gray-400"
                    : "bg-gray-100 border-gray-300 focus:ring-indigo-400 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 shadow-lg transition-all"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
