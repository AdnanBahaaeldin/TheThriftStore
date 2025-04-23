import NavBar from './NavBar'; // Adjust the path if needed

const Layout = ({name}) => {
  return (
    <div className="min-h-screen bg-blue-gray-900">
  <NavBar name={name}/>
</div>


  );
};

export default Layout;
