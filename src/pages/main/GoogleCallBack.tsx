import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user") ? JSON.parse(decodeURIComponent(params.get("user")!)) : null;

    if (token && user) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", user.role);
      login(user, token);

      // 🔹 Điều hướng về trang phù hợp
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      console.error("Lỗi khi lấy dữ liệu từ Google OAuth");
      navigate("/login"); // Chuyển hướng về login nếu có lỗi
    }
  }, [navigate, login]);

  return <p>Đang đăng nhập, vui lòng chờ...</p>;
}
