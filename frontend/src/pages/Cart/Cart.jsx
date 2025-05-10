import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CartService, CustomerService } from '../../services/api';
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleIncrement = async (item) => {
    console.log(item.id);
    var token = localStorage.getItem('token') 
    updateQuantity(item.id, item.quantity +1)
    await CartService.updateQuantity(item.id,item.quantity+1,{ headers: {
      Authorization: `Bearer ${token}`,
    }});

  }

  const handleDecrement = async (item) => {
    var token = localStorage.getItem('token') 
    updateQuantity(item.id, item.quantity - 1)
    await CartService.updateQuantity(item.id,item.quantity-1,{ headers: {
      Authorization: `Bearer ${token}`,
    }});
  }

  const handleCheckout = async () => {
    var token = localStorage.getItem('token') 
    const response = await CartService.checkout({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(response.status < 300){
        alert("ordered placed successfuly");
        window.location.reload(); 
      }else{
        alert("Error occurred :(");
      }
  };

  const handleRemove = async (item) => {
    var token = localStorage.getItem('token') 
    await CartService.removeFromCart(item.id,{ headers: {
      Authorization: `Bearer ${token}`,
    }});
    removeFromCart(item.id)
  }

  const handleGoBack = () => {
    navigate(-1); // previous page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={handleGoBack}
        className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:text-white hover:bg-customGreen transition-all duration-200 mb-6 group"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Continue Shopping
      </button>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-[#2cada0] text-white rounded-lg hover:bg-[#115e59] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <img
                  src={item.imageURL}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold">{item.productName}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="px-2 py-1 border rounded-l"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                    <button
                      onClick={ () => handleIncrement (item)}
                      className="px-2 py-1 border rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemove (item)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 py-3 bg-[#2cada0] text-white rounded-lg hover:bg-[#115e59] transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 