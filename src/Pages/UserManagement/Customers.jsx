import React, { useState } from 'react';
import CustomerCard from '../../Component/Cards/CustomerCard';
import Data from "../../DataStore/DataStore.json";
import { FaSearch } from 'react-icons/fa';

function Customers() {
  const customerData = Data.customers;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customerData.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-indigo-800">👥 Customers</h1>
        
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </header>

      {/* Grid of Customer Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <CustomerCard key={customer.customer_id} customer={customer} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No customers found.</p>
        )}
      </section>
    </div>
  );
}

export default Customers;
