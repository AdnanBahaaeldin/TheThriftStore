import React, { useState } from 'react';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
// import axios from 'axios'; // Uncomment when using backend

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data - replace with actual API calls
const mockData = {
  dailyTransactions: [
    { date: '2024-02-15', count: 25, amount: 1250.00 },
    { date: '2024-02-16', count: 30, amount: 1500.00 },
    { date: '2024-02-17', count: 28, amount: 1400.00 },
    { date: '2024-02-18', count: 35, amount: 1750.00 },
    { date: '2024-02-19', count: 32, amount: 1600.00 },
    { date: '2024-02-20', count: 40, amount: 2000.00 },
    { date: '2024-02-21', count: 38, amount: 1900.00 },
  ],
  topItems: [
    { name: 'Vintage Chair', sales: 15, revenue: 1125.00 },
    { name: 'Designer Bag', sales: 12, revenue: 960.00 },
    { name: 'Smart Watch', sales: 10, revenue: 800.00 },
    { name: 'Antique Clock', sales: 8, revenue: 640.00 },
    { name: 'Art Print', sales: 7, revenue: 560.00 },
  ],
  cashFlow: {
    totalRevenue: 15000.00,
    totalExpenses: 5000.00,
    netProfit: 10000.00,
    monthlyGrowth: 15,
  },
  systemStats: {
    activeUsers: 250,
    totalItems: 500,
    averageTransactionValue: 50.00,
    conversionRate: 3.5,
  },
};

const ReportsAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('transactions');
  // Add these states when using backend
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [analyticsData, setAnalyticsData] = useState({
  //   dailyTransactions: [],
  //   topItems: [],
  //   cashFlow: {},
  //   systemStats: {}
  // });

  // Add this useEffect when using backend
  // useEffect(() => {
  //   fetchAnalyticsData();
  // }, []);

  // Add this function when using backend
  // const fetchAnalyticsData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get('/api/admin/analytics');
  //     setAnalyticsData(response.data);
  //     setError(null);
  //   } catch (err) {
  //     setError('Failed to fetch analytics data');
  //     console.error('Error fetching analytics:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Chart data configurations
  const dailyTransactionsChartData = {
    // When using backend, replace with:
    // labels: analyticsData.dailyTransactions.map(item => item.date),
    // datasets: [
    //   {
    //     label: 'Daily Transactions',
    //     data: analyticsData.dailyTransactions.map(item => item.count),
    //     backgroundColor: 'rgba(34, 197, 94, 0.5)',
    //     borderColor: 'rgb(34, 197, 94)',
    //     borderWidth: 1,
    //   },
    // ],
    labels: mockData.dailyTransactions.map(item => item.date),
    datasets: [
      {
        label: 'Daily Transactions',
        data: mockData.dailyTransactions.map(item => item.count),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const topItemsChartData = {
    // When using backend, replace with:
    // labels: analyticsData.topItems.map(item => item.name),
    // datasets: [
    //   {
    //     data: analyticsData.topItems.map(item => item.sales),
    //     backgroundColor: [
    //       'rgba(34, 197, 94, 0.5)',
    //       'rgba(59, 130, 246, 0.5)',
    //       'rgba(168, 85, 247, 0.5)',
    //       'rgba(234, 179, 8, 0.5)',
    //       'rgba(239, 68, 68, 0.5)',
    //     ],
    //     borderColor: [
    //       'rgb(34, 197, 94)',
    //       'rgb(59, 130, 246)',
    //       'rgb(168, 85, 247)',
    //       'rgb(234, 179, 8)',
    //       'rgb(239, 68, 68)',
    //     ],
    //     borderWidth: 1,
    //   },
    // ],
    labels: mockData.topItems.map(item => item.name),
    datasets: [
      {
        data: mockData.topItems.map(item => item.sales),
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(168, 85, 247, 0.5)',
          'rgba(234, 179, 8, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-customGreen">
              <CurrencyDollarIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              {/* When using backend, replace with: */}
              {/* <p className="text-lg font-semibold text-gray-900">${analyticsData.cashFlow.totalRevenue.toFixed(2)}</p> */}
              <p className="text-lg font-semibold text-gray-900">${mockData.cashFlow.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <ShoppingBagIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              <p className="text-lg font-semibold text-gray-900">{mockData.systemStats.totalItems}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <UserGroupIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-lg font-semibold text-gray-900">{mockData.systemStats.activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <ChartBarIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-lg font-semibold text-gray-900">{mockData.systemStats.conversionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Transactions Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Transactions</h3>
          <div className="h-80">
            {/* Uncomment when using charts */}
            <Bar
              data={dailyTransactionsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Daily Transaction Count',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Top Items Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Items Distribution</h3>
          <div className="h-80">
            {/* Uncomment when using charts */}
            <Pie
              data={topItemsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  title: {
                    display: true,
                    text: 'Sales Distribution',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Selling Items Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockData.topItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.sales}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.revenue.toFixed(2)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cash Flow Summary */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flow Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${mockData.cashFlow.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">${mockData.cashFlow.totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500">Net Profit</p>
              <p className="text-2xl font-semibold text-gray-900">${mockData.cashFlow.netProfit.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Monthly Growth: <span className="text-green-600">+{mockData.cashFlow.monthlyGrowth}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics; 