import React, { useState } from 'react';
import Visalogo from '../../assets/visaLogo.png'; 


const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="relative bg-gradient-to-r from-customGreen to-green-900 text-white p-5 rounded-xl shadow-inner space-y-10">
            {/* Logo in the top-right */}
            <img 
                src={Visalogo}
                alt="Card Logo" 
                className="absolute top-3 right-3 w-20 h-auto"
            />
        <div className="text-lg tracking-widest">
          {state.number || '•••• •••• •••• ••••'}
        </div>
        <div className="flex justify-between text-sm">
          <span>{state.name || 'FULL NAME'}</span>
          <span>{state.expiry || 'MM/YY'}</span>
        </div>
        <div className="text-right text-sm">
          CVC: {state.cvc || '•••'}
        </div>
      </div>

      <form className="space-y-4">
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* <input
          type="number"
          name="Amount"
          placeholder="Amount"
          
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        /> */}
      </form>
{/* 
        <button type="submit" className="w-full bg-customGreen text-white rounded px-4 py-2 transition duration-200  active:scale-[.98] ease-in-out hover:scale-[1.01]">
        <span className="font-semibold">Pay</span>

        </button> */}
    </div>
  );
};

export default PaymentForm;
