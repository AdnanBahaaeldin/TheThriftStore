import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { StarIcon } from '@heroicons/react/20/solid';
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ItemCard({item}) {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  
  const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className="w-4 h-4 text-yellow-500" />
        ))}
        {hasHalfStar && (
          <StarIcon className="w-4 h-4 text-yellow-300" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={item.image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2">
          <Typography color="blue-gray" className="font-medium">
            {item.title}
          </Typography>
          <div className="flex items-center gap-1 text-grey-950">
            {renderStars(item.rating?.rate)}
            {item.rating?.rate.toFixed(1)} ({item.rating?.count})
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0 justify-between flex items-center">
        <Typography color="blue-gray" className="font-medium">
          ${item.price}
        </Typography>
        
        {quantity > 0 ? (
          <div 
            onClick={() => navigate('/cart')}
            className="justify-between flex items-center bg-customGreen gap-2 p-2.5 w-36 rounded-lg text-white shadow-none cursor-pointer hover:bg-[#115e59] transition-colors"
          >
            <span>View in Cart ({quantity})</span>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            ripple={false} 
            className="justify-between flex items-center bg-customGreen text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"></path>
            </svg>Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}