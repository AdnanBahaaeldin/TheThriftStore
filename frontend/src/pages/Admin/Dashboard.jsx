import React from 'react';
import { useNavigate } from 'react-router-dom'; // hook for navigation
import { useEffect, useState } from 'react'; // for state management
import axios from 'axios'; // for making HTTP requests
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaymentsIcon from '@mui/icons-material/Payments';

const Dashboard = () => {
  const navigate = useNavigate();

  // Dashboard data (use fake data for now)
  // const dashboardCards = [
  //   {
  //     title: 'User Management',
  //     count: '150',
  //     icon: 'people',
  //     path: '/admin/users',
  //   },
  //   {
  //     title: 'Item Management',
  //     count: '250',
  //     icon: 'inventory',
  //     path: '/admin/items',
  //   },
  //   {
  //     title: 'Transactions',
  //     count: '120',
  //     icon: 'payments',
  //     path: '/admin/transactions',
  //   },
  //   {
  //     title: 'Reports',
  //     count: '30',
  //     icon: 'analytics',
  //     path: '/admin/reports',
  //   },
  // ];

  //  for real backend data
  const [stats, setStats] = useState([
    {users: {count:0 , path: '/admin/users', icon: 'people', title : 'User Management'}},
    {items: {count:0 , path: '/admin/items', icon: 'inventory' , title : 'Item Management'}},
    // transactions: 0,
    // reports: 0
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardStats = async () => {
    try {
  //     setLoading(true);
  //     setError(null);
  //     
  //     // Replace with your actual API endpoints
      var token = localStorage.getItem('token')
      const [userRes, itemRes, transactionRes, reportRes] = await Promise.all([
        axios.get('http://localhost:8080/Admin/get/count',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
         }),
        axios.get('http://localhost:8080/customer/products/getAll',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
         }),
        axios.get('http://localhost:8080/Admin/get/orders',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
         }),
        // fetch('http://your-api-url/api/transactions/count'),
        // fetch('http://your-api-url/api/reports/count')
      ]);
         
         console.log(userRes.data);
         console.log(itemRes.data);
        //  const itemCount = itemRes.size();
        console.log(itemRes.data.length);
  //     // Check if all requests were successful
  //     if (!userRes.ok || !itemRes.ok || !transactionRes.ok || !reportRes.ok) {
  //       throw new Error('Failed to fetch dashboard statistics');
  //     }

  //     // Parse responses
  //     const [userCount, itemCount, transactionCount, reportCount] = await Promise.all([
  //       userRes.json(),
  //       itemRes.json(),
  //       transactionRes.json(),
  //       reportRes.json()
  //     ]);

  //     // Update stats state
      setStats([
         {count : userRes.data, path: '/admin/users' , icon: <PeopleIcon/>, title : 'User Management'},
        {count : itemRes.data.length, path: '/admin/items' , icon: <InventoryIcon/> , title : 'Item Management'},
        {count : transactionRes.data.length, path: '/admin/transactions' , icon: <PaymentsIcon/> , title : 'Transactions'},
  //       transactions: transactionCount,
  //       reports: reportCount
      ]);
    }catch (err) {
      setError(err.message || 'Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Statistics Summary</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(card.path)}
          >
            <div className="flex mb-4 justify-center text-customGreen">
              {card.icon}
              <h3 className="text-lg font-semibold mx-2">{card.title}</h3>
            </div>
            <p className="text-3xl font-bold text-center">{card.count}</p>
          </div>
         ))}
        
      </div>
    </div>
  );
};

export default Dashboard;
