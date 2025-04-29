import React, { useEffect, useState } from "react";
import mockUser from "./_mock_";

export default function UserProfile() {
    const [user, setUser] = useState(null);
  

    useEffect(() => {
        // Simulate API delay
        setTimeout(() => {
          setUser(mockUser);
        }, 500);
      }, []);
    if (!user) return <div className="text-center p-4">Loading...</div>;
  
    return (
        <div className="max-w-5xl mx-auto  bg-gray-100 rounded-xl overflow-hidden mt-10 shadow-lg relative p-7">
          {/* Flex Row: Avatar + Info */}
          <div className="flex">
            {/* Left: Avatar */}
            <div className="w-1/4 flex items-center justify-center p-6">
                <div className="w-32 h-32 rounded-full border-4 border-customGreen overflow-hidden">
                    <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    />
                </div>
            </div>
      
            {/* Right: Info Box */}
            <div className="w-3/4 bg-white p-6 flex flex-col justify-center shadow-xl rounded-xl">
              <h2 className="text-4xl font-bold mb-2 py-3">{user.name}</h2>
              <p className="text-gray-600 mb-1">{user.email}</p>
              <p className="text-gray-600 mb-1">{user.address}</p>
              <p className="text-gray-600 mb-1">{user.phoneNumber}</p>
              {/* <p className="text-xl text-gray-700 font-medium"> Wallet Balance: <span className="text-4xl font-bold text-customGreen"> {user.wallet}</span> EGP</p> */}
              
            </div>
          </div>

          <div className="flex space-x-4 ">  
        
                <div className="w-1/4 mt-4 flex items-center gap-4 bg-customGreen shadow-md rounded-xl p-4 border border-gray-200 shadow-xl">
                        <div className="bg-green-100 text-green-700 p-3 rounded-full text-2xl">
                            💰
                        </div>
                        <div>
                            <p className="text-sm text-white uppercase">Wallet Balance</p>
                            <p className="text-3xl font-bold text-white">
                            {user.wallet} <span className="text-lg font-medium text-white">EGP</span>
                            </p>
                        </div>
                </div>
                <div className="w-2/4 bg-white p-6 rounded-xl shadow mt-4 shadow-xl">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">About the Seller</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Michoo is a passionate seller with years of experience providing top-notch service and quality products. 
                        Known for reliability, speed, and a focus on customer satisfaction.
                    </p>
                </div>
                <div className="w-1/4 bg-white p-6 rounded-xl shadow mt-4 shadow-xl">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Seller Rating</h3>
                    <div className="flex items-center space-x-1 text-yellow-500 text-2xl">
                        {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < Math.floor(user.rating) ? "★" : "☆"}</span>
                        ))}
                    </div>
                    <p className="text-gray-600 mt-2">
                        {user.rating.toFixed(1)} out of 5
                    </p>
                </div>

                
            </div>        

      
          {/* Edit Section */}
    <div className=" w-4/4 bg-white p-6 mt-4 rounded-b-xl shadow-xl rounded-xl">
      <h3 className="text-xl font-semibold mb-4">Edit User Info</h3>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"> Name</label>
          <input
            type="text"
            placeholder={user.name}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder={user.phoneNumber}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            placeholder={user.address}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-customGreen text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Update Info
        </button>
      </form>
    </div>
  </div>
      );
      



    
    }