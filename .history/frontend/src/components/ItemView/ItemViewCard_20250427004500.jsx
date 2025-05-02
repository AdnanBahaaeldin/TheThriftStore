import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid';
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import MarketNavbar from '../../components/Home/MarketNavbar';
import { useEffect } from 'react';
function ItemViewCard() {
    const { id } = useParams();
    const location = useLocation();
    const item = location.state?.item;
    const [quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [items, setItems] = useState([]);
    const categoryFromURL = decodeURIComponent(location.pathname.slice(1)).replace(/-/g, ' '); 
    const [showDropdown, setShowDropdown] = useState(false);
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

    // Fetch categories
      useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
          .then(res => res.json())
          .then(data => setCategories(data))
          .catch(err => console.error("Error fetching categories:", err));
      }, []);
      

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowDropdown(false);
    };

    useEffect(() => {
        if (categoryFromURL && categoryFromURL !== 'all') {
          handleCategorySelect(categoryFromURL);
        } else {
          handleCategorySelect('all');
        }
      }, [categoryFromURL, handleCategorySelect]);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      
        return (
          <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
              <StarIcon key={`full-${i}`} className="w-6 h-6 text-yellow-500" />
            ))}
            {hasHalfStar && (
              <StarIcon className="w-5 h-5 text-yellow-300" />
            )}
            {[...Array(emptyStars)].map((_, i) => (
              <StarIcon key={`empty-${i}`} className="w-6 h-6 text-gray-300" />
            ))}
          </div>
        );
      };
      if (!item) {
        return <div>Item not found</div>;
      }
    return (
        <section className="relative">
            <MarketNavbar
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
            totalQuantity={quantity}
            />
          <div className="w-3/4 mx-auto px-4 sm:px-6 lg:px-0 rounded-r-md border-gray-300 border bg-white mt-10 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
              {/* Image Section */}
              <div className="img">
                <div className="img-box h-full max-lg:mx-auto">
                  <img
                    src={item.image}
                    alt="item image"
                    className="max-lg:mx-auto lg:ml-auto h-full object-cover"
                  />
                </div>
              </div>

              {/* Data Section */}
              <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                <div className="data w-full max-w-xl">
                  <p className="text-lg font-medium leading-8 text-customGreen mb-4">
                    {item.category}
                  </p>
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                    {item.title}
                  </h2>
    
                  <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                      ${item.price} 
                    </h6>
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 text-grey-500">
                        {renderStars(item.rating?.rate)}
                        {item.rating?.rate.toFixed(1)} ({item.rating?.count})
                    </div>
                  </div>
                  <p className='text-gray-500 mb-10'>{item.description}</p>
                  <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
                    {/* Quantity and Add to Cart */}
                    <div className="flex items-center gap-4 justify-between">
                        {/* Quantity Selector */}
                        <div className="flex items-center border rounded-full overflow-hidden">
                        <button
                            onClick={handleDecrement}
                            className="px-4 py-2 text-lg font-semibold hover:bg-gray-100"
                        >
                            –
                        </button>
                        <div className="px-6 py-2 text-lg font-semibold">{quantity}</div>
                        <button
                            onClick={handleIncrement}
                            className="px-4 py-2 text-lg font-semibold hover:bg-gray-100"
                        >
                            +
                        </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button onClick={handleIncrement} className="flex items-center gap-2 bg-teal-50 text-customGreen font-semibold rounded-full px-6 py-3 hover:bg-indigo-200 transition">
                        <ShoppingCartIcon className="h-5 w-5" />
                        Add to cart
                        </button>
                    </div>

                    {/* Favorite (heart) and Buy Now */}
                    <div className="flex items-center gap-4">
                        {/* Buy Now Button */}
                        <button className="flex-1 bg-customGreen text-white font-semibold rounded-full px-6 py-4 hover:bg-indigo-700 transition">
                        Buy Now
                        </button>
                    </div>
                    </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="w-3/4 mx-auto p-4  rounded-md border-gray-300 border bg-white mt-10 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Product Ratings & Reviews</h2>

            {/* Overall rating */}
            <div className="flex items-center gap-2 mb-6">
                {renderStars(item.rating?.rate)}
                <p className="text-gray-600">Based on {item.rating?.count} reviews</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left side - Ratings breakdown */}
                <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => {
                        let percent = 0;

                        if (item.rating.rate >= star) {
                            percent = 80; // full bar if rating is higher
                        } else if (item.rating.rate + 1 > star) {
                            percent = 40; // half bar if close
                        } else {
                            percent = 10; // small bar otherwise
                        }

                        return (
                            <div key={star} className="flex items-center gap-2">
                                <span className="text-gray-700 text-sm w-4">{star}</span>
                                <StarIcon className="w-4 h-4 text-yellow-300" />
                                <div className="flex-1 bg-gray-200 h-2 rounded overflow-hidden">
                                <div
                                className="bg-yellow-400 h-full rounded"
                                style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                            <span className="text-gray-600 text-sm w-10">{percent}%</span>
                            </div>
                        );
                    })}

                {/* Write review button */}
                <div className="mt-8">
                    <h3 className="font-semibold mb-1">Share your thoughts</h3>
                    <p className="text-sm text-gray-500 mb-3">
                    If you’ve used this product, share your thoughts with other customers
                    </p>
                    <button className="border rounded px-4 py-2 text-sm hover:bg-gray-100">
                    Write a review
                    </button>
                </div>
                </div>

                {/* Right side - Reviews */}
                <div className="space-y-8">
                {/* Single review */}
                {[
                    {
                    name: 'Emily Selman',
                    img: '/path-to-emily.jpg',
                    stars: 5,
                    review:
                        'This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.',
                    },
                    {
                    name: 'Hector Gibbons',
                    img: '/path-to-hector.jpg',
                    stars: 5,
                    review:
                        'Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!',
                    },
                    {
                    name: 'Mark Edwards',
                    img: '/path-to-mark.jpg',
                    stars: 4,
                    review:
                        'I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.',
                    },
                ].map((user, idx) => (
                    <div key={idx} className="flex gap-4 items-start border-b pb-6">
                    <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <div className="flex text-yellow-400 text-sm mb-2">
                        {'★'.repeat(user.stars) + '☆'.repeat(5 - user.stars)}
                        </div>
                        <p className="text-gray-600 italic">{user.review}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>

        </section>
      );
}

export default ItemViewCard