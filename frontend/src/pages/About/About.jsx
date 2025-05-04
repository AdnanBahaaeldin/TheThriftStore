// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// const About = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center w-full">
//       <div className="w-full bg-white rounded-none shadow-xl p-8 animate-fade-in">
//       <Link
//           to="/"
//           className="inline-flex items-center mb-6 px-4 py-2 rounded-lg text-customGreen border border-customGreen hover:bg-customGreen hover:text-white transition-all duration-200 group font-semibold shadow"
//         >
//           <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
//           Back to Marketplace
//         </Link>
//         <h1 className="text-4xl font-extrabold text-customGreen mb-6 text-center drop-shadow">About Us</h1>
//         {/* Marketplace History */}
//         <section className="mb-8">
//           {/* <h2 className="text-2xl font-bold text-customGreen mb-2">Our Story</h2> */}
//           <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
//             The ThriftStore Marketplace was founded in 2023 with a vision to make sustainable shopping accessible to everyone. What started as a small community project quickly grew into a thriving online marketplace, connecting sellers and buyers from all walks of life. Our mission is to give pre-loved items a second chance, reduce waste, and empower individuals to turn their unused goods into value for others. Today, we are proud to serve a vibrant community of eco-conscious shoppers and passionate sellers.
//           </p>
//         </section>
//         {/* Facts Section */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold text-customGreen mb-2 text-center">Marketplace Facts</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center items-center max-w-6xl mx-auto">
//             <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow">
//               <span className="text-3xl font-extrabold text-customGreen">2,500+</span>
//               <span className="text-gray-600 font-semibold mt-1">Products Sold</span>
//             </div>
//             <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow">
//               <span className="text-3xl font-extrabold text-customGreen">1,800+</span>
//               <span className="text-gray-600 font-semibold mt-1">Happy Customers</span>
//             </div>
//             <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow">
//               <span className="text-3xl font-extrabold text-customGreen">120+</span>
//               <span className="text-gray-600 font-semibold mt-1">Active Sellers</span>
//             </div>
//             <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow">
//               <span className="text-3xl font-extrabold text-customGreen">5,000+</span>
//               <span className="text-gray-600 font-semibold mt-1">Items Listed</span>
//             </div>
//           </div>
//         </section>
//         {/* Team Section */}
//         <section>
//           <h2 className="text-2xl font-bold text-customGreen mb-2 text-center">Meet the Team</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 max-w-6xl mx-auto">
//             <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
//               <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">1</div>
//               <span className="font-semibold text-gray-700">Member - 1</span>
//               <span className="text-gray-500 text-sm">Frontend Developer</span>
//             </div>
//             <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
//               <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">2</div>
//               <span className="font-semibold text-gray-700">Member - 2</span>
//               <span className="text-gray-500 text-sm">Backend Developer</span>
//             </div>
//             <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
//               <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">3</div>
//               <span className="font-semibold text-gray-700">Member - 3</span>
//               <span className="text-gray-500 text-sm">Backend Developer</span>
//             </div>
//             <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
//               <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">4</div>
//               <span className="font-semibold text-gray-700">Member - 4</span>
//               <span className="text-gray-500 text-sm">Backend Developer</span>
//             </div>
//             <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
//               <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">5</div>
//               <span className="font-semibold text-gray-700">Member - 5</span>
//               <span className="text-gray-500 text-sm">Full Stack Developer</span>
//             </div>
//             <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
//               <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">6</div>
//               <span className="font-semibold text-gray-700">Member - 6</span>
//               <span className="text-gray-500 text-sm">Full Stack Developer</span>
//             </div>
//             <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
//               <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">7</div>
//               <span className="font-semibold text-gray-700">Member - 7</span>
//               <span className="text-gray-500 text-sm">Full Stack Developer</span>
//             </div>
//             <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
//               <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">8</div>
//               <span className="font-semibold text-gray-700">Member - 8</span>
//               <span className="text-gray-500 text-sm">Full Stack Developer</span>
//             </div>
//           </div>
//         </section>
//       </div>
//       <style>{`
//         .animate-fade-in {
//           animation: fadeIn 0.7s;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default About; 


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const teamMembers = [
  { id: 1, name: 'omar', role: 'Frontend Developer' },
  { id: 2, name: 'omar', role: 'Backend Developer' },
  { id: 3, name: 'omar', role: 'Backend Developer' },
  { id: 4, name: 'omar', role: 'Backend Developer' },
  { id: 5, name: 'omar', role: 'Full Stack Developer' },
  { id: 6, name: 'omar', role: 'Full Stack Developer' },
  { id: 7, name: 'omar', role: 'Full Stack Developer' },
  { id: 8, name: 'omar', role: 'Full Stack Developer' },
];

const stats = [
  { label: 'Products Sold', value: '2,500+' },
  { label: 'Happy Customers', value: '1,800+' },
  { label: 'Active Sellers', value: '120+' },
  { label: 'Items Listed', value: '5,000+' },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <div className="w-full bg-white shadow-xl p-8 animate-fade-in">
        <Link
          to="/"
          className="inline-flex items-center mb-6 px-4 py-2 rounded-lg text-customGreen border border-customGreen hover:bg-customGreen hover:text-white transition-all duration-200 group font-semibold shadow"
          aria-label="Back to Marketplace"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Marketplace
        </Link>

        <h1 className="text-4xl font-extrabold text-customGreen mb-6 text-center drop-shadow">
          About Us
        </h1>

        <section className="mb-12">
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
            Founded in 2023, ThriftStore Marketplace started as a grassroots initiative to make sustainable shopping a lifestyle. Today, we connect thousands of eco-conscious buyers and sellers, empowering communities to reduce waste and find value in pre-loved treasures.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-customGreen mb-4 text-center">Marketplace Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map(({ label, value }, idx) => (
              <div
                key={idx}
                className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow"
              >
                <span className="text-3xl font-extrabold text-customGreen">{value}</span>
                <span className="text-gray-600 font-semibold mt-1">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-customGreen mb-4 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {teamMembers.map(({ id, name, role }) => (
              <div
                key={id}
                className="bg-gray-100 rounded-xl p-4 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-customGreen rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
                  {id}
                </div>
                <span className="font-semibold text-gray-700">{name}</span>
                <span className="text-gray-500 text-sm">{role}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default About;
