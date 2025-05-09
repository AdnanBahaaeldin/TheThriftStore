import React from 'react';
import { useNavigate } from 'react-router-dom'; // hook for navigation

const Dashboard = () => {
  const navigate = useNavigate();

  // Dashboard data (use fake data for now)
  const dashboardCards = [
    {
      title: 'User Management',
      count: '150',
      icon: 'people',
      path: '/admin/users',
    },
    {
      title: 'Item Management',
      count: '250',
      icon: 'inventory',
      path: '/admin/items',
    },
    {
      title: 'Transactions',
      count: '120',
      icon: 'payments',
      path: '/admin/transactions',
    },
    {
      title: 'Reports',
      count: '30',
      icon: 'analytics',
      path: '/admin/reports',
    },
  ];

  //  for real backend data
  // const [stats, setStats] = useState({
  //   users: 0,
  //   items: 0,
  //   transactions: 0,
  //   reports: 0
  // });
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetchDashboardStats = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     
  //     // Replace with your actual API endpoints
  //     const [userRes, itemRes, transactionRes, reportRes] = await Promise.all([
  //       fetch('http://your-api-url/api/users/count'),
  //       fetch('http://your-api-url/api/items/count'),
  //       fetch('http://your-api-url/api/transactions/count'),
  //       fetch('http://your-api-url/api/reports/count')
  //     ]);

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
  //     setStats({
  //       users: userCount,
  //       items: itemCount,
  //       transactions: transactionCount,
  //       reports: reportCount
  //     });
  //   } catch (err) {
  //     setError(err.message || 'Failed to load dashboard statistics');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDashboardStats();
  // }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Statistics Summary</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardCards.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(card.path)}
          >
            <div className="flex mb-4 justify-center">
              {/* <i className="material-icons text-2xl mr-2">{card.icon}</i> */}
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </div>
            <p className="text-3xl font-bold text-customGreen text-center">{card.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
