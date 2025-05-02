import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Adjust the path
import Marketplace from './pages/Home/Marketplace'; // Adjust the path
import SearchResults from './pages/Home/SearchResult'; // Adjust the path

function App() {
  const user="John Doe"; // Replace with the actual name you want to pass
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout name={user}/>} >
          <Route path="/" element={<Marketplace />} />
          <Route path=":category" element={<Marketplace />} />

          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;
