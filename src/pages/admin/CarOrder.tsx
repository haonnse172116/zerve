// 👇 Thêm import useState, useEffect như bạn đang có
import { useState, useEffect } from "react";
import { Dropdown, Menu, message, Pagination, Button, Modal, Tag } from "antd";
import { FiEdit, FiTrash, FiSearch, FiMoreVertical, FiCheckCircle } from "react-icons/fi";
import { Card, CardContent } from "../../components/card/card";
import api from "../../api";

interface Booking {
  _id: string;
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
    model: string;
  };
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  createdAt: string;
  status: string;
}

export default function CarOrder() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const pageSize = 5;
  const filteredBookings = bookings.filter((booking) => {
    const name = booking.user.personalInfo.name?.toLowerCase() || "";
    const contact = (booking.user.phoneNumber || booking.user.personalInfo.email || "").toLowerCase();
    const createdDate = new Date(booking.createdAt).toLocaleDateString("vi-VN");

    return (
      name.includes(searchTerm.toLowerCase()) ||
      contact.includes(searchTerm.toLowerCase()) ||
      createdDate.includes(searchTerm)
    );
  });

  const paginatedBookings = filteredBookings.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get<Booking[]>("/booking/getAll");
        setBookings(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn đặt xe:", error);
        message.error("Không thể tải danh sách đơn đặt xe.");
      }
    };
    fetchBookings();
  }, []);

  const handleConfirmReturn = async (bookingId: string) => {
    try {
      await api.post("/booking/confirm-car", { bookingId });
      message.success("Xác nhận trả xe thành công!");
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "Completed" } : b))
      );
    } catch (error) {
      console.error("Lỗi khi xác nhận trả xe:", error);
      message.error("Không thể xác nhận trả xe.");
    }
  };

  const showCancelModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCancelModalVisible(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;

    try {
      await api.post("/booking/cancel", { bookingId: selectedBookingId,reason: cancelReason, });
      message.success("Đơn đặt xe đã được hủy!");
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBookingId
            ? { ...b, status: "Canceled", cancelReason }
            : b
        )
      );
    } catch (error) {
      console.error("Lỗi khi hủy đơn đặt xe:", error);
      message.error("Không thể hủy đơn đặt xe.");
    } finally {
      setCancelModalVisible(false);
      setSelectedBookingId(null);
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case "Pending":
        return <Tag color="orange">Chờ xác nhận</Tag>;
      case "Confirmed":
        return <Tag color="blue">Đã xác nhận</Tag>;
      case "Pending Confirmation":
        return <Tag color="yellow">Chờ xác nhận trả xe</Tag>;
      case "Completed":
        return <Tag color="green">Hoàn thành</Tag>;
      case "Canceled":
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag color="silver">Không xác định</Tag>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Quản lí đơn đặt xe</h1>

        <div className="mt-4 flex items-center space-x-2">
          <div className="relative w-80">
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm theo tên, liên hệ hoặc ngày đặt xe"
              className="pl-10 p-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

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
                {paginatedBookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-gray-100">
                    <td className="p-3">{booking.user.personalInfo.name}</td>
                    <td className="p-3">
                      {booking.user.phoneNumber || booking.user.personalInfo.email}
                    </td>
                    <td className="p-3 truncate">
                      {booking.car.brand} {booking.car.name}
                    </td>
                    <td className="p-3 text-center">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center">
                      {new Date(booking.startDate).toLocaleDateString()} - {booking.startTime}
                    </td>
                    <td className="p-3 text-center">{getStatusTag(booking.status)}</td>
                    <td className="p-3 text-center">
                      {new Date(booking.endDate).toLocaleDateString()} - {booking.endTime}
                    </td>
                    <td className="p-3 text-center space-y-2">
                      {booking.status === "Pending Confirmation" && (
                        <Button
                          type="primary"
                          icon={<FiCheckCircle />}
                          onClick={() => handleConfirmReturn(booking._id)}
                        >
                          Xác nhận trả xe
                        </Button>
                      )}
                      {(booking.status === "Pending" || booking.status === "Pending Confirmation") && (
                        <Button
                          type="default"
                          danger
                          icon={<FiTrash />}
                          onClick={() => {showCancelModal(booking._id);
                            setCancelReason("");
                            setCancelModalVisible(true); }}
                        >
                          Hủy
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Pagination
          current={currentPage}
          total={filteredBookings.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          className="mt-4 flex justify-center"
        />
      </div>

      {/* 🔔 Modal xác nhận hủy */}
      <Modal
        title="Xác nhận hủy đơn đặt xe"
        open={cancelModalVisible}
        onOk={handleCancelBooking}
        onCancel={() => setCancelModalVisible(false)}
        okText="Hủy đơn"
        cancelText="Thoát"
      >
        <p>Bạn có chắc chắn muốn hủy đơn đặt xe của khách hàng này?</p>
        <textarea
    value={cancelReason}
    onChange={(e) => setCancelReason(e.target.value)}
    className="w-full border rounded p-2 mt-2"
    placeholder="Nhập lý do hủy đơn..."
    rows={3}
  />
      </Modal>
    </div>
  );
}
