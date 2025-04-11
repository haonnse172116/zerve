import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import {jwtDecode} from "jwt-decode"; 
export default function GoogleAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
        const decodedUser = jwtDecode(token);
        console.log("Decoded User:", decodedUser);

        // 🔹 Lưu token & user vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(decodedUser));
      if (decodedUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Đang xử lý đăng nhập...</p>;
}
