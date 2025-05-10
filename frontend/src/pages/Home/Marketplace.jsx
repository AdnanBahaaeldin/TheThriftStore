import React, { useEffect, useState } from 'react';
import ItemCard from '../../components/Home/ItemCard';
import MarketNavbar from '../../components/Home/MarketNavbar';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CustomerService } from '../../services/api';
import axios from 'axios';

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const categoryFromURL = decodeURIComponent(location.pathname.slice(1)).replace(/-/g, ' '); 
  const { cartItems } = useCart();
  const [loaded, setLoaded] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  useEffect(() => {
    const fetchProductsAndImages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found.");
        return;
      }
  
      try {
        // Step 1: Fetch products
        const productResponse = await CustomerService.getAllProducts({
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

  useEffect(() => {
    if (categoryFromURL && categoryFromURL !== 'all') {
      handleCategorySelect(categoryFromURL);
    } else {
      handleCategorySelect('all');
    }
  }, [categoryFromURL, handleCategorySelect]);

  return (
    <div className="p-4 ml-4">
      <MarketNavbar
      categories={categories}
      selectedCategory={selectedCategory}
      handleCategorySelect={handleCategorySelect}
      totalQuantity={totalQuantity}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {console.log("filteredItems =", items, "type:", typeof items)}
      {console.log("hi from items")}
      {console.log(items)}
      {(items || []).map((item) => (
        <ItemCard
          key={item.id}
          item = {item}
        />
      ))}
      </div>
    </div>
  );
};

export default Marketplace;