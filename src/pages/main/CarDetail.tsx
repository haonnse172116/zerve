import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/card/card";
import { Button, message } from "antd"; // ✅ Thêm message từ Antd để hiển thị thông báo
import { FaGasPump, FaCogs, FaUser, FaMapMarkerAlt, FaTag, FaRoad } from "react-icons/fa";
import { MdGpsFixed, MdUsb } from "react-icons/md";
import { AiOutlineBook } from "react-icons/ai";
import { BiCamera, BiMap } from "react-icons/bi";
import { RiSpeedFill } from "react-icons/ri";
import { IoMdCar } from "react-icons/io";
import { Shield } from "lucide-react";
import api from "../../api";
import { useAuth } from "../../components/context/AuthContext";

const CarRentalListing = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const user  = useAuth();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await api.get(`/car/get-by-id/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết xe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetail();
  }, [carId]);

  const handleRentCar = () => {
    if (!user) { // ✅ Kiểm tra user từ context
      message.warning("Vui lòng đăng nhập hoặc tạo tài khoản để đặt xe!");
      navigate("/login");
      return;
    }else navigate(`/booking/${carId}`)

  };

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Không tìm thấy xe!</p>;

  return (
    <div className="max-w-full p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Section - Car Images & Details */}
      <div className="md:col-span-2">
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 gap-2">
            {car.images.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Car Image ${index}`}
                className={`w-full object-cover ${index === 0 ? "h-72 col-span-2" : "h-36"}`}
              />
            ))}
          </div>
          <CardContent className="flex justify-between items-center mt-2">
            <h2 className="text-2xl font-bold">{car.name}</h2>
            <p className="text-yellow-500">⭐ {car.averageRating} | {car.location}</p>
          </CardContent>
          <CardContent>
            <h2 className="text-xl font-semibold border-b-2 border-red-500 pb-1 inline-block mb-4">Đặc điểm</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left mb-6 border-b pb-4">
              <div className="flex items-center gap-2">
                <FaCogs size={24} className="text-red-500" />
                <div>
                  <span className="text-gray-500 text-sm">Truyền động</span>
                  <p className="font-semibold">{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaUser size={24} className="text-red-500" />
                <div>
                  <span className="text-gray-500 text-sm">Số ghế</span>
                  <p className="font-semibold">{car.seats} chỗ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaGasPump size={24} className="text-red-500" />
                <div>
                  <span className="text-gray-500 text-sm">Nhiên liệu</span>
                  <p className="font-semibold">{car.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaRoad size={24} className="text-red-500" />
                <div>
                  <span className="text-gray-500 text-sm">Tiêu hao</span>
                  <p className="font-semibold">{car.fuelConsumption}L/100km</p>
                </div>
              </div>
            </div>

            {/* Mô tả */}
            <h2 className="text-xl font-semibold border-b-2 border-red-500 pb-1 inline-block mb-2">Mô tả</h2>
            <p className="text-gray-600 border-b-2 pb-4 mb-6">{car.description}</p>
            <p className="text-gray-600 border-b-2 pb-4 mb-6">Biển số: {car.licensePlate}</p>

            {/* Tiện nghi khác */}
            <h2 className="text-xl font-semibold border-b-2 border-red-500 pb-1 inline-block mb-4">Các tiện nghi khác</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
              {car.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <BiMap className="text-gray-600" /> {feature}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section - Pricing & Booking */}
      <div>
        <Card className="shadow-lg rounded-lg p-6 bg-[#fdf7f3]">
          <h3 className="text-2xl font-bold text-red-600">
            {car.pricePerDay.toLocaleString()} <span className="text-gray-600">đ/ngày</span>
          </h3>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Địa điểm nhận xe và trả về: {car.pickupLocations.join(" - ")}</p>
          </div>
          <Button
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
            onClick={handleRentCar}
          >
            CHỌN THUÊ
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CarRentalListing;
