import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios'; // Uncomment when using backend
import { useEffect } from 'react';

// Mock data
// const mockUsers = [
//   {
//     id: 1,
//     username: 'omar',
//     email: 'omar@gmail.com',
//     balance: 150.00,
//     status: 'active',
//     joinedDate: '2024-01-15',
//   },
//   {
//     id: 2,
//     username: 'omar',
//     email: 'omar@gmail.com',
//     balance: 150.00,
//     status: 'active',
//     joinedDate: '2024-01-15',
//   },
//   {
//     id: 3,
//     username: 'omar',
//     email: 'omar@gmail.com',
//     balance: 150.00,
//     status: 'active',
//     joinedDate: '2024-01-15',
//   },
//   {
//     id: 4,
//     username: 'mansour',
//     email: 'omar@gmail.com',
//     balance: 150.00,
//     status: 'active',
//     joinedDate: '2024-01-15',
//   },
//   {
//     id: 5,
//     username: 'ahmed',
//     email: 'omar@gmail.com',
//     balance: 150.00,
//     status: 'active',
//     joinedDate: '2024-01-15',
//   },
//   {
//     id: 6,
//     username: 'mansour',
//     email: 'omar@gmail.com',
//     balance: 150.00,
//     status: 'active',
//     joinedDate: '2024-01-15',
//   }
// ];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  // Add these states when using backend
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add this useEffect when using backend
  useEffect(() => {
    fetchUsers();
  }, []);

  // Add this function when using backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/Admin/getAll' , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        });
      setUsers(response.data);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // When using backend, replace with:
      // try {
      //   await axios.delete(`/api/admin/users/${userId}`);
      //   setUsers(users.filter((user) => user.id !== userId));
      // } catch (err) {
      //   console.error('Error deleting user:', err);
      //   alert('Failed to delete user');
      // }
      // setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleViewProfile = (user) => {
    // When using backend, replace with:
    // try {
    //   const response = await axios.get(`/api/admin/users/${user.id}`);
    //   setSelectedUser(response.data);
    // } catch (err) {
    //   console.error('Error fetching user details:', err);
    //   alert('Failed to load user details');
    // }
    setSelectedUser(user);
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
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-customGreen focus:border-customGreen"
              value={searchTerm}
              onChange={handleSearch}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Balance
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Login
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${user.balance.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.lastLogin}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewProfile(user)}
                      className="text-customGreen hover:text-customGreen-dark mr-4"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Balance</label>
                <p className="mt-1 text-sm text-gray-900">${selectedUser.balance.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Joined Date</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.joinedDate}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-customGreen text-white px-4 py-2 rounded-md hover:bg-customGreen-dark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;