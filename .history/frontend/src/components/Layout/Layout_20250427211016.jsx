import NavBar from './NavBar'; // Adjust the path if needed
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SearchBar from './SearchBar'; // Adjust the path if needed
const Layout = ({name}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="min-h-screen bg-blue-gray-900">
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 pointer-events-auto" onClick={() => setSearchOpen(false)} />
      )}

      {/* SearchBar */}
      {searchOpen && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <SearchBar onClose={() => setSearchOpen(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} />
        </div>
      )}

      {!searchOpen && <NavBar name={name} openSearch={() => setSearchOpen(true)} />}
      <main className="p-4">
            <Outlet context={{ searchQuery }}/> 
      </main>
    </div>


  );
};

export default Layout;
