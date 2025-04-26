import React, { useEffect, useState } from 'react';
import ItemCard from '../../components/Home/ItemCard';
import MarketNavbar from '../../components/Home/MarketNavbar';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const categoryFromURL = location.pathname.slice(1); // remove the "/" at the beginning


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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const totalQuantity = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
  
  // Fetch categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  // Fetch items
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch(err => console.error("Error fetching items:", err));
  }, []);

  useEffect(() => {
    if (categoryFromURL && categoryFromURL !== 'all') {
      handleCategorySelect(categoryFromURL);
    } else {
      handleCategorySelect('all');
    }
  }, [categoryFromURL, handleCategorySelect]);

  // Filter items by selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.category === selectedCategory);
      setFilteredItems(filtered);
    }
  }, [selectedCategory, items]);






  return (
    <div className="p-4 ml-4">
      <MarketNavbar
      categories={categories}
      selectedCategory={selectedCategory}
      handleCategorySelect={handleCategorySelect}
      totalQuantity={totalQuantity}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} quantity={quantities[item.id] || 0}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}/>
          ))}
      </div>
    </div>
  );
};

export default Marketplace;