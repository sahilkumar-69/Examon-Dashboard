import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa'; // Added more icons

const RetailersCard = ({ retailer }) => {
  const [status, setStatus] = useState(retailer.verification_status || 'pending');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // API call or global state update can be added here
    console.log(`Updated status for ${retailer.retailer_id}: ${e.target.value}`);
  };

  const getStatusColor = (currentStatus) => {
    switch (currentStatus) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'pending':
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden transform">
      {/* Store Banner */}
      <img
        className="w-full h-48 object-cover object-center rounded-t-xl"
        src={retailer.store_banner}
        alt="Store Banner"
      />

      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Left side: Logo & Profile */}
        <div className="flex flex-col items-center space-y-5 md:space-y-6 min-w-[120px]">
          <img
            className="w-32 h-42 rounded-lg object-full object-center border-4 border-white shadow-md -mt-16 bg-white"
            src={retailer.store_logo}
            alt="Store Logo"
          />
          <div className="text-center">
            <img
              className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500 shadow-md"
              src={retailer.profile_image}
              alt="Owner Profile"
            />
            <p className="mt-2 text-sm font-medium text-gray-700">{retailer.owner_name}</p>
          </div>
        </div>

        {/* Right side: Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-indigo-800 tracking-tight">{retailer.name}</h2>
          <p className="text-gray-600 text-sm italic">{retailer.store_description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-700 text-sm">
            <p className="flex items-center space-x-2">
              <FaEnvelope className="text-indigo-500" />
              <span>{retailer.email}</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaPhone className="text-indigo-500" />
              <span>{retailer.phone}</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-indigo-500" />
              <span>{retailer.location}</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaCalendarAlt className="text-indigo-500" />
              <span>Joined: {retailer.joined_on}</span>
            </p>
            <p className="flex items-center space-x-1 text-yellow-500 font-semibold">
              <FaStar className="text-lg" />
              <span className="text-base">{retailer.rating}</span>
            </p>
            <p className="font-semibold flex items-center space-x-2">
              <span>KYC Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(retailer.kyc.status)}`}>
                {retailer.kyc.status}
              </span>
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <label htmlFor={`verification-status-${retailer.retailer_id}`} className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Verification Status:</span>
              <select
                id={`verification-status-${retailer.retailer_id}`}
                value={status}
                onChange={handleStatusChange}
                className={`border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${getStatusColor(status)} appearance-none pr-8`}
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B7280' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.25rem' }}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailersCard;