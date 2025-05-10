import React, { useEffect, useState } from "react";
import CreditCardForm from "../../components/CreditCardForm/CreditCardForm"; 
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [orders, setOrders] = useState([]);

useEffect(() => {
  if (!isFetched) {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:8080/dashboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setUser(response.data);
        console.log(response.data);
        setIsFetched(true);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setIsFetched(false);
      }
    };

    fetchData();
  }
}, [isFetched]);

const handleInputChange=(e)=>{
  const {name,value} = e.target;
  setUser(prev => ({
      ...prev,
      [name]: value
    }));
}

const handleBalance= async (e) => {
  e.preventDefault();
  console.log(typeof (amount));
  console.log(amount);
const token = localStorage.getItem('token');
const numericAmount = parseInt(amount);
console.log(typeof(numericAmount));
const response = await axios.post('http://localhost:8080/customer/add/balance',numericAmount,
 {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
}
)
if(response.status<300){
  alert(`Added ${numericAmount} EGP to wallet!`);
}else{
  alert('error ocurred while updating balance');
}
  setShowModal(false);
  setAmount("");
  setStep(1);
  window.location.reload(); 
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response =  axios.put('http://localhost:8080/dashboard/update', user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
}

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/orders/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
      console.log(orders)
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  fetchOrders();
}, []); // Empty array means it runs once on mount


  if (!user) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto bg-gray-100 rounded-xl overflow-hidden mt-10 shadow-lg relative p-7">
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
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/4 mt-4 items-center bg-customGreen shadow-md rounded-xl p-4 border border-gray-200 shadow-xl">
          <div className="flex space-x-3">
            <div className="bg-green-100 text-green-700 p-3 rounded-full text-3xl">💰</div>
            <div>
              <p className="text-sm text-white uppercase">Wallet Balance</p>
              <p className="text-4xl font-bold text-white">
                {user.custBalance} <span className="text-lg font-medium text-white">EGP</span>
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setShowModal(true);
                setStep(1);
              }}
              className="mt-10 ml-20 text-white text-xl rounded-lg shadow hover:bg-green-700 transition p-1"
            >
              Add Balance
            </button>
          </div>
        </div>

        <div className="w-2/4 bg-white p-6 rounded-xl shadow mt-4 shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Latest Orders</h3>
          {orders.map((order) => {
            <div> 
                <p className="text-gray-600 leading-relaxed">
                    {order.orderDate}
                </p>
                  <p className="text-gray-600 leading-relaxed">
                    {order.totalAmount}
                </p>
            </div>
          })}
         
        </div>

        {/* <div className="w-1/4 bg-white p-6 rounded-xl shadow mt-4 shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Seller Rating</h3>
          <div className="flex items-center space-x-1 text-yellow-500 text-2xl">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.floor(user.rating) ? "★" : "☆"}</span>
            ))}
          </div>
          <p className="text-gray-600 mt-2">{user.rating.toFixed(1)} out of 5</p>
        </div> */}
      </div>

      {/* Edit Section */}
      <div className="w-4/4 bg-white p-6 mt-4 rounded-b-xl shadow-xl rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Edit User Info</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder={user.name}
              name='name'
              value={user.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder={user.phoneNumber}
              name='phoneNumber'
              value={user.phoneNumber}
              onChange={handleInputChange}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Enter Amount</h2>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in EGP"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-customGreen text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => setStep(2)}
                    disabled={!amount}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Details</h2>
                <form className="space-y-4">
                  
                  <CreditCardForm/>

                  <div className="flex justify-end gap-2">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-customGreen text-white px-4 py-2 rounded hover:bg-green-700"
                      onClick={handleBalance}
                    >
                      Complete
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
