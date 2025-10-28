import React, { useState } from 'react';
import RetailerCard from '../../Component/Cards/RetailersCard';
import Data from "../../DataStore/DataStore.json";
import { FaSearch, FaStore } from 'react-icons/fa';

function Retailers() {
  const retailerData = Data.retailers;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRetailers = retailerData.filter((retailer) =>
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <FaStore className="text-indigo-700 text-3xl" />
          <h1 className="text-2xl font-bold text-indigo-800">Retailers</h1>
        </div>

        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search retailers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </header>

      {/* Retailers Grid */}
      <section className="grid grid-cols-1  gap-6">
        {filteredRetailers.length > 0 ? (
          filteredRetailers.map((retailer) => (
            <RetailerCard key={retailer.retailer_id} retailer={retailer} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No retailers found.</p>
        )}
      </section>
    </div>
  );
}

export default Retailers;
