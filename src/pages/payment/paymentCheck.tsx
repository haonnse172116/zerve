import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const goToBookingDetails = () => {
    navigate("/car-list");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl text-white">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold">Hoàn tất thủ tục đặt xe!</h2>
        <p className="mt-4 text-lg">Chúc mừng! Đặt xe của bạn đã hoàn tất thành công.</p>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-lg font-medium">
          Vui lòng kiểm tra chuyến đi của bạn để theo dõi quá trình thuê xe.
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={goToBookingDetails}
          className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
        >
          Trở về trang chủ
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-200">* Để bảo vệ khoản thanh toán của bạn, vui lòng không liên lạc hoặc chuyển tiền bên ngoài trang web.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
