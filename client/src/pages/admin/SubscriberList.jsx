import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Loader from "../../components/common/Loader"; // Fixed import
import toast from "react-hot-toast";

const SubscriberList = () => {
  const { axios } = useAppContext();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get("/api/subscribers");
      if (data.success) {
        setSubscribers(data.subscribers);
      } else {
        toast.error("Failed to fetch subscribers");
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Email Subscribers</h1>
      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, index) => (
              <tr key={sub._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{sub.email}</td>
                <td className="px-6 py-4">
                  {new Date(sub.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && (
          <p className="text-center p-6 text-gray-500">No subscribers found.</p>
        )}
      </div>
    </div>
  );
};

export default SubscriberList;
