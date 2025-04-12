import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const goToBookingDetails = () => {
    // Điều hướng đến trang để theo dõi chuyến đi (giả sử trang đó là /booking-details)
    navigate("/car-list");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Đã hoàn tất thủ tục đặt xe!</h2>
      <p className="text-lg text-gray-800 text-center">
        Vui lòng kiểm tra chuyến đi của bạn để theo dõi quá trình thuê xe.
      </p>
      <div className="flex justify-center mt-6">
        <Button type="primary" onClick={goToBookingDetails}>Trở về trang chủ</Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
