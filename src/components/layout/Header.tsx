import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the mobile menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Hàm để đóng menu khi một liên kết được nhấn
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className=" z-999 bg-white shadow-md rounded-full py-2 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" onClick={closeMenu}> {/* Thêm onClick để đóng menu */}
          <img
            src="/Logo.png"
            alt="RentConnect"
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Navigation for desktop */}
      <nav className="z-999 hidden md:flex space-x-6 text-gray-600 text-sm ">
        <Link to="about" className="hover:text-gray-900">Về RentConnect</Link>
        <Link to="car-list" className="hover:text-gray-900">Danh sách xe</Link>
        {isAuthenticated && <Link to="/my-trips" className="hover:text-gray-900">Chuyến đi của tôi</Link>}
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 right-0 bg-white shadow-lg w-full py-6 px-8 rounded-lg"
        style={{ zIndex: 1000 }}>
          <nav className="space-y-6">
            <Link
              to="about"
              className="block text-gray-600 hover:text-gray-900 text-lg font-semibold"
              onClick={closeMenu} // Thêm onClick để đóng menu
            >
              Về RentConnect
            </Link>
            <Link
              to="car-list"
              className="block text-gray-600 hover:text-gray-900 text-lg font-semibold"
              onClick={closeMenu} // Thêm onClick để đóng menu
            >
              Danh sách xe
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-trips"
                className="block text-gray-600 hover:text-gray-900 text-lg font-semibold"
                onClick={closeMenu} // Thêm onClick để đóng menu
              >
                Chuyến đi của tôi
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Icons */}
      <div className="flex items-center space-x-2">
        <button
          className="md:hidden flex items-center justify-center text-gray-600"
          onClick={toggleMenu}
        >
          <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i> {/* Hamburger icon */}
        </button>

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

      </div>

    </header>
  );
};

export default Header;