import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth(); 
  return (
    <header className="bg-white shadow-md rounded-full py-2 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/Logo.png" alt="RentConnect" className="w-20 h-10" />
      </div>
      
      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-600 text-sm">
        <a href="#" className="hover:text-gray-900">Về RentConnect</a>
        <a href="#" className="hover:text-gray-900">Trở thành chủ xe</a>
        <Link to="car-list" className="hover:text-gray-900">Danh sách xe</Link>
        <a href="#" className="hover:text-gray-900">Chuyến đi của tôi</a>
      </nav>
      
      {/* Icons */}
      {isAuthenticated ? (
          <button
            onClick={logout} // Gọi hàm logout khi nhấn nút
            className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100"
          >
            <i className="fa fa-sign-out-alt text-gray-600"></i> {/* Nút đăng xuất */}
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
            <img
              src="/Profile.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}
    </header>
  );
};

export default Header;