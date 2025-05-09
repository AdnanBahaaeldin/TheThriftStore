import React, { useState } from 'react';
import {
  ShoppingBagIcon,
  TagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
// import axios from 'axios'; // Uncomment when using backend

// Mock data 
const mockData = {
  categories: [
    { name: 'Clothing', count: 150, value: 7500.00 },
    { name: 'Electronics', count: 100, value: 15000.00 },
    { name: 'Furniture', count: 75, value: 12500.00 },
    { name: 'Books', count: 200, value: 4000.00 },
    { name: 'Other', count: 50, value: 2500.00 },
  ],
  inventoryStats: {
    totalItems: 575,
    totalValue: 41500.00,
    averagePrice: 72.17,
    itemsSold: 125,
  },
  recentActivity: [
    { type: 'new', item: 'Vintage Chair', category: 'Furniture', date: '2024-02-15' },
    { type: 'sold', item: 'Designer Bag', category: 'Clothing', date: '2024-02-15' },
    { type: 'updated', item: 'Smart Watch', category: 'Electronics', date: '2024-02-14' },
  ],
};

const InventoryOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Add these states when using backend
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [inventoryData, setInventoryData] = useState({
  //   categories: [],
  //   inventoryStats: {},
  //   recentActivity: []
  // });

  // Add this useEffect when using backend
  // useEffect(() => {
  //   fetchInventoryData();
  // }, []);

  // Add this function when using backend
  // const fetchInventoryData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get('/api/admin/inventory/overview');
  //     setInventoryData(response.data);
  //     setError(null);
  //   } catch (err) {
  //     setError('Failed to fetch inventory data');
  //     console.error('Error fetching inventory:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // When using backend, replace mockData.categories with inventoryData.categories

  // Add these conditions when using backend
  // if (loading) {
  //   return <div className="text-center p-4">Loading...</div>;
  // }
  // 
  // if (error) {
  //   return <div className="text-center p-4 text-red-600">{error}</div>;
  // }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Overview</h2>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <ShoppingBagIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              {/* When using backend, replace with: */}
              {/* <p className="text-lg font-semibold text-gray-900">{inventoryData.inventoryStats.totalItems}</p> */}
              <p className="text-lg font-semibold text-gray-900">{mockData.inventoryStats.totalItems}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-customGreen">
              <CurrencyDollarIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              {/* When using backend, replace with: */}
              {/* <p className="text-lg font-semibold text-gray-900">${inventoryData.inventoryStats.totalValue.toFixed(2)}</p> */}
              <p className="text-lg font-semibold text-gray-900">${mockData.inventoryStats.totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <TagIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Price</p>
              {/* When using backend, replace with: */}
              {/* <p className="text-lg font-semibold text-gray-900">${inventoryData.inventoryStats.averagePrice.toFixed(2)}</p> */}
              <p className="text-lg font-semibold text-gray-900">${mockData.inventoryStats.averagePrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <ChartBarIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Items Sold</p>
              {/* When using backend, replace with: */}
              {/* <p className="text-lg font-semibold text-gray-900">{inventoryData.inventoryStats.itemsSold}</p> */}
              <p className="text-lg font-semibold text-gray-900">{mockData.inventoryStats.itemsSold}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Category Breakdown</h3>
          </div>
          <div className="space-y-4">
            {/* When using backend, replace mockData.categories with inventoryData.categories */}
            {mockData.categories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-500">{category.count} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">${category.value.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {/* When using backend, replace mockData.inventoryStats.totalValue with inventoryData.inventoryStats.totalValue */}
                      {((category.value / mockData.inventoryStats.totalValue) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-customGreen h-2 rounded-full"
                      style={{
                        width: `${(category.value / mockData.inventoryStats.totalValue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {/* When using backend, replace mockData.recentActivity with inventoryData.recentActivity */}
            {mockData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-3 ${
                      activity.type === 'new'
                        ? 'bg-green-500'
                        : activity.type === 'sold'
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.item}</p>
                    <p className="text-sm text-gray-500">{activity.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.date}</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{activity.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryOverview; 