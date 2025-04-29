import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Adjust the path

import Marketplace from './pages/Home/Marketplace'; // Adjust the path
import SearchResults from './pages/Home/SearchResult'; // Adjust the path
import Login from './components/Login/Login'; // Import the Login component
import Cart from './pages/Cart/Cart'; // Import the Cart component

function App() {
  const user="John Doe"; // Replace with the actual name you want to pass
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Layout name={user}/>} >
          <Route path="/" element={<Marketplace />} />
          <Route path=":category" element={<Marketplace />} />
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
//         <Route path="/" element={<Layout name={user}/>} />
//       </Routes>
//     </Router>
    
//   );
// }

export default App;
