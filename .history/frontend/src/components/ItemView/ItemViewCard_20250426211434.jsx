import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid';
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
function ItemViewCard() {
    const { id } = useParams();
    const location = useLocation();
    const item = location.state?.item;
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
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
              <StarIcon className="w-6 h-6 text-yellow-300" />
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
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-0 rounded-md border-gray-200 border bg-white shadow-md mt-10 mb-10">
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
                  <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
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
      <div className="flex items-center gap-4">
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
        <button onClick={handleIncrement} className="flex items-center gap-2 bg-indigo-100 text-indigo-600 font-semibold rounded-full px-6 py-3 hover:bg-indigo-200 transition">
          <ShoppingCartIcon className="h-5 w-5" />
          Add to cart
        </button>
      </div>

      {/* Favorite (heart) and Buy Now */}
      <div className="flex items-center gap-4">
        {/* Buy Now Button */}
        <button className="flex-1 bg-indigo-600 text-white font-semibold rounded-full px-6 py-4 hover:bg-indigo-700 transition">
          Buy Now
        </button>
      </div>
    </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      );
}

export default ItemViewCard