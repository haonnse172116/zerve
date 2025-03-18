import { Link } from "react-router-dom";

const Header = () => {
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
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <i className="far fa-comment-alt"></i>
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <i className="far fa-bell"></i>
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
          <img src="/Profile.jpg" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;