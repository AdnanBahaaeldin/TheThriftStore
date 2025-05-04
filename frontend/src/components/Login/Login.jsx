import * as React from 'react';
//import { useState } from 'react';
import logo from '../../assets/logo4.png'; 




import { useState } from 'react';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (isSignup) {
      // Simple validation logic
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        formData.password !== formData.confirmPassword
      ) {
        alert('Please fill all fields correctly.');
        return;
      }
      console.log('Signup submitted:', formData);
    } else {
      if (!formData.email || !formData.password) {
        alert('Please enter email and password.');
        return;
      }
      console.log('Login submitted:', formData);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="px-10 py-14 rounded-3xl bg-white">
        <h1 className="text-5xl font-bold">
          Welcome to our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2cada0] to-[#115e59]">store</span>
        </h1>
        <p className="font-medium text-lg text-gray-500 mt-4 mb-7 text-center">The only store you need</p>

        {isSignup && (
          <div className="mb-6">
            <label className="text-lg font-medium">Name</label>
            <input
              name="name"
              className="w-full border-2 rounded-xl p-4 mt-1 border-gray-150"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border-2 rounded-xl p-4 mt-1 border-gray-150"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mt-8">
          <label className="text-lg font-medium">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border-2 rounded-xl p-4 mt-1 border-gray-150"
            placeholder="At least 4 characters"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {isSignup && (
          <div className="mt-8">
            <label className="text-lg font-medium">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="w-full border-2 rounded-xl p-4 mt-1 border-gray-150"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="flex flex-col mt-20">
          <button
            onClick={handleSubmit}
            className="text-lg font-bold text-white py-4 rounded-3xl active:scale-[.98] ease-in-out hover:scale-[1.01]"
            style={{ backgroundColor: '#2cada0' }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </div>

        <div>
          <p className="text-center text-gray-500 mt-4">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="font-bold"
              style={{ color: '#2cada0' }}
              type='submit'
            >
              {isSignup ? 'Login' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>

      {/* Logo Section */}
      <div className="hidden lg:flex h-full">
        <img src={logo} alt="Store Logo" />
      </div>
    </div>
  );
}
