import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MarketNavbar from '../../components/Home/MarketNavbar';
import ItemCard from '../../components/Home/ItemCard';

const SearchResults = () => {
  const { searchQuery } = useOutletContext();  // Get searchQuery from the context
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

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
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  }, [items, searchQuery, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4 ml-4">
      <MarketNavbar
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
      />
      <h2 className="text-xl font-semibold mb-4">
        Search results for "{searchQuery}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
