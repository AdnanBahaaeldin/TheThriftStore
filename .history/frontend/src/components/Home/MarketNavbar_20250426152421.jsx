import React from 'react'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
const MarketNavbar = ({
    categories,
    selectedCategory,
    handleCategorySelect,
    totalQuantity
  }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); 

  // const handleShopAll = () => {
  //   handleCategorySelect('all');
  //   navigate('/'); // go to main marketplace
  // };

  const handleNavigation = (category) => {
    handleCategorySelect(category);
    
    if (category === "all") {
      navigate('/');
    } else {
      const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
      navigate(`/${formattedCategory}`);
    }
    
    setShowDropdown(false);
  };

  return (
          <div className="flex items-center justify-between mb-6 relative sticky top-[64px] z-40 bg-white">
            {/* Left side: buttons */}
            <div className="flex items-center gap-4">
              <button
                className={`group inline-flex flex-col items-start text-sm p-4 text-gray-500 hover:text-gray-950 ${
                  selectedCategory === "all" ? "text-gray-950" : "text-gray-500 hover:text-gray-950"
                }`}
                onClick={() => handleNavigation('all')}
              >
                <span className="inline-flex items-center gap-1 relative">
                  Shop All
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-black transform transition-transform duration-300 origin-center ${
                      selectedCategory === "all" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </span>
              </button>
    
              {/* Category Dropdown */}
              <div className="relative group inline-block">
                <button
                  className={`inline-flex flex-col items-start p-4 text-gray-500 group-hover:text-gray-950 ${
                    selectedCategory !== "all" ? "text-gray-950" : "text-gray-500 hover:text-gray-950"
                  }`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="inline-flex items-center gap-1 relative">
                    Category
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-500 group-hover:text-gray-950 transition duration-200"
                    />
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-0.5 bg-black transform transition-transform duration-300 origin-center ${
                        selectedCategory !== "all" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </span>
                </button>
    
                {/* Dropdown menu */}
                {showDropdown && (
                  <ul className="absolute z-10 mt-2 w-48 bg-white shadow-md border rounded text-gray-700">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleNavigation(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </li>
                  ))}
                </ul>
                )}
              </div>
            </div>
    
            {/* Right side: Cart Icon */}
            <div className="p-4 cursor-pointer hover:text-gray-700 transition">
              <ShoppingCartIcon className="w-8 h-8 text-customGreen" />
              {totalQuantity > 0 && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-customGreen rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
    
  )
}

export default MarketNavbar
