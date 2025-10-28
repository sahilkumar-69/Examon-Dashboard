import React from 'react';
import Data from "../DataStore/DataStore.json";
import { FaRupeeSign, FaStore, FaChartPie } from 'react-icons/fa';

function Commission() {
  const revenueSummary = Data.admins[0].revenue_summary.currentyear.July;
  const revenueDetails = Data.admins[0].revenue_details.monthly["2025-07"];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaChartPie /> Monthly Revenue Overview (July 2025)
      </h2>

      {/* Total Revenue Summary */}
      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <FaRupeeSign /> Total Revenue: ₹{revenueSummary.total}
        </h3>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Commissions: ₹{revenueSummary.breakdown.commissions}</li>
          <li>Ads: ₹{revenueSummary.breakdown.ads}</li>
          <li>Premium Subscriptions: ₹{revenueSummary.breakdown.premium_subscriptions}</li>
        </ul>
      </div>

      {/* Retailer Revenue Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Retailer Contribution</h3>
        {Object.entries(revenueDetails.retailers).map(([retailerId, retailer]) => (
          <div key={retailerId} className="border border-gray-200 p-4 rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
                <FaStore /> {retailer.retailer_name}
              </div>
              <div className="font-semibold text-green-600">
                Revenue: ₹{retailer.revenue}
              </div>
            </div>
            <ul className="list-disc pl-6 text-gray-600">
              {retailer.products.map((product) => (
                <li key={product.product_id} className="flex justify-between pr-2">
                  <span>{product.name}</span>
                  <span>₹{product.revenue}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Commission;
