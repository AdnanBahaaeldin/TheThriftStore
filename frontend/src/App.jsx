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
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import ItemManagement from './pages/Admin/ItemManagement';
import TransactionMonitoring from './pages/Admin/TransactionMonitoring';
import ReportsAnalytics from './pages/Admin/ReportsAnalytics';
import InventoryOverview from './pages/Admin/InventoryOverview';

function App() {
  const user="John Doe"; // Replace with the actual name you want to pass
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="items" element={<ItemManagement />} />
            <Route path="transactions" element={<TransactionMonitoring />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="inventory" element={<InventoryOverview />} />
          </Route>

          {/* Main App Routes */}
          <Route path="/" element={<Layout name={user}/>} >
            <Route path="/" element={<Marketplace />} />
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

export default App;


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
//       <Profile />
//     </div>
//   )

// }
