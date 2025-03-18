import { useState } from "react";
import { Dropdown, Menu, message, Pagination } from 'antd';
import { FiEdit, FiTrash, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { Card, CardContent } from '../../components/card/card';

const handleMenuClick = (e) => {
    message.info(`Click on menu item: ${e.key}`);
};

const cars = Array(6).fill({
    name: "Cao Phương Anh",
    info: "0948392019",
    car: "Hyundai I10H SEDAN",
    dateOrder: "Oct 1, 2025",
    pickupDate: "Oct 4, 2025",
    Status: "Đang thuê",
    dateCarBack: "Oct 22, 2025",
});


export default function CarOrder() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Get paginated data
    const orderCars = cars.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Quản lí đơn đặt xe</h1>

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
                </div>

                {/* Car Table */}
                <Card className="mt-6">
                    <CardContent>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-3 w-1/6">Tên khách thuê</th>
                                    <th className="p-3 w-1/6">Thông tin liên hệ</th>
                                    <th className="p-3 w-1/6">Xe đang đặt</th>
                                    <th className="p-3 w-1/12 text-center">Ngày đặt xe</th>
                                    <th className="p-3 w-1/12 text-center">Ngày nhận xe</th>
                                    <th className="p-3 w-1/12 text-center">Trạng thái</th>
                                    <th className="p-3 w-1/12 text-center">Ngày trả xe</th>
                                    <th className="p-3 w-1/12 text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderCars.map((car, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-100">
                                        <td className="p-3">{car.name}</td>
                                        <td className="p-3">{car.info}</td>
                                        <td className="p-3 truncate">{car.car}</td>
                                        <td className="p-3 text-center">{car.dateOrder}</td>
                                        <td className="p-3 text-center">{car.pickupDate}</td>
                                        <td className="p-3 text-center">{car.Status}</td>
                                        <td className="p-3 text-center">{car.dateCarBack}</td>
                                        <td className="p-3 text-center">
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