// import React, { useState } from "react";
// import axios from "axios";

// const Contact = () => {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [status, setStatus] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/contact", form);
//       if (res.data.success) {
//         setStatus("Message sent successfully!");
//         setForm({ name: "", email: "", message: "" });
//       }
//     } catch (err) {
//       setStatus("Error sending message. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Message Us</h1>
//       {status && <p className="mb-4 text-green-500">{status}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <textarea
//           name="message"
//           placeholder="Your Message"
//           value={form.message}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         ></textarea>
//         <button
//           type="submit"
//           className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { assets } from "../assets/assets";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("Error sending message.");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      {/* Heading Section */}
      <div className="mx-8 sm:mx-16 xl:mx-24 relative">
        <div className="text-center mt-20 mb-8">
          <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
            Have questions or feedback? We’d love to hear from you. Fill out the
            form below or reach us directly using the details provided.
          </p>
        </div>
        <img
          src={assets.gradientBackground}
          alt=""
          className="absolute -top-50 -z-1 opacity-50"
        />
      </div>

      {/* Contact Form Section */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 transition"
          >
            Send Message
          </button>
        </form>
        {status && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {status}
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Contact;
