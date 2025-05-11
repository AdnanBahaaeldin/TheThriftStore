import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios'; // Uncomment when using backend
import { useEffect } from 'react';

// Mock data 
// const mockTransactions = [
//   {
//     id: 1,
//     buyer: 'john_doe',
//     seller: 'jane_smith',
//     itemName: 'Vintage Chair',
//     price: 75.00,
//     date: '2024-02-15 14:30:00',
//     status: 'completed',
//     suspicious: false,
//   },
//   {
//     id: 2,
//     buyer: 'sarah_jones',
//     seller: 'mike_wilson',
//     itemName: 'Antique Lamp',
//     price: 120.00,
//     date: '2024-02-14 09:15:00',
//     status: 'completed',
//     suspicious: false,
//   },
//   {
//     id: 3,
//     buyer: 'alex_brown',
//     seller: 'emma_davis',
//     itemName: 'Vintage Watch',
//     price: 250.00,
//     date: '2024-02-13 16:45:00', 
//     status: 'pending',
//     suspicious: true,
//   },
//   {
//     id: 4,
//     buyer: 'james_miller',
//     seller: 'olivia_taylor',
//     itemName: 'Art Deco Mirror',
//     price: 180.00,
//     date: '2024-02-12 11:20:00',
//     status: 'completed',
//     suspicious: false,
//   },
//   {
//     id: 5,
//     buyer: 'william_clark',
//     seller: 'sophia_martin',
//     itemName: 'Persian Rug',
//     price: 450.00,
//     date: '2024-02-11 13:50:00',
//     status: 'cancelled',
//     suspicious: true,
//   }
// ];

const TransactionMonitoring = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  // Add these states when using backend
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add this useEffect when using backend
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add this function when using backend
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      var token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/Admin/get/orders',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
         });
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredTransactions = transactions.filter((transaction) =>
  //   transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   transaction.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   transaction.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleViewDetails = (transaction) => {
    // When using backend, replace with:
    // try {
    //   const response = await axios.get(`/api/admin/transactions/${transaction.id}`);
    //   setSelectedTransaction(response.data);
    // } catch (err) {
    //   console.error('Error fetching transaction details:', err);
    //   alert('Failed to load transaction details');
    // }
    setSelectedTransaction(transaction);
  };

  const handleMarkSuspicious = (transactionId) => {
    // When using backend, replace with:
    // try {
    //   await axios.patch(`/api/admin/transactions/${transactionId}/suspicious`, {
    //     suspicious: !transactions.find(t => t.id === transactionId).suspicious
    //   });
    //   setTransactions(transactions.map(transaction =>
    //     transaction.id === transactionId
    //       ? { ...transaction, suspicious: !transaction.suspicious }
    //       : transaction
    //   ));
    // } catch (err) {
    //   console.error('Error marking transaction as suspicious:', err);
    //   alert('Failed to update transaction status');
    // }
    setTransactions(transactions.map(transaction =>
      transaction.id === transactionId
        ? { ...transaction, suspicious: !transaction.suspicious }
        : transaction
    ));
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction Monitoring</h2>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-customGreen focus:border-customGreen"
              value={searchTerm}
              onChange={handleSearch}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date/Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Buyer Id
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Seller
                </th> */}
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th> */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className={transaction.suspicious ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.orderDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.customerId}</div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.seller}</div>
                  </td> */}
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.itemName}</div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${transaction.totalAmount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      bg-green-100 text-green-800
                        ">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(transaction)}
                      className="text-customGreen hover:text-customGreen-dark mr-4"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleMarkSuspicious(transaction.id)}
                      className={`${transaction.suspicious ? 'text-red-600' : 'text-gray-400'} hover:text-red-600`}
                    >
                      <ExclamationTriangleIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date/Time</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Buyer</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.buyer}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Seller</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.seller}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Item</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.itemName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <p className="mt-1 text-sm text-gray-900">${selectedTransaction.price.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.status}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTransaction(null)}
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

export default TransactionMonitoring; 