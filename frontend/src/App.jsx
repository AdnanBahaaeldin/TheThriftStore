import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Adjust the path

function App() {
  const user="John Doe"; // Replace with the actual name you want to pass
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout name={user}/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
