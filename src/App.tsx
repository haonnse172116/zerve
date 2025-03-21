import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import CarManagement from "./pages/admin/CarManagement";
import Dashboard from "./pages/admin/Dashboard";
import UserLayout from "./pages/main/MainLayout";
import LoginPage from "./pages/main/LoginPage";
import RegisterPage from "./pages/main/RegisterPage";
import AdminLayout from "./pages/admin/AdminLayout";
import CarOrder from "./pages/admin/CarOrder";
import LoginRegisterLayout from "./components/layout/LoginRegisterLayout";
import CarList from "./pages/main/CarList";
import CarDetail from "./pages/main/CarDetail";
import CheckOut from "./pages/payment/CheckOutPage";
import Landing from "./pages/main/LandingPage";
import ProfilePage from "./pages/user/Profile";
import DriverManagement from "./pages/admin/DriverManagement";
import CarQuality from "./pages/admin/CarQuality";
import Booking from "./pages/main/Booking";
import RoleRedirect from "./components/RoleRedirect";
import MyTrips from "./pages/main/MyTrip";
import PrivateRoute from "./components/context/PrivateRoute"; // Import Private Route
import GoogleCallback from "./pages/main/GoogleCallBack";
import About from "./pages/main/About";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route dành cho người dùng */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="car-list" element={<CarList />} />
          <Route path="car-detail/:carId" element={<CarDetail />} />
          <Route path="/about" element={<About />} />


          {/* 🔒 Bảo vệ các route cần đăng nhập */}
          <Route element={<PrivateRoute />}>
            <Route path="checkout/:id" element={<CheckOut />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="booking/:carId" element={<Booking />} />
            <Route path="my-trips" element={<MyTrips />} />
          </Route>
        </Route>

        {/* Route dành cho admin (🔒 Chỉ admin được truy cập) */}
        <Route path="/admin" element={<RoleRedirect><AdminLayout /></RoleRedirect>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="car-management" element={<CarManagement />} />
          <Route path="car-order" element={<CarOrder />} />
          <Route path="driver-management" element={<DriverManagement />} />
          <Route path="car-payment" element={<CarQuality />} />
        </Route>

        {/* Route đăng nhập & đăng ký */}
        <Route element={<LoginRegisterLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/google/callback" element={<GoogleCallback />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
