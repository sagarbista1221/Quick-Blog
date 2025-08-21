import React, { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/contact/messages");
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages received yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map(({ _id, name, email, message, createdAt }) => (
            <li
              key={_id}
              className="border rounded p-4 shadow-sm hover:shadow-md transition"
            >
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${email}`} className="text-blue-600 underline">
                  {email}
                </a>
              </p>
              <p>
                <strong>Message:</strong> {message}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
