import { BellIcon, UserIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo3.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import React from 'react';


export default function NavBar({ name, openSearch }) {
  return (
    <nav className="bg-customGreen shadow relative sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6 relative">
        {/* Left Links */}
        <div className="flex space-x-12 z-10">
          <Link to="/home" className="text-white font-medium">
            Home    
          </Link>
          <Link to="/sell" className="text-white font-medium">
            Sell            
          </Link>
          <Link to="/about" className="text-white font-medium">
            About Us
          </Link>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            alt="Your Company"
            src={logo}
            className="h-16 w-auto"
          />
        </div>

        {/* Right User + Icons */}
        <div className="flex items-center space-x-4 z-10">
          <p className="text-sm text-white">Hello, {name}</p>
          <button className="text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white">
            <UserIcon className="h-6 w-6" />
          </button>
          <button>
            <MagnifyingGlassIcon onClick={openSearch} className="h-5 w-5 text-white cursor-pointer" />
          </button>
        </div>
      </div>
    </nav>
  );
}
