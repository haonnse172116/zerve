import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth(); 
  return (
    <header className="bg-white shadow-md rounded-full py-2 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
  <Link to="/">
    <img
      src="/Logo.png"
      alt="RentConnect"
      className="h-10 w-auto object-contain cursor-pointer"
    />
  </Link>
</div>
      
      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-600 text-sm">
        <Link to="about" className="hover:text-gray-900">Về RentConnect</Link>
        {/* <a href="#" className="hover:text-gray-900">Trở thành chủ xe</a> */}
        <Link to="car-list" className="hover:text-gray-900">Danh sách xe</Link>
        {isAuthenticated && <Link to="/my-trips" className="hover:text-gray-900">Chuyến đi của tôi</Link>}
      </nav>
      
      {/* Icons */}
      {isAuthenticated ? (
          <button
            onClick={logout}
            className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100"
          >
            <i className="fa fa-sign-out-alt text-gray-600"></i> {/* Nút đăng xuất */}
          </button>
        ) : (
          <a href="/login" className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
            <img
              src="/blank-profile-picture.png"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </a>
        )}
    </header>
  );
};

export default Header;