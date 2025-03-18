// import { useState } from "react";
// import { FaMapMarkerAlt, FaCalendarAlt, FaSlidersH } from "react-icons/fa";
// import { IoCarOutline } from "react-icons/io5";
// import { TbWorld } from "react-icons/tb";
// import { BsStar, BsClock, BsPercent } from "react-icons/bs";
// import { FiZap, FiMapPin } from "react-icons/fi";
// import { RiShieldCheckLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

// const carData = [
//   {
//     id: 1,
//     name: "KIA K3 PREMIUM 2022",
//     location: "Quận Bình Thạnh, TP. Hồ Chí Minh",
//     rating: 4.8,
//     trips: 12,
//     price: 913000,
//     discountPrice: 620000,
//     discount: "13%",
//     image: "/Car.jpg",
//   },
//   {
//     id: 2,
//     name: "Toyota Vios 2023",
//     location: "Quận 1, TP. Hồ Chí Minh",
//     rating: 4.9,
//     trips: 20,
//     price: 850000,
//     discountPrice: 700000,
//     discount: "10%",
//     image: "/Car.jpg",
//   },
//   {
//     id: 3,
//     name: "Hyundai Accent 2021",
//     location: "Quận 3, TP. Hồ Chí Minh",
//     rating: 4.7,
//     trips: 18,
//     price: 780000,
//     discountPrice: 650000,
//     discount: "15%",
//     image: "/Car.jpg",
//   },
//   {
//     id: 4,
//     name: "Hyundai Accent 2021",
//     location: "Quận 3, TP. Hồ Chí Minh",
//     rating: 4.7,
//     trips: 18,
//     price: 780000,
//     discountPrice: 650000,
//     discount: "15%",
//     image: "/Car.jpg",
//   },
//   {
//     id: 5,
//     name: "Hyundai Accent 2021",
//     location: "Quận 3, TP. Hồ Chí Minh",
//     rating: 4.7,
//     trips: 18,
//     price: 780000,
//     discountPrice: 650000,
//     discount: "15%",
//     image: "/Car.jpg",
//   }
// ];

// const SearchFilterCarList = () => {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const filteredCars = carData.filter((car) =>
//     car.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="w-full min-h-screen p-6 flex flex-col items-center bg-gray-100">
//       {/* Search Bar and Filters */}
//       <div className="w-full max-w-none">
//         <div className="flex flex-col md:flex-row items-center gap-4">
//           <div className="flex items-center gap-2 text-gray-600">
//             <FaMapMarkerAlt />
//             <span>Hồ Chí Minh</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-600">
//             <FaCalendarAlt />
//             <span>21:00, 21/10/2024 - 20:00, 22/10/2024</span>
//           </div>
//         </div>

//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full p-3 mt-3 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <div className="flex flex-wrap justify-center gap-3 mt-4">
//           {[{ icon: IoCarOutline, label: "Loại xe" },
//             { icon: TbWorld, label: "Hãng xe" },
//             { icon: BsStar, label: "Chủ xe 5 sao" },
//             { icon: FiZap, label: "Đặt xe nhanh" },
//             { icon: FiMapPin, label: "Giao nhận xe tận nơi" },
//             { icon: BsClock, label: "Thuê giờ" },
//             { icon: BsPercent, label: "Giảm giá" },
//             { icon: RiShieldCheckLine, label: "Miễn thế chấp" },
//             { icon: FaSlidersH, label: "Bộ lọc" }
//           ].map(({ icon: Icon, label }, index) => (
//             <button key={index} className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700">
//               <Icon /> {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Car List */}
//       <div className="w-full max-w-none mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {filteredCars.map((car) => (
//           <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <img
//               src={car.image}
//               alt={car.name}
//               className="w-full h-64 object-cover cursor-pointer"
//               onClick={() => navigate(`/car-detail`)}
//             />
//             <div className="p-4">
//               <div className="text-yellow-500 text-sm font-bold">Số tự động</div>
//               <h3 className="text-lg font-semibold">{car.name}</h3>
//               <p className="text-gray-500 text-sm">{car.location}</p>
//               <div className="flex items-center mt-2 text-yellow-500">
//                 ⭐ {car.rating} <span className="ml-2 text-gray-500">{car.trips} chuyến</span>
//               </div>
//               <div className="mt-2 flex justify-between items-center">
//                 <span className="text-gray-400 line-through">
//                   {car.price.toLocaleString()}đ/ngày
//                 </span>
//                 <span className="text-red-500 font-semibold">
//                   {car.discountPrice.toLocaleString()}đ/ngày
//                 </span>
//               </div>
//               <span className="mt-2 inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
//                 Giảm {car.discount}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchFilterCarList;

import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaSlidersH } from "react-icons/fa";
import { IoCarOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { BsStar, BsClock } from "react-icons/bs";
import { FiZap, FiMapPin } from "react-icons/fi";
import { RiShieldCheckLine } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api";
// 🔹 Định nghĩa kiểu dữ liệu cho xe
interface Car {
  _id: string;
  name: string;
  location: string;
  pricePerDay: number;
  images: string[];
}

const SearchFilterCarList = () => {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 🔹 Lấy dữ liệu từ API `/cars/available`
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/car/available`, {
          params: {
            location: searchParams.get("location"),
            carType: searchParams.get("carType"),
            startDate: searchParams.get("startDate"),
            startTime: searchParams.get("startTime"),
            endDate: searchParams.get("endDate"),
            endTime: searchParams.get("endTime"),
          },
        });
        setCars(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách xe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchParams]);

  // 🔹 Lọc xe theo tên (tìm kiếm)
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center bg-gray-100">
      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="w-full max-w-none">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt />
            <span>{searchParams.get("location") || "Hồ Chí Minh"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt />
            <span>{`${searchParams.get("startTime")}, ${searchParams.get("startDate")} - ${searchParams.get("endTime")}, ${searchParams.get("endDate")}`}</span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Tìm kiếm xe..."
          className="w-full p-3 mt-3 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {[{ icon: IoCarOutline, label: "Loại xe" },
            { icon: TbWorld, label: "Hãng xe" },
            { icon: BsStar, label: "Chủ xe 5 sao" },
            { icon: FiZap, label: "Đặt xe nhanh" },
            { icon: FiMapPin, label: "Giao nhận xe tận nơi" },
            { icon: BsClock, label: "Thuê giờ" },
            { icon: RiShieldCheckLine, label: "Miễn thế chấp" },
            { icon: FaSlidersH, label: "Bộ lọc" }
          ].map(({ icon: Icon, label }, index) => (
            <button key={index} className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700">
              <Icon /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Danh sách xe */}
      <div className="w-full max-w-none mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center text-gray-600 mt-6">Đang tải danh sách xe...</p>
        ) : filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={car.images?.[0]} alt="Car Image"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => navigate(`/car-detail/${car._id}`)}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-gray-500 text-sm">{car.location}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-red-500 font-semibold">
                    {car.pricePerDay.toLocaleString()}đ/ngày
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-6">Không tìm thấy xe phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default SearchFilterCarList;
