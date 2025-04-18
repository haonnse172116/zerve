import { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Menu, message, Pagination } from "antd";
import { FiEdit, FiTrash, FiSearch, FiMoreVertical } from "react-icons/fi";
import { Card, CardContent } from "../../components/card/card";
import api from "../../api";

// Định nghĩa kiểu dữ liệu cho tài xế
interface Driver {
    _id: string;
    personalInfo: {
        name: string;
        email: string | null;
    };
    phoneNumber: string;
    ownerInfo: {
        carsOwned: { name: string; brand: string; model: string }[];
        earnings: number;
        totalRentals: number;
        ratings: number;
    };
}

const handleMenuClick = (e: any) => {
    message.info(`Click on menu item: ${e.key}`);
};

export default function DriverManagement() {
    const [drivers, setDrivers] = useState<Driver[]>([]);  // Dữ liệu tài xế từ API
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 5;

    // 🛠 Gọi API để lấy danh sách tài xế
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await api.get<Driver[]>("/user/get-all-owner");
                setDrivers(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tài xế:", error);
                message.error("Không thể tải danh sách tài xế.");
            }
        };
        fetchDrivers();
    }, []);

    // Lấy dữ liệu phân trang
    const paginatedDrivers = drivers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Nội dung chính */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Quản lí chủ xe</h1>

                {/* Thanh tìm kiếm */}
                <div className="mt-4 flex items-center space-x-2">
                    <div className="relative w-80">
                        <FiSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="pl-10 p-2 border rounded-md w-full"
                        />
                    </div>
                </div>

                {/* Bảng danh sách tài xế */}
                <Card className="mt-6">
                    <CardContent>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-3 w-1/6 text-center">Tên Chủ xe</th>
                                    <th className="p-3 w-1/6 text-center">Email</th>
                                    <th className="p-3 w-1/6 text-center">Số điện thoại</th>
                                    <th className="p-3 w-1/6 text-center">Xe đang sở hữu</th>
                                    <th className="p-3 w-1/6 text-center">Điểm đánh giá</th>
                                    <th className="p-3 w-1/12 text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDrivers.map((driver) => (
                                    <tr key={driver._id} className="border-t hover:bg-gray-100">
                                        <td className="p-3 text-center">{driver.personalInfo.name}</td>
                                        <td className="p-3 text-center">{driver.personalInfo.email || "N/A"}</td>
                                        <td className="p-3 text-center">{driver.phoneNumber}</td>
                                        <td className="p-3 text-center">
                                            {driver.ownerInfo.carsOwned.length > 0
                                                ? driver.ownerInfo.carsOwned.map(car => `${car.brand} ${car.name}`).join(", ")
                                                : "Không có xe"}
                                        </td>
                                        <td className="p-3 text-center">{driver.ownerInfo.ratings}/5 ⭐</td>
                                        {/* <td className="p-3 text-center">
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
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* Phân trang */}
                <Pagination
                    current={currentPage}
                    total={drivers.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    className="mt-4 flex justify-center"
                />
            </div>
        </div>
    );
}
