import { useContext, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaSlidersH } from "react-icons/fa";
import { IoCarOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { BsStar, BsClock } from "react-icons/bs";
import { FiZap, FiMapPin } from "react-icons/fi";
import { RiShieldCheckLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Modal, Button, DatePicker, TimePicker, Select } from "antd";
import api from "../../api";
import { CarSearchContext } from "../../components/context/CarSearchContext";
import dayjs from "dayjs";

const { Option } = Select;

// 🔹 Định nghĩa kiểu dữ liệu cho xe
interface Car {
  _id: string;
  name: string;
  location: string;
  pricePerDay: number;
  pricePerHour: number;
  images: string[];
}

const SearchFilterCarList = () => {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { searchData, setSearchData } = useContext(CarSearchContext);

  // 🔥 State cho Modal chỉnh sửa ngày/giờ thuê
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedSearchData, setEditedSearchData] = useState(searchData);

  // 🔹 Fetch danh sách xe dựa trên searchData từ Context
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await api.get("/car/available", {
          params: searchData,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        console.log("Danh sách xe có sẵn:", response.data);
        setCars(response.data);
      } catch (error) {
        console.error("Lỗi khi tìm xe:", error);
        alert("Đã xảy ra lỗi khi tìm kiếm xe!");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchData]);

  // 🔹 Lọc xe theo tên (tìm kiếm)
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🛠 Xử lý mở Modal chỉnh sửa thời gian
  const handleOpenModal = () => {
    setEditedSearchData(searchData);
    setIsModalOpen(true);
  };

  // 🛠 Xử lý lưu thời gian thuê sau khi chỉnh sửa
  const handleSaveTime = () => {
    setSearchData(editedSearchData);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center bg-gray-100">
      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="w-full max-w-none">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt />
            <span>{searchData.location || "Hồ Chí Minh"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt />
            <span>
              {`${searchData.startTime}, ${searchData.startDate} - ${searchData.endTime}, ${searchData.endDate}`}
            </span>
          </div>
          <Button type="primary" onClick={handleOpenModal}>
            Chỉnh sửa thời gian
          </Button>
        </div>

        <input
          type="text"
          placeholder="Tìm kiếm xe..."
          className="w-full p-3 mt-3 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Danh sách xe */}
      <div className="w-full max-w-none mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center text-gray-600 mt-6">
            Đang tải danh sách xe...
          </p>
        ) : filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
  key={car._id}
  onClick={() => navigate(`/car-detail/${car._id}`)}
  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
>
  <img
    src={car.images?.[0]}
    alt="Car Image"
    className="w-full h-64 object-cover cursor-pointer"
  />
  <div className="p-4">
    <h3 className="text-lg font-semibold">{car.name}</h3>
    <p className="text-gray-500 text-sm">{car.location}</p>
    <div className="mt-2 flex justify-between items-center">
      <span className="text-red-500 font-semibold">
        {car.pricePerDay.toLocaleString()}đ/ngày
      </span>
      <span className="text-gray-500 text-sm">
        {car.pricePerHour.toLocaleString()}đ/giờ
      </span>
    </div>
  </div>
</div>

          ))
        ) : (
          <p className="text-center text-gray-600 mt-6">
            Không tìm thấy xe phù hợp.
          </p>
        )}
      </div>

      {/* 🔥 Modal Chỉnh sửa ngày/giờ thuê */}
      <Modal
        title="Chỉnh sửa thời gian thuê"
        visible={isModalOpen}
        onOk={handleSaveTime}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col space-y-4">
          <label>Ngày bắt đầu:</label>
          <DatePicker
            value={dayjs(editedSearchData.startDate)}
            onChange={(date) =>
              setEditedSearchData({ ...editedSearchData, startDate: date?.format("YYYY-MM-DD") })
            }
          />
          <label>Giờ bắt đầu:</label>
          <TimePicker
            value={dayjs(editedSearchData.startTime, "HH:mm")}
            format="HH:mm"
            onChange={(time) =>
              setEditedSearchData({ ...editedSearchData, startTime: time?.format("HH:mm") })
            }
          />              
              <label>Ngày kết thúc:</label>
          <DatePicker
            value={dayjs(editedSearchData.endDate)}
            onChange={(date) =>
              setEditedSearchData({ ...editedSearchData, endDate: date?.format("YYYY-MM-DD") })
            }
          />
          <label>Giờ kết thúc:</label>
          <TimePicker
            value={dayjs(editedSearchData.endTime, "HH:mm")}
            format="HH:mm"
            onChange={(time) =>
              setEditedSearchData({ ...editedSearchData, endTime: time?.format("HH:mm") })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default SearchFilterCarList;
