import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { SellerService } from '../../services/api';
import axios from "axios";

const categoryColors = {
  clothing: 'bg-green-100 text-green-800',
  electronics: 'bg-blue-100 text-blue-800',
  furniture: 'bg-yellow-100 text-yellow-800',
  books: 'bg-purple-100 text-purple-800',
  other: 'bg-gray-100 text-gray-800',
};

const Sell = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    productId:'',
    productName: '',
    description: '',
    quantity:'',
    price: '',
    categoryName: '',
  });

  const [image, setImage] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
   const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
    // setProduct({...product, image: e.target.files[0]})
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       var token = localStorage.getItem('token')
  //       const response = await SellerService.fetchAll( {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       });
  //       // console.log("response", response.data)
  //       setItems(response.data);
  //       console.log(items)
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     if (!isDataFetched) {
//       try {
//         const response = await axios.get("/customer/products/getAll");
//         setItems(response.data);
//         console.log(response.data);
//       } catch (error) {
//         setIsError(error.message);
//       } finally {
//         setIsDataFetched(true);
//       }
//     }
//   };

//   fetchData();
// }, [isDataFetched]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const myformData = new FormData();
    myformData.append("imageFile", image);
    myformData.append(
      "product",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    if (isEditing) {
      try {
        setItems(items.map(item =>
            item.id === currentItem.id ? { ...formData, id: currentItem.id } : item
          ));
        const response = await SellerService.update(currentItem.id, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status < 300) {
          alert("Product updated successfully!");
        }
      } catch (error) {
        if (error.response) {
          alert("Couldn't update Product: " + error.response.data);
        }
      }
    } else {
      axios
      .post("http://localhost:8080/customer/addProduct", myformData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        formData.productId = response.data;
        console.log(formData.productId);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
     
    } // Reset form and state
  setFormData({
    productName: '',
    description: '',
    quantity: '',
    price: '',
    imageURL: '',
    categoryName: '',
  });
  setIsEditing(false);
  setCurrentItem(null);
  window.location.reload(); 

};
const [loaded, setLoaded] = useState(false);


useEffect(() => {
  const fetchProductsAndImages = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found.");
      return;
    }

    try {
      // Step 1: Fetch products
      const productResponse = await SellerService.fetchAll({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const products = productResponse.data;
      
      // Step 2: Fetch images dynamically for each product
      const imageBlobs = await Promise.all(
        products.map(async (product) => {
          try {
            const imageResponse = await axios.get(
              `http://localhost:8080/products/product/${product.id}/image`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
              }
            );
            return URL.createObjectURL(imageResponse.data);
          } catch (error) {
            // No image uploaded for this product
            console.warn(`No image for product ${product.id}`);
            return null;
          }
        })
      );

      // Step 3: Merge images into products
      const mergedProducts = products.map((product, index) => ({
        ...product,
        imageURL: imageBlobs[index], // null if no image
      }));
      console.log(mergedProducts);
      setItems(mergedProducts);
      setLoaded(true);

    } catch (error) {
      console.error("Error fetching products or images:", error);
    }
  };

  // Only fetch once
  if (!loaded) {
    fetchProductsAndImages();
  }
}, [loaded]);


  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData(item);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    // delete api
    const token = localStorage.getItem('token');
    SellerService.delete(id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setFormData({
      productName: '',
    description: '',
    quantity:'',
    price: '',
    imageURL: '',
    categoryName: ''
    });
  };

  // Handle file input for image upload
 
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 md:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Back to Marketplace Button */}
        <Link
          to="/home"
          className="inline-flex items-center mb-6 px-4 py-2 rounded-lg text-customGreen border border-customGreen hover:bg-customGreen hover:text-white transition-all duration-200 group font-semibold shadow"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Marketplace
        </Link>
        <h1 className="text-4xl font-extrabold text-customGreen mb-8 text-center drop-shadow">Sell Your Items</h1>
        {/* Add/Edit Item Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 flex flex-col md:flex-row gap-8 items-center animate-fade-in">
          {/* Image Preview */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 rounded-xl border-2 border-dashed border-customGreen flex items-center justify-center bg-gray-100 overflow-hidden mb-2">
              {
                <img src={image} alt="Preview" className="object-cover w-full h-full" onError={e => e.target.style.display='none'} />
              
                // <PlusIcon className="h-12 w-12 text-customGreen opacity-40" />
              }
            </div>
            <span className="text-xs text-gray-400 text-center">Image preview</span>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-customGreen">Item Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
                placeholder=""
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-customGreen">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
                rows="2"
                placeholder="....."
                required
              />
            </div>
            <div className="flex gap-4">
          <div className="w-1/3">
              <label className="block text-sm font-semibold text-customGreen">Price ($)</label>
              <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
              />
          </div>
          <div className="w-1/3">
        <label className="block text-sm font-semibold text-customGreen">Quantity</label>
        <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
            required
            min="1"
            placeholder="1"
        />
    </div>
    <div className="w-1/3">
        <label className="block text-sm font-semibold text-customGreen">Category</label>
        <select
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
            required
        >
            <option value="">Select a category</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="books">Books</option>
            <option value="other">Other</option>
        </select>
    </div>
</div>
            <div>
              <label className="block text-sm font-semibold text-customGreen">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen bg-white"
                required
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="flex-1 bg-customGreen text-white py-2 px-4 rounded-lg font-bold shadow hover:bg-green-700 transition-all duration-150"
              >
                {isEditing ? 'Update Item' : 'Add Item'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex items-center gap-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-bold shadow hover:bg-gray-300 transition-all duration-150"
                >
                  <XMarkIcon className="h-5 w-5" /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Items List */}
        <div className="">
          <h2 className="text-2xl font-bold text-customGreen mb-6">Your Items for Sale</h2>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
              <img src="/assets/empty-box.svg" alt="No items" className="w-32 h-32 mb-4 opacity-60" onError={e => e.target.style.display='none'} />
              <p className="text-gray-400 text-lg font-semibold">No items yet. Start by adding your first item!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              {(Array.isArray(items) ? items : []).map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-200 relative group">
                  <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-2">
                    {
                      <img src={item.imageURL} alt={item.productName} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" onError={e => e.target.style.display='none'} />
                  
                    }
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${categoryColors[item.categoryName] || 'bg-gray-100 text-gray-800'}`}>{item.categoryName || 'Other'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{item.productName}</h3>
                  <p className="text-gray-500 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-customGreen font-extrabold text-xl">${item.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-all"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Sell;