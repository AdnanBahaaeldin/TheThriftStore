import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  TrashIcon,
  FlagIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
// import axios from 'axios'; // Uncomment when using backend

// Mock data - replace with actual API calls
const mockItems = [
  {
    id: 1,
    name: 'Vintage Chair',
    seller: 'john_doe',
    price: 75.00,
    status: 'available',
    category: 'furniture',
    listedDate: '2024-02-15',
  },
  {
    id: 2,
    name: 'Gaming Laptop',
    seller: 'tech_master',
    price: 899.99,
    status: 'available', 
    category: 'electronics',
    listedDate: '2024-02-14',
  },
  {
    id: 3,
    name: 'Antique Clock',
    seller: 'vintage_finds',
    price: 250.00,
    status: 'sold',
    category: 'collectibles', 
    listedDate: '2024-02-13',
  },
  {
    id: 4,
    name: 'Mountain Bike',
    seller: 'outdoor_gear',
    price: 450.00,
    status: 'available',
    category: 'sports',
    listedDate: '2024-02-12',
  },
  {
    id: 5,
    name: 'Oil Painting',
    seller: 'art_gallery',
    price: 1200.00,
    status: 'available',
    category: 'art',
    listedDate: '2024-02-11',
  },
  {
    id: 6,
    name: 'Designer Handbag',
    seller: 'fashion_boutique',
    price: 899.99,
    status: 'available',
    category: 'fashion',
    listedDate: '2024-02-10',
  }
];

const ItemManagement = () => {
  const [items, setItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    status: '',
  });
  // Add these states when using backend
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // Add this useEffect when using backend
  // useEffect(() => {
  //   fetchItems();
  // }, []);

  // Add this function when using backend
  // const fetchItems = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get('/api/admin/items');
  //     setItems(response.data);
  //     setError(null);
  //   } catch (err) {
  //     setError('Failed to fetch items');
  //     console.error('Error fetching items:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // When using backend, replace with:
      // try {
      //   await axios.delete(`/api/admin/items/${itemId}`);
      //   setItems(items.filter((item) => item.id !== itemId));
      // } catch (err) {
      //   console.error('Error deleting item:', err);
      //   alert('Failed to delete item');
      // }
      setItems(items.filter((item) => item.id !== itemId));
    }
  };

  const handleFlagItem = (itemId) => {
    // When using backend, replace with:
    // try {
    //   await axios.patch(`/api/admin/items/${itemId}/flag`, {
    //     flagged: !items.find(item => item.id === itemId).flagged
    //   });
    //   setItems(items.map(item =>
    //     item.id === itemId
    //       ? { ...item, flagged: !item.flagged }
    //       : item
    //   ));
    // } catch (err) {
    //   console.error('Error flagging item:', err);
    //   alert('Failed to flag item');
    // }
    setItems(items.map(item =>
      item.id === itemId
        ? { ...item, flagged: !item.flagged }
        : item
    ));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditForm({
      name: item.name,
      price: item.price,
      status: item.status,
    });
    setIsEditing(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // When using backend, replace with:
    // try {
    //   await axios.put(`/api/admin/items/${selectedItem.id}`, editForm);
    //   setItems(items.map(item =>
    //     item.id === selectedItem.id
    //       ? { ...item, ...editForm }
    //       : item
    //   ));
    //   setIsEditing(false);
    //   setSelectedItem(null);
    // } catch (err) {
    //   console.error('Error updating item:', err);
    //   alert('Failed to update item');
    // }
    setItems(items.map(item =>
      item.id === selectedItem.id
        ? { ...item, ...editForm }
        : item
    ));
    setIsEditing(false);
    setSelectedItem(null);
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Item Management</h2>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-customGreen focus:border-customGreen"
              value={searchTerm}
              onChange={handleSearch}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Seller
                </th>
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
              {filteredItems.map((item) => (
                <tr key={item.id} className={item.flagged ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.seller}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-customGreen hover:text-customGreen-dark mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleFlagItem(item.id)}
                      className={`mr-4 ${item.flagged ? 'text-red-600' : 'text-gray-400'} hover:text-red-600`}
                    >
                      <FlagIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
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

      {/* Edit Item Modal */}
      {isEditing && selectedItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Item</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-customGreen text-white px-4 py-2 rounded-md hover:bg-customGreen-dark"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemManagement; 