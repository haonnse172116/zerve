import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import api from "../../api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import { Button, message } from "antd";

export default function LoginPage() {
  const { login } = useAuth(); 
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState("");

  // 🔹 Xử lý đăng nhập bằng số điện thoại
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(""); 
    try {
      const response = await api.post("/user/login", { 
        phoneNumber: phone,
        password
      });

      const {token, user} = response.data;

      if (token && user) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", user.role); 
        console.log("role:", user.role);
        login(user, token); 
        if (user.role === "admin") {
          navigate("/admin/dashboard"); // Chuyển hướng tới trang Dashboard của admin
      } else {
          navigate("/"); // Chuyển hướng trang chủ với role khác
      }
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || "Đăng nhập thất bại.";
        setErrorMessage(errorMsg); 
      } else {
        setErrorMessage("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Xử lý đăng nhập bằng Google
  const handleGoogleLogin = async () => {
    window.location.href = "https://backend-rentalcar.onrender.com/user/google";
  };
  return (
    <div className="flex h-screen">
      {/* Left Side: Login Form */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <Link to="/">
        <img src="/Logo.png" alt="Rent Connect" className="absolute top-2 left-5 w-32" />
        </Link>
        <div className="max-w-screen-md w-full">
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
          <p className="mt-2 text-gray-600">
            Chưa có tài khoản? <span className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/register")} >Đăng ký ngay!</span>
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
          
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <button 
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          
          <p className="text-center mt-6 text-gray-600">hoặc tiếp tục với</p>
          
          <div onClick={handleGoogleLogin} className="flex justify-center items-center mt-4 space-x-2 cursor-pointer">
  <FaGoogle className="text-red-500 text-2xl" />
  <span>Google</span>
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
