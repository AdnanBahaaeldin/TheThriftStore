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

  export default function ItemCard({item, quantity, onIncrement, onDecrement }) {
    
    // const [quantity, setQuantity] = useState(0);

    // const handleAddToCart = () => {
    //   setQuantity(1);
    // };
    // const handleIncrement = () => {
    //   setQuantity((prev) => prev + 1);    
    // };
    // const handleDecrement = () => { 
    //   setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    // };
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
              <div className="justify-between flex items-center bg-customGreen gap-2 p-2.5 w-36 rounded-lg text-white shadow-none focus:scale-105 focus:shadow-none active:scale-100">
              <motion.svg onClick={onDecrement} whileTap={{ scale: 0.85 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </motion.svg>
              <span >{quantity}</span>
              <motion.svg onClick={onIncrement} whileTap={{ scale: 1.15 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </motion.svg>
            </div>
            ) : (
              <Button
                onClick={onIncrement}
                ripple={false} 
                className="justify-between flex items-center bg-customGreen text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"></path>
                </svg>Add to Cart
              </Button>
            )}
        </CardFooter>
      </Card>
    );
  }