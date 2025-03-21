import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";

export default function GoogleAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (token && user) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", JSON.parse(user).role);
      login(JSON.parse(user), token);

      if (JSON.parse(user).role === "admin") {
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
