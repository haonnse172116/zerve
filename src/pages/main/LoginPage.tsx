import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import api from "../../api";
import axios from "axios";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/user/login", { 
        phoneNumber: phone,
        password
      });

      const token = response.data.token;
      if (token) {
        if (rememberMe) {
          localStorage.setItem("token", token); // Ghi nhớ đăng nhập
        } else {
          sessionStorage.setItem("token", token); // Chỉ lưu tạm cho phiên đăng nhập
        }
      }

      setMessage("Đăng nhập thành công!");
      window.location.href = "/"; // Chuyển hướng đến trang chính

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Đăng nhập thất bại.");
      } else {
        setMessage("Có lỗi xảy ra, vui lòng thử lại.");
      }
  };
}
  return (
    <div className="flex h-screen">
      {/* Left Side: Login Form */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <img src="/Logo.png" alt="Rent Connect" className="absolute top-2 left-5 w-32" />
        <div className="max-w-screen-md w-full">
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
          <p className="mt-2 text-gray-600">
            Chưa có tài khoản? <span className="text-blue-600 font-semibold">Đăng ký ngay!</span>
          </p>
          
          <div className="mt-6">
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nhập số điện thoại của bạn"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Ghi nhớ đăng nhập
            </label>
            <a href="#" className="text-blue-600">Quên mật khẩu?</a>
          </div>
          
          <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600"
          onClick={handleLogin}
          disabled={loading}>
            Đăng nhập
          </button>
          
          <p className="text-center mt-6 text-gray-600">hoặc tiếp tục với</p>
          
          <div className="flex justify-center mt-4 space-x-4">
            <FaFacebook className="text-blue-600 text-2xl cursor-pointer" />
            <FaGoogle className="text-red-500 text-2xl cursor-pointer" />
          </div>
        </div>
      </div>
      
      {/* Right Side: Full-Screen Image */}
      <div className="w-1/2 h-screen">
        <img
          src="/Pic1.jpeg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}