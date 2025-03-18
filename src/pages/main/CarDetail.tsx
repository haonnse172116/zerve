// import { Card, CardContent } from "../../components/card/card";
// import { Button } from "antd";
// import { FaGasPump, FaCogs, FaUser, FaMapMarkerAlt, FaTag, FaRoad } from "react-icons/fa";
// import { MdGpsFixed, MdUsb } from "react-icons/md";
// import { AiOutlineBook } from "react-icons/ai";
// import { BiCamera, BiMap } from "react-icons/bi";
// import { RiSpeedFill } from "react-icons/ri";
// import { IoMdCar } from "react-icons/io";
// import { Shield } from "lucide-react";
// import api from "../../api";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const CarRentalListing = () => {
//   const { carId } = useParams();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchCarDetail = async () => {
//       try {
//         const response = await api.get(`car/get-by-id/${carId}`);
//         setCar(response.data);
//       } catch (error) {
//         console.error("Lỗi khi lấy chi tiết xe:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarDetail();
//   }, [carId]);
//   if (loading) return <p>Loading...</p>;
//   if (!car) return <p>Không tìm thấy xe!</p>;
//   return (
//     <div className="max-w-full p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Left Section - Car Images & Details */}
//       <div className="md:col-span-2">
//         <Card className="shadow-lg rounded-lg overflow-hidden">
//           <div className="grid grid-cols-2 gap-2">
//             <img
//               src="Car.jpg"
//               alt="Hyundai I10 Sedan 2019"
//               className="w-full h-72 object-cover col-span-2"
//             />
//             <img src="Car.jpg" alt="Rear View" className="w-full h-36 object-cover" />
//             <img src="Car.jpg" alt="Front View" className="w-full h-36 object-cover" />
//             <img src="Car.jpg" alt="Side View" className="w-full h-36 object-cover" />
//           </div>
//           <CardContent className="flex justify-between items-center mt-2">
//             <h2 className="text-2xl font-bold">HYUNDAI I10 SEDAN 2019</h2>
//           </CardContent>
//           <CardContent>
//             <p className="text-yellow-500 text-right flex items-center border-b pb-8">
//               ⭐ 4.8 | <FaMapMarkerAlt className="ml-1 mr-1" /> Quận Bình Thạnh, TP. Hồ Chí Minh
//             </p>
//           </CardContent>
//           <CardContent>
//             {/* Đặc điểm */}
//             <h2 className="text-xl font-semibold border-b-2 border-red-500 pb-1 inline-block mb-4">
//               Đặc điểm
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left mb-6 border-b pb-4">
//               <div className="flex items-center gap-2">
//                 <FaCogs size={24} className="text-red-500" />
//                 <div>
//                   <span className="text-gray-500 text-sm">Truyền động</span>
//                   <p className="font-semibold">Số tự động</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaUser size={24} className="text-red-500" />
//                 <div>
//                   <span className="text-gray-500 text-sm">Số ghế</span>
//                   <p className="font-semibold">4 chỗ</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaGasPump size={24} className="text-red-500" />
//                 <div>
//                   <span className="text-gray-500 text-sm">Nhiên liệu</span>
//                   <p className="font-semibold">Xăng</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaRoad size={24} className="text-red-500" />
//                 <div>
//                   <span className="text-gray-500 text-sm">Tiêu hao</span>
//                   <p className="font-semibold">6.6L/100km</p>
//                 </div>
//               </div>
//             </div>

//             {/* Mô tả */}
//             <h2 className="text-xl font-semibold border-b-2 border-red-500 pb-1 inline-block mb-2">
//               Mô tả
//             </h2>
//             <p className="text-gray-600 border-b-2 pb-4 mb-6">
//               Xe Hyundai i10, dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác.
//             </p>

//             {/* Tiện nghi khác */}
//             <h2 className="text-xl font-semibold border-b-2 border-red-500 pb-1 inline-block mb-4">
//               Các tiện nghi khác
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
//               <div className="flex items-center gap-2"><BiMap className="text-gray-600" /> Bản đồ</div>
//               <div className="flex items-center gap-2"><AiOutlineBook className="text-gray-600" /> Bluetooth</div>
//               <div className="flex items-center gap-2"><BiCamera className="text-gray-600" /> Camera lùi</div>
//               <div className="flex items-center gap-2"><RiSpeedFill className="text-red-500" /> Cảnh báo tốc độ</div>
//               <div className="flex items-center gap-2"><MdGpsFixed className="text-gray-600" /> Định vị GPS</div>
//               <div className="flex items-center gap-2"><MdUsb className="text-gray-600" /> Khe cắm USB</div>
//               <div className="flex items-center gap-2"><IoMdCar className="text-gray-600" /> Lốp dự phòng</div>
//               <div className="flex items-center gap-2"><Shield className="text-red-500" /> Túi khí an toàn</div>
//             </div>
//           </CardContent>

//         </Card>
//       </div>

//       {/* Right Section - Pricing & Booking */}
//       <div>
//         <Card className="shadow-lg rounded-lg p-6 bg-[#fdf7f3]">
//           <h3 className="text-2xl font-bold text-red-600">607K <span className="text-gray-600">/ngày</span></h3>

//           <div className="grid grid-cols-2 gap-4 mt-4 border border-gray-300 rounded-lg p-3 bg-white">
//             <div>
//               <p className="text-gray-500 text-sm">Nhận xe</p>
//               <p className="font-semibold">19/10/2024 <span className="ml-1">21:00</span></p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Trả xe</p>
//               <p className="font-semibold">20/10/2024 <span className="ml-1">20:00</span></p>
//             </div>
//           </div>

//           <div className="mt-4 border border-gray-300 rounded-lg p-3 bg-white">
//             <p className="text-gray-500 text-sm">Địa điểm giao xe</p>
//             <p className="font-semibold">69 Ngô Tất Tố, Phường 21, Quận Bình Thạnh</p>
//             <p className="text-gray-500 text-xs">Rất tiếc, chủ xe không hỗ trợ giao xe tận nơi</p>
//           </div>

//           <div className="mt-4 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Đơn giá thuê</span>
//               <span className="font-bold">607 292đ/ngày</span>
//             </div>
//             <div className="flex justify-between mt-1">
//               <span className="text-gray-600">Bảo hiểm thuê xe</span>
//               <span className="font-bold">59 777đ/ngày</span>
//             </div>
//             <hr className="my-3" />
//             <div className="flex justify-between text-lg font-bold">
//               <span>Tổng cộng</span>
//               <span>667 069đ × 1 ngày</span>
//             </div>
//             <div className="mt-2 flex justify-between text-red-500">
//               <span className="flex items-center"><FaTag className="mr-2" /> Mã LEHOI</span>
//               <span>-53 366đ</span>
//             </div>
//             <hr className="my-3" />
//             <div className="flex justify-between text-lg font-bold">
//               <span>Thành tiền</span>
//               <span className="text-blue-600">613 703đ</span>
//             </div>
//           </div>

//           <Button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold">CHỌN THUÊ</Button>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CarRentalListing;



// import { Card, CardContent } from "../../components/card/card";
// import { Button } from "antd";
// import { FaGasPump, FaCogs, FaUser, FaMapMarkerAlt, FaTag, FaRoad } from "react-icons/fa";
// import { MdGpsFixed, MdUsb } from "react-icons/md";
// import { AiOutlineBook } from "react-icons/ai";
// import { BiCamera, BiMap } from "react-icons/bi";
// import { RiSpeedFill } from "react-icons/ri";
// import { IoMdCar } from "react-icons/io";
// import { Shield } from "lucide-react";
// import api from "../../api";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// // 🔹 Kiểu dữ liệu cho xe
// interface Car {
//   _id: string;
//   name: string;
//   brand: string;
//   model: string;
//   year: number;
//   description: string;
//   location: string; // Địa điểm gốc của xe
//   pickupLocations: string[]; // Danh sách nơi nhận xe
//   transmission: string;
//   fuelType: string;
//   fuelConsumption: number;
//   seats: number;
//   pricePerDay: number;
//   driverAvailable: boolean;
//   features: string[];
//   images: string[];
//   status: string;
//   averageRating: number;
// }

// const CarRentalListing: React.FC = () => {
//   const { carId } = useParams<{ carId: string }>(); // Lấy carId từ URL
//   const [searchParams] = useSearchParams(); // Lấy query params từ URL
//   const [car, setCar] = useState<Car | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Lấy location từ query params (nơi nhận xe)
//   const pickupLocation = searchParams.get("location") || "";
//   const returnLocation = pickupLocation; // Trả xe về nơi nhận xe

//   useEffect(() => {
//     const fetchCarDetail = async () => {
//       if (!carId) {
//         console.error("🚨 Không tìm thấy carId trong URL!");
//         setLoading(false);
//         return;
//       }

//       try {
//         console.log("🔍 Fetching car details from:", `/get-by-id/car/${carId}`);
//         const response = await api.get<Car>(`car/get-by-id/${carId}`);
//         console.log("✅ API response:", response.data);
//         setCar(response.data);
//       } catch (error) {
//         console.error("❌ Lỗi khi lấy chi tiết xe:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarDetail();
//   }, [carId]);

//   if (loading) return <p className="text-center text-gray-500">⏳ Loading...</p>;
//   if (!car) return <p className="text-center text-red-500">🚫 Không tìm thấy xe!</p>;

//   return (
//     <div className="max-w-full p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Left Section - Car Images & Details */}
//       <div className="md:col-span-2">
//         <Card className="shadow-lg rounded-lg overflow-hidden">
//           <div className="grid grid-cols-2 gap-2">
//             {car.images?.slice(0,4).map((img, index) => (
//               <img key={index} src={img} alt={car.name} className="w-full h-72 object-cover" />
//             ))}
//           </div>
//           <CardContent>
//             <h2 className="text-2xl font-bold">{car.name}</h2>
//             <p className="text-gray-500">{car.description}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Right Section - Pricing & Booking */}
//       <div>
//         <Card className="shadow-lg rounded-lg p-6 bg-[#fdf7f3]">
//           <h3 className="text-2xl font-bold text-red-600">
//             {car.pricePerDay.toLocaleString()}đ <span className="text-gray-600">/ngày</span>
//           </h3>

//           {/* Địa điểm nhận/trả xe */}
//           <div className="mt-4 border border-gray-300 rounded-lg p-3 bg-white">
//             <p className="text-gray-500 text-sm">📍 Nơi nhận xe</p>
//             <p className="font-semibold">{pickupLocation || car.location}</p>

//             <p className="text-gray-500 text-sm mt-2">📍 Nơi trả xe</p>
//             <p className="font-semibold">{car.location}</p>
//           </div>

//           {/* Thông tin thêm */}
//           <div className="mt-4 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">⭐ Đánh giá trung bình</span>
//               <span className="font-bold">{car.averageRating}</span>
//             </div>
//             <div className="flex justify-between mt-1">
//               <span className="text-gray-600">⚙ Truyền động</span>
//               <span className="font-bold">{car.transmission}</span>
//             </div>
//             <div className="flex justify-between mt-1">
//               <span className="text-gray-600">⛽ Nhiên liệu</span>
//               <span className="font-bold">{car.fuelType}</span>
//             </div>
//             <div className="flex justify-between mt-1">
//               <span className="text-gray-600">🚗 Số chỗ</span>
//               <span className="font-bold">{car.seats} chỗ</span>
//             </div>
//           </div>

//           <Button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
//             CHỌN THUÊ
//           </Button>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CarRentalListing;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/card/card";
import { Button } from "antd";
import { FaGasPump, FaCogs, FaUser, FaMapMarkerAlt, FaTag, FaRoad } from "react-icons/fa";
import { MdGpsFixed, MdUsb } from "react-icons/md";
import { AiOutlineBook } from "react-icons/ai";
import { BiCamera, BiMap } from "react-icons/bi";
import { RiSpeedFill } from "react-icons/ri";
import { IoMdCar } from "react-icons/io";
import { Shield } from "lucide-react";
import api from "../../api";

const CarRentalListing = () => {
  const { carId } = useParams();
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
            <p className="text-gray-500 text-sm">Địa điểm nhận xe: {car.pickupLocations.join(", ")}</p>
          </div>
          <Button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold">CHỌN THUÊ</Button>
        </Card>
      </div>
    </div>
  );
};

export default CarRentalListing;
