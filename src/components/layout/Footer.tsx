import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 px-6 md:px-20 text-gray-700">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Logo & Company Info */}
        <div>
          <img src="/Logo.png" alt="RentConnect" className="w-36 mb-4" />
          <p>RentConnect là nền tảng trực tuyến giúp người dùng dễ dàng tìm kiếm và kết nối với các dịch vụ thuê xe từ bên thứ hai.</p>
          <p className="mt-4">(84) 123-456-789</p>
          <p>rentconnect@gmail.com</p>
        </div>
        
        {/* Policies */}
        <div>
          <h3 className="font-semibold mb-3">Chính sách</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900">Chính sách và quy định</a></li>
            <li><a href="#" className="hover:text-gray-900">Quy chế hoạt động</a></li>
            <li><a href="#" className="hover:text-gray-900">Bảo mật thông tin</a></li>
            <li><a href="#" className="hover:text-gray-900">Giải quyết tranh chấp</a></li>
          </ul>
        </div>
        
        {/* Locations */}
        <div>
          <h3 className="font-semibold mb-3">Địa điểm dịch vụ</h3>
          <ul className="space-y-2">
            <li>Hồ Chí Minh</li>
            <li>Đà Nẵng</li>
            <li>Hà Nội</li>
          </ul>
        </div>
        
        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3">Mạng xã hội</h3>
          <div className="flex space-x-3 text-lg">
            <a href="https://www.facebook.com/profile.php?id=61573006625748" className="hover:text-gray-900"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/rentconnect.team?igsh=bXkyb29vd2xzYjV0" className="hover:text-gray-900"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;