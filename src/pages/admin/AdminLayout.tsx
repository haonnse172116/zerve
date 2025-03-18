import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 h-screen bg-white border-r flex flex-col py-6 px-4 gap-2 shadow-md">
        <Link to="/admin/dashboard" className="p-3 rounded-lg hover:bg-gray-200">Dashboard</Link>
        <Link to="/admin/car-management" className="p-3 rounded-lg hover:bg-gray-200">Quản lí xe</Link>
        <Link to="/admin/car-quality" className="p-3 rounded-lg hover:bg-gray-200">Quản lí tinh trạng xe</Link>
        <Link to="/admin/car-order" className="p-3 rounded-lg hover:bg-gray-200">Quản lí đơn đặt xe</Link>
        <Link to="/admin/driver-management" className="p-3 rounded-lg hover:bg-gray-200">Quản lí tài xế</Link>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
