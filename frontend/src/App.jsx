import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Adjust the path
import Login from './components/Login/Login';






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


// function App(){
//   return(
//     <div>
//       <Login/>
//     </div>
//   )
// }



export default App;
