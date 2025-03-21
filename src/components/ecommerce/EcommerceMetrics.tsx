import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import api from "../../api"; // <- file axios bạn đã có

export default function EcommerceMetrics() {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await api.get("/user/count-users");
        setTotalUsers(response.data.total);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng user:", error);
      }
    };

    fetchUserCount();
  }, []);
  const [totalBookings, setTotalBookings] = useState<number>(0);

useEffect(() => {
  const fetchBookingCount = async () => {
    try {
      const response = await api.get("/booking/count");
      setTotalBookings(response.data.total);
    } catch (error) {
      console.error("Lỗi khi lấy số đơn đặt xe:", error);
    }
  };

  fetchBookingCount();
}, []);
  return (  
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Tổng số user */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Người dùng
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-black">
              {totalUsers.toLocaleString()}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            +%
          </Badge>
        </div>
      </div>

      {/* Đơn hàng (ví dụ tạm) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Đơn đặt xe
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-black">
  {totalBookings.toLocaleString()}
</h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div>
    </div>
  );
}
