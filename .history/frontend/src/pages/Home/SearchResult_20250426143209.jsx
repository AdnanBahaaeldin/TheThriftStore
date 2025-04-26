import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MarketNavbar from '../../components/Home/MarketNavbar';
import ItemCard from '../../components/Home/ItemCard';

const SearchResults = () => {
  const { searchQuery } = useOutletContext();  // Get searchQuery from the context
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});

  // Fetch categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Fetch all items once
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Filter items based on searchQuery or selectedCategory
  useEffect(() => {
    let filtered = [...items];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        {selectedCategory !== 'all'
          ? `Items in category "${selectedCategory}"`
          : `Search results for "${searchQuery}"`}
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
