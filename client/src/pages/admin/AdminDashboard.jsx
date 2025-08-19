// import React, { useEffect, useState } from "react";
// import { assets } from "../../assets/assets";
// import {
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Button,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   IconButton,
// } from "@mui/material";
// import { useAppContext } from "../../context/AppContext"; // ✅ import global context

// const AdminDashboard = () => {
//   const [admins, setAdmins] = useState([]);
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     name: "",
//     role: "admin",
//   });
//   const [message, setMessage] = useState({ text: "", severity: "info" });
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const { logout, user } = useAppContext(); // ✅ get logout + user from context

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     try {
//       const res = await fetch("/api/admin/list", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (res.status === 401) {
//         setMessage({ text: "Unauthorized — please login", severity: "error" });
//         setSnackbarOpen(true);
//         return;
//       }

//       const data = await res.json();
//       if (data.success) {
//         setAdmins(data.admins);
//       } else {
//         setMessage({
//           text: data.message || "Failed to fetch admins",
//           severity: "error",
//         });
//         setSnackbarOpen(true);
//       }
//     } catch (err) {
//       setMessage({
//         text: "Server error: " + (err.message || ""),
//         severity: "error",
//       });
//       setSnackbarOpen(true);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/admin/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (data.message) {
//         setMessage({ text: data.message, severity: "success" });
//         setSnackbarOpen(true);
//         setForm({ name: "", email: "", password: "" });
//         fetchAdmins();
//       } else if (data.error) {
//         setMessage({ text: data.error, severity: "error" });
//         setSnackbarOpen(true);
//       }
//     } catch {
//       setLoading(false);
//       setMessage({ text: "Server error", severity: "error" });
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this admin?")) return;

//     try {
//       const res = await fetch(`/api/admin/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();

//       if (data.success) {
//         setMessage({ text: data.message, severity: "success" });
//         setSnackbarOpen(true);
//         fetchAdmins();
//       } else {
//         setMessage({
//           text: data.message || "Failed to delete admin",
//           severity: "error",
//         });
//         setSnackbarOpen(true);
//       }
//     } catch {
//       setMessage({ text: "Server error", severity: "error" });
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <div className="flex justify-between items-center mb-4">
//         <Typography variant="h4" gutterBottom>
//           Admin Dashboard
//         </Typography>
//         {/* ✅ Logout button inside dashboard */}
//         {user && (
//           <Button variant="contained" color="error" onClick={logout}>
//             Logout
//           </Button>
//         )}
//       </div>

//       {/* Admin List */}
//       <Typography variant="h6" gutterBottom>
//         Admin List
//       </Typography>
//       <TableContainer component={Paper} sx={{ mb: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Created At</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {admins.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No admins found.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               admins.map((admin) => (
//                 <TableRow key={admin._id}>
//                   <TableCell>{admin.name}</TableCell>
//                   <TableCell>{admin.email}</TableCell>
//                   <TableCell>
//                     {new Date(admin.createdAt).toLocaleString()}
//                   </TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDelete(admin._id)}
//                       aria-label="delete admin"
//                     >
//                       <img
//                         src={assets.delete_icon}
//                         alt="Delete"
//                         style={{ width: 20, height: 20 }}
//                       />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add New Admin */}
//       <Typography variant="h6" gutterBottom>
//         Add New Admin
//       </Typography>
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
//       >
//         <TextField
//           label="Name"
//           name="name"
//           type="text"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           label="Email"
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <TextField
//           name="role"
//           className="invisible"
//           type="hidden"
//           value="Admin"
//           onChange={handleChange}
//           required
//         />

//         <TextField
//           label="Password"
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <Button type="submit" variant="contained" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Add Admin"}
//         </Button>
//       </form>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={4000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity={message.severity}
//           sx={{ width: "100%" }}
//         >
//           {message.text}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default AdminDashboard;

// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext"; // ✅ import global context

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "admin",
  });
  const [message, setMessage] = useState({ text: "", severity: "info" });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { logout, user } = useAppContext(); // ✅ get logout + user from context

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 401) {
        setMessage({ text: "Unauthorized — please login", severity: "error" });
        setSnackbarOpen(true);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setAdmins(data.admins);
      } else {
        setMessage({
          text: data.message || "Failed to fetch admins",
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    } catch (err) {
      setMessage({
        text: "Server error: " + (err.message || ""),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (data.message) {
        setMessage({ text: data.message, severity: "success" });
        setSnackbarOpen(true);
        setForm({ name: "", email: "", password: "" });
        fetchAdmins();
      } else if (data.error) {
        setMessage({ text: data.error, severity: "error" });
        setSnackbarOpen(true);
      }
    } catch {
      setLoading(false);
      setMessage({ text: "Server error", severity: "error" });
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      const res = await fetch(`/api/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ text: data.message, severity: "success" });
        setSnackbarOpen(true);
        fetchAdmins();
      } else {
        setMessage({
          text: data.message || "Failed to delete admin",
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    } catch {
      setMessage({ text: "Server error", severity: "error" });
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        {/* ✅ Logout button inside dashboard */}
        {/* {user && (
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        )} */}
      </div>

      {/* Admin List */}
      <Typography variant="h6" gutterBottom>
        Admin List
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No admins found.
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    {new Date(admin.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(admin._id)}
                      aria-label="delete admin"
                    >
                      <img
                        src={assets.delete_icon}
                        alt="Delete"
                        style={{ width: 20, height: 20 }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Admin */}
      <Typography variant="h6" gutterBottom>
        Add New Admin
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <TextField
          label="Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <TextField
          name="role"
          className="invisible"
          type="hidden"
          value="Admin"
          onChange={handleChange}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Add Admin"}
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard;
