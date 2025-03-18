import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// 🛠 Định nghĩa kiểu dữ liệu cho user
interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "user" | "owner" | "admin";
}

// 🛠 Kiểu dữ liệu cho Context
interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// 🛠 Tạo Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🛠 Provider để bọc toàn bộ ứng dụng
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🛠 Kiểm tra Local Storage khi ứng dụng load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // 🛠 Xử lý đăng nhập
  const login = (userData: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // 🛠 Xử lý đăng xuất
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🛠 Custom Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
