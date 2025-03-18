import { createContext, useContext, useState, ReactNode } from "react";

// 1️⃣ Xác định kiểu dữ liệu cho Context
interface CarSearchData {
  location: string;
  carType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

interface CarSearchContextType {
  searchData: CarSearchData;
  setSearchData: (data: CarSearchData) => void;
}

// 2️⃣ Tạo Context
export const CarSearchContext = createContext<CarSearchContextType | null>(null);

// 3️⃣ Provider để bọc toàn bộ ứng dụng
export const CarSearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<CarSearchData>({
    location: "Thành phố Hồ Chí Minh",
    carType: "Xe tự lái",
    startDate: new Date().toISOString().split("T")[0], // Ngày hiện tại
    endDate: new Date().toISOString().split("T")[0], // Ngày hiện tại
    startTime: "08:00",
    endTime: "12:00",
  });

  return (
    <CarSearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </CarSearchContext.Provider>
  );
};

// 4️⃣ Custom Hook để sử dụng Context an toàn
export const useCarSearch = () => {
  const context = useContext(CarSearchContext);
  if (!context) {
    throw new Error("useCarSearch must be used within a CarSearchProvider");
  }
  return context;
};
