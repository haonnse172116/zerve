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
  const [token, setToken] = useState<String | null>(null);

  // 🛠 Kiểm tra Local Storage khi ứng dụng load
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // 🛠 Xử lý đăng nhập
  const login = (userData: User, token: string) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", token);
    console.log(user);
    console.log(token);
    setUser(userData);
    setToken(token);
    setIsAuthenticated(true);
  };

  // 🛠 Xử lý đăng xuất
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
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
