import { useState, useEffect } from "react";
import { Dropdown, Menu, message, Pagination, Select } from "antd";
import { FiEdit, FiTrash, FiSearch, FiMoreVertical } from "react-icons/fi";
import { Card, CardContent } from "../../components/card/card";
import api from "../../api";

const { Option } = Select;

// Định nghĩa kiểu dữ liệu cho thanh toán
interface Payment {
  _id: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  bookingId: {
    _id: string;
    startDate: string;
    endDate: string;
    endTime: string;
    startTime: string;
    user: {
      personalInfo: {
        name: string;
        email: string;
      };
      phoneNumber: string;
    };
    car: {
      name: string;
      brand: string;
      licensePlate: string;
    };
  };
}

const paymentStatuses = ["Pending", "Paid", "Failed"];

export default function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get<Payment[]>("/payment/get-all");
        setPayments(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thanh toán:", error);
        message.error("Không thể tải danh sách thanh toán.");
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const name = payment.bookingId?.user?.personalInfo?.name?.toLowerCase() || "";
    const contact =
      (payment.bookingId?.user?.phoneNumber ||
        payment.bookingId?.user?.personalInfo?.email ||
        "").toLowerCase();
    const amount = payment.amount.toString();
  
    return (
      name.includes(searchTerm.toLowerCase()) ||
      contact.includes(searchTerm.toLowerCase()) ||
      amount.includes(searchTerm)
    );
  });
  
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const updatePaymentStatus = async (paymentId: string, newStatus: string) => {
    try {
      await api.put(`/payment/update-status/${paymentId}`, { status: newStatus });
      setPayments((prev) =>
        prev.map((p) => (p._id === paymentId ? { ...p, status: newStatus } : p))
      );
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      message.error("Không thể cập nhật trạng thái.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Quản lí thanh toán</h1>

        {/* Thanh tìm kiếm */}
        <div className="mt-4 flex items-center space-x-2">
          <div className="relative w-80">
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
  type="text"
  placeholder="Tìm theo tên, liên hệ hoặc số tiền"
  className="pl-10 p-2 border rounded-md w-full"
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu khi lọc
  }}
/>
          </div>
        </div>

        {/* Bảng thanh toán */}
        <Card className="mt-6">
          <CardContent>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Người thuê</th>
                  <th className="p-3">Liên hệ</th>
                  <th className="p-3">Xe thuê</th>
                  <th className="p-3 text-center">Ngày thuê và trả</th>
                  <th className="p-3 text-center">Thời gian thuê và trả</th>
                  <th className="p-3 text-center">Số tiền</th>
                  <th className="p-3 text-center">Phương thức</th>
                  <th className="p-3 text-center">Trạng thái</th>
                  <th className="p-3 text-center">Ngày thanh toán</th>
                  <th className="p-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.map((payment) => (
                  <tr key={payment._id} className="border-t hover:bg-gray-100">
                    <td className="p-3">{payment.bookingId?.user?.personalInfo?.name || "N/A"}</td>
                    <td className="p-3">
  {payment.bookingId?.user?.phoneNumber ? payment.bookingId.user.phoneNumber : payment.bookingId.user.personalInfo?.email || "N/A"}
</td>                                     
                    <td className="p-3">
                      {payment.bookingId?.car?.brand} {payment.bookingId?.car?.name} (
                      {payment.bookingId?.car?.licensePlate})
                    </td>
                    <td className="p-3 text-center">
                      {new Date(payment.bookingId?.startDate).toLocaleDateString()} -{" "}
                      {new Date(payment.bookingId?.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center">
                      {payment.bookingId?.startTime} -{" "}
                      {payment.bookingId?.endTime}
                    </td>
                    <td className="p-3 text-center">{payment.amount.toLocaleString()} VNĐ</td>
                    <td className="p-3 text-center">{payment.paymentMethod}</td>
                    <td className="p-3 text-center">
                      <Select
                        defaultValue={payment.status}
                        style={{ width: 120 }}
                        onChange={(val) => updatePaymentStatus(payment._id, val)}
                      >
                        {paymentStatuses.map((status) => (
                          <Option key={status} value={status}>
                            {status}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className="p-3 text-center">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center">
                      <Dropdown
                        overlay={
                          <Menu onClick={(e) => message.info(`Click: ${e.key}`)}>
                            <Menu.Item key="edit" icon={<FiEdit />}>
                              Cập nhật
                            </Menu.Item>
                            <Menu.Item key="delete" icon={<FiTrash />} danger>
                              Xóa
                            </Menu.Item>
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
          total={filteredPayments.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          className="mt-4 flex justify-center"
        />
      </div>
    </div>
  );
}
