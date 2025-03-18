import { useState } from "react";
import { Banknote, CreditCard, Wallet } from "lucide-react";
import { Button } from "antd";

const PaymentSelection = () => {
  const [selectedMethod, setSelectedMethod] = useState("bank_transfer");

  const paymentMethods = [
    { id: "bank_transfer", label: "Chuyển khoản ngân hàng", icon: Banknote },
    { id: "e_wallet", label: "Ví điện tử", icon: Wallet },
    { id: "international_card", label: "Thẻ quốc tế (Visa, MasterCard, JCB)", icon: CreditCard },
    { id: "domestic_card", label: "Thẻ nội địa (ATM)", icon: CreditCard },
  ];

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
          <p className="text-xl font-semibold text-gray-800">Tổng giá trị: <span className="text-orange-600">289,704đ</span></p>
          <div className="flex justify-center my-4">
            <img src="qr.png" alt="QR Code" className="w-32 h-32" />
          </div>
          <p className="text-sm text-gray-600">Nội dung: <span className="font-semibold">THUEXETHEONGAY</span></p>
          <p className="text-sm text-gray-600">STK: <span className="font-semibold">1234567890</span></p>
          <p className="text-sm text-gray-600">Ngân hàng: <span className="font-semibold">MBBank</span></p>
          <p className="text-xs text-gray-500 mt-2">* Trường hợp nhiều khách đặt xe cùng một thời điểm, hệ thống sẽ ưu tiên khách hàng thanh toán sớm nhất.</p>
          <p className="text-xs text-gray-500">* Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc liên lạc bên ngoài trang web.</p>
          <Button variant="outlined" className="w-full mt-4">Hủy</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelection;