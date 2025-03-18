import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
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

function App() {
    return (
      <Router>
      <Routes>
        {/* Route dành cho người dùng */}
        <Route element={<UserLayout />}>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="car-list" element={<CarList />} />
        <Route path="car-detail/:carId" element={<CarDetail />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="booking/:carId" element={<Booking />} />
        </Route>

        {/* Route dành cho admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="car-management" element={<CarManagement />} />
          <Route path="car-order" element={<CarOrder />} />
          <Route path="driver-management" element={<DriverManagement />} />
          <Route path="car-quality" element={<CarQuality />} />
        </Route>

        <Route element={<LoginRegisterLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

      </Routes>
    </Router>
    );
}

export default App;