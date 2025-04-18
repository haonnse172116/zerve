import React, { useEffect, useState } from "react";
import api from "../../api";
import { Button, message, Modal } from "antd";

interface Booking {
  _id: string;
  car: {
    name: string;
    brand: string;
    model: string;
    images: string[];
    licensePlate: string;
  };
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: string;
  cancelReason: string | null;
}

export default function MyTrips() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/booking/my-trips");
        setBookings(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy chuyến đi:", error);
        message.error("Không thể tải danh sách chuyến đi.");
      }
    };

    fetchBookings();
  }, []);

  const showConfirmModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setConfirmModalVisible(true);
  };

  const handleReturnCar = async () => {
    if (!selectedBookingId) return;

    try {
      await api.post("/booking/return-car", { bookingId: selectedBookingId });
      message.success("Trả xe thành công!");
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBookingId ? { ...b, status: "Pending Confirmation" } : b
        )
      );
    } catch (error) {
      console.error("Lỗi khi trả xe:", error);
      message.error("Không thể trả xe.");
    } finally {
      setConfirmModalVisible(false);
      setSelectedBookingId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Chuyến đi của tôi</h2>
      {bookings.length === 0 ? (
        <p>Không có chuyến đi nào.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={booking.car.images[0] || "/default-car.jpg"}
                  alt="Car"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">
                    {booking.car.brand} {booking.car.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Biển số: {booking.car.licensePlate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ngày thuê: {new Date(booking.startDate).toLocaleDateString()} -{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Thời gian thuê: {booking.startTime} - {booking.endTime}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      booking.status === "Completed"
                        ? "text-green-600"
                        : booking.status === "Confirmed"
                        ? "text-blue-600"
                        : booking.status === "Pending Confirmation"
                        ? "text-yellow-600"
                        : booking.status === "Canceled"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    Trạng thái:{" "}
                    {{
                      "Completed": "Hoàn tất",
                      "Confirmed": "Đã xác nhận",
                      "Pending Confirmation": "Chờ xác nhận trả xe",
                      "Pending": "Chờ xác nhận",
                      "Canceled": "Đã hủy",
                    }[booking.status] || "Không xác định"}
                  </p>

                  {/* ✅ Hiển thị lý do hủy nếu có */}
                  {booking.status === "Canceled" && booking.cancelReason && (
                    <p className="text-sm text-red-500 italic mt-1">
                      Lý do hủy: {booking.cancelReason}
                    </p>
                  )}
                </div>
              </div>

              {/* Chỉ hiện khi trạng thái là Confirmed */}
              {booking.status === "Confirmed" && (
                <Button type="primary" danger onClick={() => showConfirmModal(booking._id)}>
                  Trả xe
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 🔔 Modal xác nhận trả xe */}
      <Modal
        title="Xác nhận trả xe"
        open={confirmModalVisible}
        onOk={handleReturnCar}
        onCancel={() => setConfirmModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn trả xe không?</p>
        <p className="text-sm text-gray-500 mt-2">
          Nếu có sự cố, hư hỏng hoặc trả xe trễ, vui lòng liên hệ trực tiếp:{" "}
          <span className="font-semibold text-red-500">0337248801</span> để được hỗ trợ.
        </p>
      </Modal>
    </div>
  );
}
