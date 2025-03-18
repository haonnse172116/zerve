import { useState } from "react";
import { Button, Dropdown, Menu, message, Pagination } from "antd";
import { FiEdit, FiTrash, FiSearch, FiMoreVertical } from "react-icons/fi";
import { Card, CardContent } from "../../components/card/card";

const handleMenuClick = (e) => {
    message.info(`Click on menu item: ${e.key}`);
};

const cars = Array(7).fill({
    name: "Hyundai I10H SEDAN",
    location: "Quận Bình Thạnh, TP. Hồ Chí Minh",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "600K/1D",
    image: "/Car.jpg",
    updatedAt: "Oct 22, 2024",
});

export default function CarManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Get paginated data
    const paginatedCars = cars.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Quản lí xe</h1>

                {/* Search Bar */}
                <div className="mt-4 flex items-center space-x-2">
                    <div className="relative w-80">
                        <FiSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="pl-10 p-2 border rounded-md w-full"
                        />
                    </div>
                    <Button className="bg-red-500 text-white px-4 py-2 rounded-lg">Thêm xe</Button>
                </div>

                {/* Car Table */}
                <Card className="mt-6">
                    <CardContent>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3 text-left">Tên xe</th>
                                    <th className="p-3 text-left">Địa chỉ</th>
                                    <th className="p-3 text-left">Mô tả</th>
                                    <th className="p-3 text-left">Giá</th>
                                    <th className="p-3 text-left">Ảnh</th>
                                    <th className="p-3 text-left">Cập nhật lần cuối</th>
                                    <th className="p-3 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCars.map((car, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-100">
                                        <td className="p-3">{car.name}</td>
                                        <td className="p-3">{car.location}</td>
                                        <td className="p-3 truncate w-40">{car.description}</td>
                                        <td className="p-3">{car.price}</td>
                                        <td className="p-3">
                                            <img src={car.image} alt="Car" className="w-8 h-8 rounded-full" />
                                        </td>
                                        <td className="p-3">{car.updatedAt}</td>
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

                {/* Pagination Component */}
                <Pagination
                    current={currentPage}
                    total={cars.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    className="mt-4 flex justify-center"
                />
            </div>
        </div>
    );
}
