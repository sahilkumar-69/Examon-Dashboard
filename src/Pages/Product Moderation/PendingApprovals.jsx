import React from 'react';
import ProductCard from '../../Component/Cards/ProductCard';
import Data from "../../DataStore/DataStore.json";

function PendingApprovals() {
  const pendingData = Data.product_listings.filter(
    (product) => product.status === 'pending'
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Pending Product Approvals</h1>

      {pendingData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingData.map((product) => (
            <ProductCard key={product.product_id} {...product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No pending products found.</p>
      )}
    </div>
  );
}

export default PendingApprovals;
