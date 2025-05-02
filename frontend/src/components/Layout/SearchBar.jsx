import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onClose, searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      onClose();             // Close the overlay
      navigate('/search');   // Go to the search results page
    }
  };

  return (
    <nav className="bg-white shadow relative">
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-16 px-6 relative">
        <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-black placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update query as user types
          />
          <button type="submit">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-2 cursor-pointer hover:text-black" />
          </button>
        </div>
        <XMarkIcon onClick={onClose} className="h-6 w-6 text-black cursor-pointer ml-4" />
      </form>
    </nav>
  );
}

export default SearchBar;
