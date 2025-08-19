// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const Navbar = () => {
//   const { navigate, user, logout, theme, setTheme } = useAppContext();

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="logo"
//         className="w-32 sm:w-44 cursor-pointer"
//       />

//       <div className="flex items-center gap-4">
//         {/* Dark/Light Mode Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-200 bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
//         >
//           {theme === "light" ? "🌙 Dark" : "☀ Light"}
//         </button>

//         {/* No user logged in */}
//         {!user && (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//             >
//               Login
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-6 py-2.5"
//             >
//               Register
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}

//         {/* Logged in user (non-admin) */}
//         {user && user.role === "user" && (
//           <button
//             onClick={logout}
//             className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
//           >
//             Logout
//             <img src={assets.arrow} className="w-3" alt="arrow" />
//           </button>
//         )}

//         {/* Logged in admin */}
//         {user && user.role === "admin" && (
//           <>
//             <button
//               onClick={() => navigate("/admin")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//             >
//               Dashboard
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
//             >
//               Logout
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

//  below is the working code for logout system

// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const Navbar = () => {
//   const { navigate, user, logout, theme, setTheme } = useAppContext();

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="logo"
//         className="w-32 sm:w-44 cursor-pointer"
//       />

//       <div className="flex items-center gap-4">
//         {/* Dark/Light Mode Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-200 bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
//         >
//           {theme === "light" ? "🌙 Dark" : "☀ Light"}
//         </button>

//         {/* If no user is logged in */}
//         {!user && (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//             >
//               Login
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-6 py-2.5"
//             >
//               Register
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}

//         {/* If a user is logged in */}
//         {user && (
//           <>
//             {user.role === "admin" && (
//               <button
//                 onClick={() => navigate("/admin")}
//                 className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//               >
//                 Dashboard
//                 <img src={assets.arrow} className="w-3" alt="arrow" />
//               </button>
//             )}
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
//             >
//               Logout
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const Navbar = () => {
//   const { navigate, user, logout, theme, setTheme } = useAppContext();

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="logo"
//         className="w-32 sm:w-44 cursor-pointer"
//       />

//       <div className="flex items-center gap-4">
//         {/* Dark/Light Mode Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-200 bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
//         >
//           {theme === "light" ? "🌙 Dark" : "☀ Light"}
//         </button>

//         {/* If no user is logged in */}
//         {!user && (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//             >
//               Login
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-6 py-2.5"
//             >
//               Register
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}

//         {/* If a user is logged in */}
//         {user && (
//           <>
//             {/* 👋 Show username */}
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-500">
//               Hello, <span className="font-semibold">{user.name}</span> 👋
//             </span>

//             {user.role === "admin" && (
//               <button
//                 onClick={() => navigate("/admin")}
//                 className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//               >
//                 Dashboard
//                 <img src={assets.arrow} className="w-3" alt="arrow" />
//               </button>
//             )}

//             <button
//               onClick={logout}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
//             >
//               Logout
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const Navbar = () => {
//   const { navigate, user, logout, theme, setTheme } = useAppContext();

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="logo"
//         className="w-32 sm:w-44 cursor-pointer"
//       />

//       <div className="flex items-center gap-4">
//         {/* Dark/Light Mode Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-200 bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
//         >
//           {theme === "light" ? "🌙 Dark" : "☀ Light"}
//         </button>

//         {/* No one logged in */}
//         {!user && (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//             >
//               Login
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-6 py-2.5"
//             >
//               Register
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}

//         {/* User logged in */}
//         {user && user.role === "users" && (
//           <>
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-500">
//               Hello, <span className="font-semibold">{user.name}</span> 👋
//             </span>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
//             >
//               Logout
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}

//         {/* Admin logged in */}
//         {user && user.role === "admin" && (
//           <>
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-500">
//               Hello, <span className="font-semibold">{user.name}</span> 👋
//             </span>
//             <button
//               onClick={() => navigate("/admin")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//             >
//               Dashboard
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
//             >
//               Logout
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

//gggggggggggggggggggggggggg

// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const Navbar = () => {
//   const { navigate, user, logout, theme, setTheme } = useAppContext();

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="logo"
//         className="w-32 sm:w-44 cursor-pointer"
//       />

//       <div className="flex items-center gap-4">
//         {/* Dark/Light Mode Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-200 bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
//         >
//           {theme === "light" ? "🌙 Dark" : "☀ Light"}
//         </button>

//         {/* No user logged in */}
//         {!user && (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//             >
//               Login
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-6 py-2.5"
//             >
//               Register
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}

//         {/* Logged-in user */}
//         {user && user.role === "users" && (
//           <>
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Hello, <span className="font-semibold">{user.name}</span> 👋
//             </span>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
//             >
//               Logout
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}

//         {/* Logged-in admin */}
//         {user && user.role === "admin" && (
//           <>
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Hello, <span className="font-semibold">{user.name}</span> 👋
//             </span>
//             <button
//               onClick={() => navigate("/admin")}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
//             >
//               Dashboard
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
//             >
//               Logout
//               <img src={assets.arrow} className="w-3" alt="arrow" />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, user, logout, theme, setTheme } = useAppContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-200 bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>

        {!user && (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
            >
              Login
              <img src={assets.arrow} className="w-3" alt="arrow" />
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-6 py-2.5"
            >
              Register
              <img src={assets.arrow} className="w-3" alt="arrow" />
            </button>
          </>
        )}

        {user && user.role === "users" && (
          <>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Hello, <span className="font-semibold">{user.name}</span> 👋
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
            >
              Logout
              <img src={assets.arrow} className="w-3" alt="arrow" />
            </button>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Hello, <span className="font-semibold">{user.name}</span> 👋
            </span>
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
            >
              Dashboard
              <img src={assets.arrow} className="w-3" alt="arrow" />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
            >
              Logout
              <img src={assets.arrow} className="w-3" alt="arrow" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
