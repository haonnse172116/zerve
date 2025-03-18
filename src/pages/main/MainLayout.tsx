import { Outlet, Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {/* <nav className="bg-blue-500 p-4 text-white flex gap-4">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <Link to="/profile" className="hover:underline">Hồ sơ</Link>
      </nav> */}

      <Header/>

      {/* Nội dung trang */}
      <div className="flex-1 p-6">
        <Outlet /> {/* Hiển thị trang con */}
      </div>
      <Footer/>
    </div>
  );
}