import React, { useState } from 'react';
import CreditCardForm from '../../components/CreditCardForm/CreditCardForm'; 

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');

  const customer = {
    name: 'John Doe',
    address: '1234 Elm Street, Springfield',
    phone: '+1 234 567 8900',
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-6xl font-bold text-gray-800 py-6">Checkout</h2>

      {/* Customer Summary */}
      <div className="space-y-2">
        <p className="font-semibold text-gray-500">Customer Summary:</p>
        <p><span className="font-semibold">Name:</span> {customer.name}</p>
        <p><span className="font-semibold">Shipping Address:</span> {customer.address}</p>
        <p><span className="font-semibold">Phone:</span> {customer.phone}</p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-2">
            <h3 className="font-semibold text-gray-500">Select Payment Method:</h3>
            <div className="flex gap-4">
                {['wallet', 'card'].map((method) => (
                <div
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`cursor-pointer px-5 py-3 rounded-xl border transition 
                    ${
                        paymentMethod === method
                        ? 'bg-customGreen text-white border-green-600'
                        : 'bg-gray-100 text-gray-800 border-gray-300'
                    }`}
                >
                    {method === 'wallet' ? 'Wallet' : 'Credit Card'}
                </div>
                ))}
            </div>
        </div>

      {/* Conditional: Show Card Form */}
      {paymentMethod === 'card' && (
        <div>
          <h3 className="font-semibold text-gray-500">Enter Card Details:</h3>
          <CreditCardForm />
        </div>
      )}

      {/* Place Order Button */}
      <button type ='submit' className="w-full bg-customGreen text-white py-2 rounded hover:bg-green-700 transition">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
