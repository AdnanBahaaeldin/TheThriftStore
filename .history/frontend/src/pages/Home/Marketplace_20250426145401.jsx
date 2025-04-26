import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ItemCard from '../../components/Home/ItemCard';
import MarketNavbar from '../../components/Home/MarketNavbar';

const Marketplace = () => {
  const { searchQuery } = useOutletContext(); // ← get the searchQuery from context

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState({});

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

  // Re-filter items whenever selectedCategory or searchQuery changes
  useEffect(() => {
    let filtered = [...items];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [items, selectedCategory, searchQuery]); // ← observe searchQuery too!

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

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

export default Marketplace;
