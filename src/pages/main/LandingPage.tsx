import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCarSearch } from "../../components/context/CarSearchContext";
import api from "../../api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
interface Car {
    _id: string;
    name: string;
    location: string;
    pricePerDay: number;
    pricePerHour: number;
    images: string[];
  }
  
const Landing = () => {
    const navigate = useNavigate();
    const { searchData, setSearchData } = useCarSearch();
    const [cars, setCars] = useState<Car[]>([]);
    const [showDateModal, setShowDateModal] = useState(false);
    const [isStartDate, setIsStartDate] = useState(true);
    const [suggestions, setSuggestions] = useState([]);

    // 🔹 Lấy tất cả địa điểm từ API khi component render
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get("https://provinces.open-api.vn/api/");
                if (response.data) {
                    setSuggestions(response.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu địa điểm:", error);
            }
        };
        fetchLocations();
    }, []); // Chạy 1 lần khi component render lần đầu

    // 🔹 Xử lý chọn địa điểm

    useEffect(() => {
        const fetchCars = async () => {
          try {
            const response = await api.get("/car/available", {
              params: searchData,
              headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
              },
            });
    
            console.log("Danh sách xe có sẵn:", response.data);
            setCars(response.data.slice(0,8));
          } catch (error) {
            console.error("Lỗi khi tìm xe:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm xe!");
          } 
        };
    
        fetchCars();
      }, [searchData]);
    const handleOpenDateModal = (isStart: boolean) => {
        setIsStartDate(isStart);
        setShowDateModal(true);
    };

    const handleSaveDateTime = () => {
        setShowDateModal(false);
    };
    const handleSearch = async () => {    
        navigate("/car-list");
    };

    const renderContent = () => (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="font-semibold">Địa điểm</label>
                {/* Select hiển thị tất cả các địa điểm */}
                <select
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    className="border p-2 rounded w-full"
                >
                    <option value="">Chọn địa điểm</option>
                    {suggestions.length > 0 &&
                        suggestions.map((item: any, index) => (
                            <option key={index} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Chọn ngày & giờ */}
            <div className="flex flex-col gap-2">
               <label className="font-semibold">Ngày bắt đầu</label>
               <input
                    type="text"
                    value={`${searchData.startDate} - ${searchData.startTime}`}
                    onClick={() => handleOpenDateModal(true)}
                    readOnly
                    className="border p-2 rounded cursor-pointer"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-semibold">Ngày kết thúc</label>
                <input
                    type="text"
                    value={`${searchData.endDate} - ${searchData.endTime}`}
                    onClick={() => handleOpenDateModal(false)}
                    readOnly
                    className="border p-2 rounded cursor-pointer"
                />
            </div>

            <button onClick={handleSearch} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Tìm Xe
            </button>
        </div>
    );

    return (
        <div className="flex flex-col items-center p-6">
            {/* Banner Section */}
            <section className="w-full h-96 bg-cover bg-center flex items-center justify-center text-white text-center rounded-xl" 
                style={{ backgroundImage: "url('landingpic.jpg')" }}>
                <div className="max-w-lg p-6">
                    <h1 className="text-4xl font-bold mb-4">Muốn Đi Là Có Xe</h1>
                    <p className="text-lg">Thuê xe dễ dàng, đi ngay tức thì với RentConnect!</p>
                </div>
            </section>

            {/* Car Type Selection */}
            <section className="w-full max-w-2xl mt-6">
                <div className="flex justify-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                    <button 
                        className={`px-6 py-2 rounded transition ${searchData.carType === "Xe tự lái" ? "bg-orange-500 text-white" : "bg-white text-orange-500 border border-orange-500"}`}
                        onClick={() => setSearchData({ ...searchData, carType: "Xe tự lái" })}
                    >
                        Xe tự lái
                    </button>
                    <button 
      className="px-6 py-2 rounded border border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100"
      disabled
    >
      Xe có tài (sắp ra mắt)
    </button>
                </div>
            </section>
            {showDateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
                style={{ backdropFilter: "blur(2px)" }}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Chọn ngày và giờ</h3>
                        <DatePicker
                            selected={isStartDate ? new Date(searchData.startDate) : new Date(searchData.endDate)}
                            onChange={(date) => {
                                if (date) {
                                    setSearchData({ 
                                        ...searchData, 
                                        [isStartDate ? "startDate" : "endDate"]: date.toISOString().split("T")[0] // Lưu dạng YYYY-MM-DD
                                    });
                                }
                            }}
                            dateFormat="dd/MM/yyyy"
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="time"
                            value={isStartDate ? searchData.startTime : searchData.endTime}
                            onChange={(e) => setSearchData({
                                ...searchData,
                                [isStartDate ? "startTime" : "endTime"]: e.target.value
                            })}
                            className="border p-2 rounded w-full mt-2"
                        />
                        <button onClick={handleSaveDateTime} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}
            {/* Form Section */}
            <section className="w-full max-w-2xl mt-6">
                {renderContent()}
            </section>
            <section className="w-full max-w-6xl mt-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Chọn xe cho hành trình của bạn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cars.map((car) => (
                        <div
                            key={car._id}
                            onClick={() => navigate(`/car-detail/${car._id}`)}
                            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                        >
                            <img src={car.images?.[0]} alt="Car" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{car.name}</h3>
                                <p className="text-gray-500 text-sm flex items-center">
                                    <FaMapMarkerAlt className="mr-1 text-red-500" /> {car.location}
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                    <span className="text-red-500 font-semibold flex items-center">
                                        <IoMdPricetag className="mr-1" /> {car.pricePerDay.toLocaleString()}đ/ngày
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
    
};

export default Landing;
