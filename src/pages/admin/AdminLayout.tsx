import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext"; // Import AuthContext

export default function AdminLayout() {
  const { logout } = useAuth(); // Lấy hàm logout từ context
  const navigate = useNavigate(); // Dùng để chuyển trang
  const handleLogout = () => {
    logout(); // Gọi hàm logout từ context
    navigate("/"); // Chuyển hướng về trang chủ
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 h-screen bg-white border-r flex flex-col py-6 px-4 gap-2 shadow-md">
        <Link to="/admin/dashboard" className="p-3 rounded-lg hover:bg-gray-200">
          Dashboard
        </Link>
        <Link to="/admin/car-management" className="p-3 rounded-lg hover:bg-gray-200">
          Quản lí xe
        </Link>
        <Link to="/admin/car-order" className="p-3 rounded-lg hover:bg-gray-200">
          Quản lí đơn đặt xe
        </Link>
        <Link to="/admin/car-payment" className="p-3 rounded-lg hover:bg-gray-200">
          Quản lí payment
        </Link>
        <Link to="/admin/driver-management" className="p-3 rounded-lg hover:bg-gray-200">
          Quản lí chủ xe
        </Link>

        {/* 🔥 Nút Đăng xuất (gọi logout từ AuthContext) */}
        <button
          onClick={handleLogout}
          className="mt-auto p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Đăng xuất
        </button>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
