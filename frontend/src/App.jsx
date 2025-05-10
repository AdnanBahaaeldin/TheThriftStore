import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Adjust the path
import Login from './components/Login/Login';
import Marketplace from './pages/Home/Marketplace'; // Adjust the path
import SearchResults from './pages/Home/SearchResult'; // Adjust the path
import Profile from './pages/Profile/Profile'; 
import About from './pages/About/About';
import CreditCardPayment from './components/CreditCardForm/CreditCardForm'; 
import Cart from './pages/Cart/Cart';
import { CartProvider } from './context/CartContext';
import ItemViewCard from './components/ItemView/ItemViewCard';
import Sell from './pages/Sell/Sell';

export default function App() {
  const user="John Doe"; // Replace with the actual name you want to pass
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About  />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* <Route path="/item" element={<ItemViewCard />} />  */}
          <Route path="/" element={<Layout name={user}/>} >
            <Route path="/home" element={<Marketplace />} />
            <Route path=":category" element={<Marketplace />} />
            <Route path="/item/:id" element={<ItemViewCard />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}


// function App() {
//   const user="John Doe"; // Replace with the actual name you want to pass
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout name={user}/>} >
//           <Route path="/" element={<Marketplace />} />
//           <Route path=":category" element={<Marketplace />} />

//           <Route path="/search" element={<SearchResults />} />
//         </Route>
//       </Routes>
//     </Router>
    
//   );

// }


//to test the login page 
// export default function App(){
//   return(
//     <div>
//       <Login />
//     </div>
//   )

// }
