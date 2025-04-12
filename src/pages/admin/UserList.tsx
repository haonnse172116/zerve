import { useState, useEffect } from "react";
import { Dropdown, Menu, message, Pagination } from "antd";
import { FiEdit, FiTrash, FiSearch, FiMoreVertical } from "react-icons/fi";
import { Card, CardContent } from "../../components/card/card";
import api from "../../api";

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  _id: string;
  personalInfo: {
    name: string;
    email: string | null;
  };
  phoneNumber: string;
  role: string;
}


export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]); // Dữ liệu người dùng từ API
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Trạng thái tìm kiếm
  const pageSize = 10;

  // 🛠 Gọi API để lấy danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<User[]>("/user/get-all-user");
        setUsers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        message.error("Không thể tải danh sách người dùng.");
      }
    };
    fetchUsers();
  }, []);

  // Lọc danh sách người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter((user) => {
    const name = user.personalInfo.name ? user.personalInfo.name.toLowerCase() : "";
    const email = user.personalInfo.email ? user.personalInfo.email.toLowerCase() : "";
    const phoneNumber = user.phoneNumber ? user.phoneNumber.toLowerCase() : "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      phoneNumber.includes(searchTerm.toLowerCase())
    );
  });

  // Lấy dữ liệu phân trang
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Nội dung chính */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Quản lí Người Dùng</h1>

        {/* Thanh tìm kiếm */}
        <div className="mt-4 flex items-center space-x-2">
          <div className="relative w-80">
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tên khách hàng hoặc liên hệ"
              className="pl-10 p-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset trang khi thay đổi tìm kiếm
              }}
            />
          </div>
        </div>

        {/* Bảng danh sách người dùng */}
        <Card className="mt-6">
          <CardContent>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 w-1/6 text-center">Tên Người Dùng</th>
                  <th className="p-3 w-1/6 text-center">Liên Hệ</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-gray-100">
                    <td className="p-3 text-center">{user.personalInfo.name}</td>
                    <td className="p-3 text-center">
                      {/* Hiển thị email nếu có, nếu không thì hiển thị số điện thoại */}
                      {user.personalInfo.email || user.phoneNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Phân trang */}
        <Pagination
          current={currentPage}
          total={filteredUsers.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          className="mt-4 flex justify-center"
        />
      </div>
    </div>
  );
}
