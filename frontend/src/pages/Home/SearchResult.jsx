import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MarketNavbar from '../../components/Home/MarketNavbar';
import ItemCard from '../../components/Home/ItemCard';
import { SearchService } from '../../services/api';
import { CustomerService } from '../../services/api';
import axios from 'axios';
const SearchResults = () => {
  const { searchQuery } = useOutletContext();  // Get searchQuery from the context
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [quantities, setQuantities] = useState({});
  const [loaded,setLoaded] = useState(false);

  // // Fetch categories
  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/products/categories')
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data));
  // }, []);



  //Filter items based on searchQuery or selectedCategory
  useEffect(() => {
    let filtered = [...items];
    // if (selectedCategory !== 'all') {
    //   // If a category is selected, show all items in that category
    //   filtered = filtered.filter(item => item.category === selectedCategory);
    // } else 
      if (searchQuery.trim()) {
      // If no category selected, apply search
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  }, [items, searchQuery, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };


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

  const totalQuantity = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);

  return (
    <div className="p-4 ml-4">
      <MarketNavbar
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        totalQuantity={totalQuantity}
      />
      <h2 className="text-xl font-semibold mb-4">
        Search results for "{searchQuery}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            quantity={quantities[item.id] || 0}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
