import { useState, useEffect } from "react";
import { Button, Dropdown, Menu, message, Pagination } from "antd";
import { FiEdit, FiTrash, FiSearch, FiMoreVertical } from "react-icons/fi";
import { Card, CardContent } from "../../components/card/card";
import api from "../../api";

// Xử lý sự kiện menu
const handleMenuClick = (e: any) => {
    message.info(`Click on menu item: ${e.key}`);
};

// Định nghĩa kiểu dữ liệu cho xe
interface Car {
    _id: string;
    name: string;
    location: string;
    description: string;
    pricePerDay: number;
    licensePlate: string;
    images: string[];
    updatedAt: string;
}

export default function CarManagement() {
    const [cars, setCars] = useState<Car[]>([]);  // Dữ liệu xe từ API
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 5;
    
    // 🛠 Gọi API để lấy danh sách xe
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get<Car[]>("/car/get-all");
                setCars(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách xe:", error);
                message.error("Không thể tải danh sách xe.");
            }
        };
        fetchCars();
    }, []);

    // Lấy dữ liệu phân trang
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Lọc dữ liệu theo searchTerm
    const filteredCars = cars.filter(
      (car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Dữ liệu phân trang từ danh sách đã lọc
    const paginatedCars = filteredCars.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Nội dung chính */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Quản lí xe</h1>

                {/* Thanh tìm kiếm */}
                <div className="mt-4 flex items-center space-x-2">
                    <div className="relative w-80">
                        <FiSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
  type="text"
  placeholder="Tìm theo tên hoặc biển số"
  className="pl-10 p-2 border rounded-md w-full"
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  }}
/>

                    </div>
                    {/* <Button className="bg-red-500 text-white px-4 py-2 rounded-lg">Thêm xe</Button> */}
                </div>

                {/* Bảng hiển thị danh sách xe */}
                <Card className="mt-6">
                    <CardContent>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3 text-left">Tên xe</th>
                                    <th className="p-3 text-left">Địa chỉ</th>
                                    <th className="p-3 text-left">Mô tả</th>
                                    <th className="p-3 text-left">Giá</th>
                                    <th className="p-3 text-left">Biển số xe</th>
                                    <th className="p-3 text-left">Ảnh</th>
                                    <th className="p-3 text-left">Cập nhật lần cuối</th>
                                    <th className="p-3 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCars.map((car) => (
                                    <tr key={car._id} className="border-t hover:bg-gray-100">
                                        <td className="p-3">{car.name}</td>
                                        <td className="p-3">{car.location}</td>
                                        <td className="p-3 truncate w-40">{car.description}</td>
                                        <td className="p-3">{car.pricePerDay.toLocaleString()} VNĐ/ngày</td>
                                        <td className="p-3">{car.licensePlate}</td>
                                        <td className="p-3">
                                            <img src={car.images[0] || "/default-car.jpg"} alt="Car" className="w-8 h-8 rounded-full" />
                                        </td>
                                        <td className="p-3">{new Date(car.updatedAt).toLocaleDateString()}</td>
                                        <td className="p-3 relative">
                                            <Dropdown
                                                overlay={
                                                    <Menu onClick={handleMenuClick}>
                                                        <Menu.Item key="edit" icon={<FiEdit />}>Cập nhật</Menu.Item>
                                                        <Menu.Item key="delete" icon={<FiTrash />} danger>Xóa</Menu.Item>
                                                    </Menu>
                                                }
                                                trigger={["click"]}
                                            >
                                                <FiMoreVertical className="cursor-pointer" />
                                            </Dropdown>
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
                    total={filteredCars.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    className="mt-4 flex justify-center"
                />
            </div>
        </div>
    );
}
