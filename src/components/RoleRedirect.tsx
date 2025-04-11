import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleRedirect = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    // Kiểm tra nếu người dùng không phải là admin thì điều hướng ra ngoài trang admin
    if (role !== "admin") {
      navigate("/");  // Hoặc bạn có thể redirect đến trang login, tùy nhu cầu
    }
  }, [role, navigate]);

  return <>{children}</>;
};

export default RoleRedirect;
