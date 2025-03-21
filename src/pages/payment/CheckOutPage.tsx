import { useRef, useState } from "react";
import { Banknote, CreditCard, Wallet } from "lucide-react";
import { Button, message } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../api";

const PaymentSelection = () => {
  const userRef = useRef(localStorage.getItem("user"));
  const user = userRef.current ? JSON.parse(userRef.current) : null;
  const [selectedMethod, setSelectedMethod] = useState("Credit Card");
  const location = useLocation();
  const { bookingId, amount } = location.state || {};
  const validBookingId = bookingId ;
  const validTotalPrice = amount;
  const navigate = useNavigate();

  if (!validBookingId || !validTotalPrice) {
    return <p>Thông tin thanh toán không hợp lệ.</p>;
  }

  const paymentMethods = [
    { id: "Credit Card", label: "Chuyển khoản ngân hàng", icon: Banknote },
    // { id: "cash", label: "Tiền mặt", icon: Wallet },
  ];
  const handlePayment = async () => {
    try {
      const paymentData = {
        bookingId: validBookingId,
        amount: validTotalPrice,
        paymentMethod: selectedMethod,
      };

      // Gửi yêu cầu thanh toán đến backend
      const response = await api.post("/payment/create", paymentData);

      // Nếu thanh toán thành công
      if (response.status === 200) {
        message.success("Thanh toán thành công!");
        navigate("/car-list"); // Điều hướng tới trang carlist

      } else {
        message.error("Thanh toán thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      message.error("Lỗi khi thanh toán, vui lòng thử lại!");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Chọn phương thức thanh toán</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payment Methods */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex items-center w-full p-4 border rounded-lg mb-2 transition-colors ${
                selectedMethod === method.id ? "border-orange-500 bg-orange-100" : "border-gray-300"
              }`}
            >
              <method.icon className="w-6 h-6 mr-3" />
              {method.label}
            </button>
          ))}
        </div>
        
        {/* Payment Details */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Mã thanh toán</h3>
          <p className="text-xl font-semibold text-gray-800">Tổng giá trị: <span className="text-orange-600">{validTotalPrice.toLocaleString()}</span></p>
          <div className="flex justify-center my-4">
            <img src="https://img.vietqr.io/image/STB-070125660841-qr_only.png" alt="QR Code" className="w-64 h-64" />
          </div>
          <p className="text-sm text-gray-600">Nội dung: <span className="font-semibold">THUEXETHEOGIO</span></p>
          <p className="text-sm text-gray-600">STK: <span className="font-semibold">070125660841</span></p>
          <p className="text-sm text-gray-600">Ngân hàng: <span className="font-semibold">Sacombank</span></p>
          <p className="text-xs text-gray-500 mt-2">* Trường hợp nhiều khách đặt xe cùng một thời điểm, hệ thống sẽ ưu tiên khách hàng thanh toán sớm nhất.</p>
          <p className="text-xs text-gray-500">* Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc liên lạc bên ngoài trang web.</p>
          <Button variant="outlined" className="w-full mt-4" onClick={handlePayment}>Xác nhận</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelection;