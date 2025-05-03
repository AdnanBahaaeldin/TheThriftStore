import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Adjust the path
import Login from './components/Login/Login';
import Marketplace from './pages/Home/Marketplace'; // Adjust the path
import SearchResults from './pages/Home/SearchResult'; // Adjust the path
import Profile from './pages/Profile/Profile'; 
import CreditCardPayment from './components/CreditCardForm/CreditCardForm'; 


import ItemViewCard from './components/ItemView/ItemViewCard';

function App() {
  const user="John Doe"; // Replace with the actual name you want to pass
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/item" element={<ItemViewCard />} />  */}
        <Route path="/" element={<Layout name={user}/>} >
          <Route path="/" element={<Marketplace />} />
          <Route path=":category" element={<Marketplace />} />
          <Route path="/item/:id" element={<ItemViewCard />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </Router>
    
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
//       <Checkout />
//     </div>
//   )

// }

 
