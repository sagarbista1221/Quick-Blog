// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "quill/dist/quill.snow.css";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const navigate = useNavigate();

//   // --- State ---
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [input, setInput] = useState("");

//   // 🌙 Theme state
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   // --- Fetch blogs ---
//   const fetchBlogs = async () => {
//     try {
//       const { data } = await axios.get("/api/blog/all");
//       data.success ? setBlogs(data.blogs) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch blogs");
//     }
//   };

//   // --- Run on mount ---
//   useEffect(() => {
//     fetchBlogs();

//     // Load token and user from localStorage
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");

//     if (savedToken && savedUser) {
//       setToken(savedToken);
//       setUser(JSON.parse(savedUser));
//       axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
//     }

//     // Apply theme
//     document.documentElement.className = theme;
//   }, []);

//   // --- Apply theme changes ---
//   useEffect(() => {
//     document.documentElement.className = theme;
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // --- Login function ---
//   const login = async (email, password) => {
//     try {
//       const { data } = await axios.post("/api/users/login", {
//         email,
//         password,
//       });

//       if (data.success) {
//         localStorage.setItem("token", data.data.token);
//         localStorage.setItem("user", JSON.stringify(data.data.user));
//         setToken(data.data.token);
//         setUser(data.data.user);

//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.data.token}`;

//         toast.success("Login successful");

//         if (data.data.user.role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     }
//   };

//   // --- Logout function ---
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//     navigate("/");
//     delete axios.defaults.headers.common["Authorization"];
//     toast.success("Logged out successfully");

//     // Redirect based on role
//     if (user?.role === "admin") {
//       navigate("/admin/login"); // admin goes to admin login
//     } else {
//       navigate("/login"); // normal user goes to login
//     }
//   };

//   const value = {
//     axios,
//     navigate,
//     token,
//     setToken,
//     user,
//     setUser,
//     login,
//     logout,
//     blogs,
//     setBlogs,
//     input,
//     setInput,
//     theme,
//     setTheme,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "quill/dist/quill.snow.css";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // --- State ---
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true); // NEW ✅

  // 🌙 Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // --- Fetch blogs ---
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch blogs");
    }
  };

  // --- Run on mount ---
  useEffect(() => {
    fetchBlogs();

    // Load token and user from localStorage
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }

    // Apply theme
    document.documentElement.className = theme;
    setLoading(false); // ✅ finished restoring state
  }, []);

  // --- Apply theme changes ---
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- Login function ---
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
<<<<<<< HEAD
=======

>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setToken(data.data.token);
        setUser(data.data.user);
<<<<<<< HEAD
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;
        toast.success("Login successful");
        // 🚨 remove navigate("/") here — handled in Login.jsx
=======

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;

        toast.success("Login successful");

        if (data.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
>>>>>>> 5ac73a1b5276266d1448db0fff368a85326d2a4c
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // --- Logout function ---
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");

    // Redirect based on role
    if (user?.role === "admin") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  const value = {
    axios,
    navigate,
    token,
    setToken,
    user,
    setUser,
    login,
    logout,
    blogs,
    setBlogs,
    input,
    setInput,
    theme,
    setTheme,
    loading, // NEW ✅
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
