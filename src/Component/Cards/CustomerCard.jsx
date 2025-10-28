import react, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function CustomerCard({ customer }) {
  const [status, setStatus] = useState(customer.status || "pending");
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsEditing(false);
    console.log(`Customer ${customer.customer_id} status updated to ${newStatus}`);
  };

  const statusColor = {
    approved: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    rejected: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="max-w-xl mx-auto border-2 border-indigo-100 rounded-2xl shadow-xl bg-white overflow-hidden p-6 transition-all hover:shadow-2xl duration-300">
      {/* Top section with avatar and info */}
      <div className="flex items-center space-x-5">
        <img
          src={customer.profile_image}
          alt={customer.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
        />
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
            <FaUser className="text-indigo-500" /> {customer.name}
          </h2>
         
          <p className="text-gray-500 flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500" /> {customer.phone}
          </p>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-4 text-sm text-gray-700 space-y-2">
         <p className="text-gray-600 flex items-center gap-2">
            <MdEmail className="text-gray-500" /> {customer.email}
          </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-indigo-400" />
          <span><span className="font-semibold">Location:</span> {customer.location}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-400" />
          <span><span className="font-semibold">Joined On:</span> {customer.joined_on}</span>
        </p>
      </div>

      {/* Status Display */}
      <div className="mt-4">
        <span className={`inline-block px-3 py-1 text-sm font-medium border rounded-full ${statusColor[status]}`}>
          Current Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Edit status */}
      <div className="mt-4">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <select
              value={status}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="approved">Approved</option>
            </select>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm text-red-500 hover:underline flex items-center gap-1"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-200"
          >
            <FaEdit /> Edit Status
          </button>
        )}
      </div>
    </div>
  );
}


