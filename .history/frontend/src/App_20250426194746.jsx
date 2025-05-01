import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Adjust the path
import Login from './components/Login/Login';
import Marketplace from './pages/Home/Marketplace'; // Adjust the path
import SearchResults from './pages/Home/SearchResult'; // Adjust the path
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
// =======
// import Login from './components/Login/Login';



//to test the login page 
// function App(){
//   return(
//     <div>
//       <Login/>
//     </div>
//   )
// >>>>>>> front-end
// }


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
