// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { useAppContext } from "./context/AppContext";

// import Home from "./pages/Home";
// import Blog from "./pages/Blog";
// import UserLogin from "./pages/Login";
// import UserRegister from "./pages/Register";
// import Contacts from "./components/Contact";

// import Layout from "./pages/admin/Layout";
// import Dashboard from "./pages/admin/Dashboard";
// import AddBlog from "./pages/admin/AddBlog";
// import ListBlog from "./pages/admin/ListBlog";
// import Comments from "./pages/admin/Comments";
// import SubscriberList from "./pages/admin/SubscriberList";
// import Messages from "./pages/admin/Messages";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminLogin from "./components/admin/Login";

// const App = () => {
//   const { token, user } = useAppContext();
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.className = theme;
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // Route Guards
//   const AdminRoute = ({ children }) => {
//     if (!token || !user || user.role !== "admin") {
//       return <Navigate to="/admin/login" replace />;
//     }
//     return children;
//   };

//   const UserRoute = ({ children }) => {
//     if (!token || !user || user.role !== "users") {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <div>
//       <Toaster />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
//         <Route
//           path="/blog/:id"
//           element={<Blog theme={theme} setTheme={setTheme} />}
//         />
//         <Route path="/login" element={<UserLogin />} />
//         <Route path="/register" element={<UserRegister />} />
//         <Route path="/contact" element={<Contacts />} />

//         {/* Admin Routes */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route
//           path="/admin/*"
//           element={
//             <AdminRoute>
//               <Layout />
//             </AdminRoute>
//           }
//         >
//           <Route index element={<Dashboard />} />
//           <Route path="addBlog" element={<AddBlog />} />
//           <Route path="listBlog" element={<ListBlog />} />
//           <Route path="comments" element={<Comments />} />
//           <Route path="subscribers" element={<SubscriberList />} />
//           <Route path="messages" element={<Messages />} />
//           <Route path="admins" element={<AdminDashboard />} />
//         </Route>
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import UserLogin from "./pages/Login";
import UserRegister from "./pages/Register";
import Contacts from "./components/Contact";

import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import SubscriberList from "./pages/admin/SubscriberList";
import Messages from "./pages/admin/Messages";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./components/admin/Login";

const App = () => {
  const { token, user, loading } = useAppContext();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Route Guards
  const AdminRoute = ({ children }) => {
    if (loading) return <div className="text-center mt-10">Loading...</div>; // ✅ prevent premature redirect
    if (!token || !user || user.role !== "admin") {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  const UserRoute = ({ children }) => {
    if (loading) return <div className="text-center mt-10">Loading...</div>; // ✅
    if (!token || !user || user.role !== "users") {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route
          path="/blog/:id"
          element={<Blog theme={theme} setTheme={setTheme} />}
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/contact" element={<Contacts />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Layout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="subscribers" element={<SubscriberList />} />
          <Route path="messages" element={<Messages />} />
          <Route path="admins" element={<AdminDashboard />} />
        </Route>

        {/* User-only protected routes */}
        {/* Example: <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} /> */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
