import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, BarChart } from 'lucide-react'; // Import icons if needed

const SaleAnalyticsAdmin = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulating fetching sales data for the admin
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        // Simulate fetching data (use your real API endpoint here)
        const response = await fetch('/api/sales-data'); // Replace with actual API
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-8">Sales Analytics</h2>

      {/* Sales Data Table or Cards */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salesData.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No sales data available</div>
          ) : (
            salesData.map((sale, index) => (
              <div key={index} className="bg-gray-800/70 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">Sale ID: {sale.id}</h3>
                  <span className="text-sm text-teal-400">{new Date(sale.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-2">
                  <p className="text-white">Total Revenue: ${sale.revenue}</p>
                  <p className="text-white">Items Sold: {sale.itemsSold}</p>
                </div>
                <Link
                  to={`/sale-details/${sale.id}`}
                  className="mt-4 block text-center text-teal-400 hover:text-teal-500 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* Additional Stats */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center bg-gray-900/70 p-4 rounded-lg">
          <div>
            <h3 className="text-xl text-white">Total Sales</h3>
            <p className="text-2xl text-teal-400">${salesData.reduce((acc, sale) => acc + sale.revenue, 0)}</p>
          </div>
          <BarChart className="w-10 h-10 text-teal-400" />
        </div>

        <div className="flex justify-between items-center bg-gray-900/70 p-4 rounded-lg">
          <div>
            <h3 className="text-xl text-white">Total Items Sold</h3>
            <p className="text-2xl text-teal-400">{salesData.reduce((acc, sale) => acc + sale.itemsSold, 0)}</p>
          </div>
          <ShoppingCart className="w-10 h-10 text-teal-400" />
        </div>
      </div>
    </div>
  );
};

export default SaleAnalyticsAdmin;
