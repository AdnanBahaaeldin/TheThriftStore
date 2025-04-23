import { BellIcon, UserIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo2.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import React from 'react';


export default function NavBar({ name }) {
  return (
    <nav className="bg-white shadow">
      <div className="pr-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center flex-shrink-0 pr-4 ">
                <img
                alt="Your Company"
                src={logo}
                className="size-16 w-auto"
                />
            </div>

            <div className="ml-6 flex space-x-12 ">
                <Link to="/" className="text-customGreen hover:text-black font-medium pr-8">
                    Home    
                </Link>
                <Link to="/sell" className="text-customGreen hover:text-black font-medium pr-8">
                    Sell            
                </Link>
                <Link to="/about" className="text-customGreen hover:text-black font-medium pr-8">
                    About Us
                </Link>
            </div>
            <div className="flex items-center border border-customGreen rounded-md px-3 py-2 w-full max-w-md">
                <input
                    type="text "
                    placeholder="Search..."
                    className="w-full outline-none text-black placeholder-customGreen"
                />
                <button>
                    <MagnifyingGlassIcon className="h-5 w-5 text-customGreen ml-2 cursor-pointer hover:text-black" />
                </button>
            </div>
          <div className="flex items-center space-x-4 ">
                <div>
                <p className="text-sm text-customGreen">Hello, {name}</p>
                </div>

                <button className="text-customGreen hover:text-black p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-black">
                <UserIcon className="h-6 w-6" />
                </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
