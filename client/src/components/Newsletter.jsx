// import React from "react";

// const Newsletter = () => {
//   return (
//     <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
//       <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog</h1>
//       <p className="md:text-lg text-gray-500/70 pb-8">
//         Subscribe to get the latest blog, new tech, and exclusive news.
//       </p>
//       <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
//         <input
//           className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
//           type="text"
//           placeholder="Enter Your Email Id"
//           required
//         />
//         <button
//           type="submit"
//           className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none"
//         >
//           Subscribe
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Newsletter;

//gpt

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/newsletter/subscribe", { email });

      // ✅ Check for success and show toast
      if (data.success) {
        toast.success(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter Your Email Id"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`md:px-12 px-8 h-full text-white transition-all cursor-pointer rounded-md rounded-l-none ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary/80 hover:bg-primary"
          }`}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
