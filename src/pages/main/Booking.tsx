import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarSearch } from "../../components/context/CarSearchContext";
import api from "../../api";
import { Card, CardContent } from "../../components/card/card";
import { Button, message } from "antd";

const Booking = () => {
  const { carId } = useParams();
  const { searchData } = useCarSearch();
  const navigate = useNavigate();

  // 🔹 Lấy thông tin user từ localStorage
  const userRef = useRef(localStorage.getItem("user"));
  const user = userRef.current ? JSON.parse(userRef.current) : null;

  const [car, setCar] = useState<any>(null);
  const [pickupLocation, setPickupLocation] = useState(searchData.location);
  const [returnLocation, setReturnLocation] = useState(searchData.location);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const startDateTime = new Date(`${searchData.startDate}T${searchData.startTime}:00`);
  const endDateTime = new Date(`${searchData.endDate}T${searchData.endTime}:00`);
  const diffInHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 3600);
  const diffInDays = Math.floor(diffInHours / 24);

  useEffect(() => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để tiếp tục đặt xe!");
      navigate("/login");
      return;
    }

    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/car/get-by-id/${carId}`);
        setCar(response.data);

        // 🔹 Tính toán chi phí thuê xe
        const startDateTime = new Date(`${searchData.startDate}T${searchData.startTime}:00`);
        const endDateTime = new Date(`${searchData.endDate}T${searchData.endTime}:00`);
        const diffInHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 3600);
        const diffInDays = Math.floor(diffInHours / 24);
        const remainingHours = diffInHours % 24;

        // ✅ Giá thuê ngày đã gồm phí dịch vụ (5%)
        const pricePerDayWithFee = response.data.pricePerDay * 1.05;
        // ✅ Giá thuê theo giờ (10% giá theo ngày), đã có phí dịch vụ
        const pricePerHourWithFee = (response.data.pricePerDay * 0.1) * 1.05;

        // ✅ Tổng giá thuê trước thuế
        const totalBeforeTax = (diffInDays * pricePerDayWithFee) + (remainingHours * pricePerHourWithFee);

        // ✅ Tính thuế VAT (8%) trên tổng trước thuế
        const taxFee = totalBeforeTax * 0.08;

        // ✅ Tổng thanh toán cuối cùng
        setTotalPrice(totalBeforeTax + taxFee);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết xe:", error);
        message.error("Không tìm thấy xe.");
        navigate("/car-list");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId, navigate]);

  const handleBooking = async () => {
    try {
      const bookingData = {
        user: user.id,
        car: carId,
        startDate: searchData.startDate,
        startTime: searchData.startTime,
        endDate: searchData.endDate,
        endTime: searchData.endTime,
        pickupLocation,
        returnLocation,
        totalPrice,
      };

      await api.post("/booking/create", bookingData);
      message.success("Đặt xe thành công!");
      navigate("/checkout");
    } catch (error) {
      console.error("Lỗi khi đặt xe:", error);
      message.error("Đặt xe thất bại, vui lòng thử lại!");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (!car) return <p>Không tìm thấy xe!</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">Xác nhận đặt xe</h2>

      <Card className="mt-6 shadow-lg rounded-lg">
        <CardContent>
          <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
          <p className="text-gray-500">{car.brand} - {car.model} ({car.year})</p>
          <img src={car.images[0]} alt={car.name} className="w-full h-80 object-cover rounded-md mt-4" />
        </CardContent>
      </Card>

      <Card className="mt-4 shadow-md p-4">
        <h3 className="text-lg font-semibold">Thông tin đặt xe</h3>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Người đặt:</p>
            <p className="font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">SĐT:</p>
            <p className="font-semibold">{user.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Bắt đầu:</p>
            <p className="font-semibold">{searchData.startDate} - {searchData.startTime}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Kết thúc:</p>
            <p className="font-semibold">{searchData.endDate} - {searchData.endTime}</p>
          </div>
        </div>
      </Card>

      <Card className="mt-4 p-4 bg-gray-50 shadow-md">
        <h3 className="text-lg font-semibold">Chi tiết thanh toán</h3>

        {/* Hiển thị số giờ thuê và giá thuê mỗi giờ */}
        {searchData.startDate === searchData.endDate && (
          <p className="text-gray-600 text-sm">
            Thuê <span className="font-semibold">{Math.floor(diffInHours)}</span> giờ ×{" "}
            <span className="font-semibold">{(car.pricePerDay * 0.1 * 1.05).toLocaleString()} đ</span>/giờ
          </p>
        )}

        {/* Hiển thị số ngày thuê và giá thuê mỗi ngày */}
        {searchData.startDate !== searchData.endDate && (
          <p className="text-gray-600 text-sm">
            Thuê <span className="font-semibold">{Math.floor(diffInDays)}</span> ngày ×{" "}
            <span className="font-semibold">{(car.pricePerDay * 1.05).toLocaleString()} đ</span>/ngày
          </p>
        )}

        {/* Hiển thị thuế VAT 8% */}
        <p className="text-gray-600 text-sm">
          Thuế VAT (8%): <span className="font-semibold">{(totalPrice - (totalPrice / 1.08)).toLocaleString()} đ</span>
        </p>

        {/* Hiển thị tổng tiền cuối cùng */}
        <p className="text-2xl font-bold text-red-500 border-t mt-2 pt-2">
          Tổng thanh toán: {totalPrice.toLocaleString()} đ
        </p>
      </Card>

      <Button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold" onClick={handleBooking}>
        Xác nhận & Thanh toán
      </Button>
    </div>
  );
};

export default Booking;
