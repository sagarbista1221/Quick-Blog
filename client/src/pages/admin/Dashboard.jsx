// import React, { useEffect, useState } from "react";
// import { assets } from "../../assets/assets";
// import BlogTableItem from "../../components/admin/BlogTableItem";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     blogs: 0,
//     comments: 0,
//     drafts: 0,
//     recentBlogs: [],
//   });
//   const [loading, setLoading] = useState(true);

//   const { axios } = useAppContext();

//   const fetchDashboard = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/admin/dashboard");
//       if (data.success) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error(data.message || "Failed to load dashboard data");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (blogId) => {
//     try {
//       const res = await fetch(`/api/blogs/toggle-publish/${blogId}`, {
//         method: "POST", // 👈 Change this line from PUT to POST
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setBlogs((prevBlogs) =>
//           prevBlogs.map((blog) =>
//             blog._id === blogId
//               ? { ...blog, isPublished: !blog.isPublished }
//               : blog
//           )
//         );

//         setDashboardData((prev) => ({
//           ...prev,
//           ...data.dashboardCounts,
//         }));

//         toast.success("Blog publish status updated!");
//       } else {
//         toast.error(data.message || "Failed to update publish status");
//       }
//     } catch (error) {
//       toast.error("Error updating publish status");
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   return (
//     <div className="flex-1 p-4 md:p-10 bg-blue-50 min-h-screen">
//       {/* Stats Cards */}
//       <div className="flex flex-wrap gap-4">
//         {[
//           {
//             icon: assets.dashboard_icon_1,
//             value: dashboardData.blogs,
//             label: "Blogs",
//           },
//           {
//             icon: assets.dashboard_icon_2,
//             value: dashboardData.comments,
//             label: "Comments",
//           },
//           {
//             icon: assets.dashboard_icon_3,
//             value: dashboardData.drafts,
//             label: "Drafts",
//           },
//         ].map((item, idx) => (
//           <div
//             key={idx}
//             className="flex items-center gap-4 bg-white p-4 min-w-[200px] rounded-lg shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-all"
//           >
//             <img src={item.icon} alt="" className="w-10 h-10" />
//             <div>
//               <p className="text-2xl font-semibold text-gray-700">
//                 {item.value}
//               </p>
//               <p className="text-gray-500">{item.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Latest Blogs */}
//       <div className="mt-8">
//         <div className="flex items-center gap-3 mb-4 text-gray-700">
//           <img src={assets.dashboard_icon_4} alt="" />
//           <p className="text-lg font-semibold">Latest Blogs</p>
//         </div>

//         <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white">
//           {loading ? (
//             <p className="text-center py-6 text-gray-500">Loading...</p>
//           ) : dashboardData.recentBlogs.length === 0 ? (
//             <p className="text-center py-6 text-gray-500">
//               No recent blogs found
//             </p>
//           ) : (
//             <table className="w-full text-sm text-gray-600">
//               <thead className="text-xs text-gray-500 uppercase bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3">#</th>
//                   <th className="px-4 py-3">Blog Title</th>
//                   <th className="px-4 py-3 max-sm:hidden">Date</th>
//                   <th className="px-4 py-3 max-sm:hidden">Status</th>
//                   <th className="px-4 py-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {dashboardData.recentBlogs.map((blog, index) => (
//                   <BlogTableItem
//                     key={blog._id}
//                     blog={blog}
//                     fetchBlogs={fetchDashboard}
//                     handleTogglePublish={handleTogglePublish}
//                     index={index + 1}
//                   />
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
