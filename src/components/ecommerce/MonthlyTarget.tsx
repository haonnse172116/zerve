import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import api from "../../api";

export default function MonthlyTarget() {
  const TARGET = 10_000_000; // 🎯 Mục tiêu doanh thu tháng (10 triệu)
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await api.get("/payment/total-revenue");
        const revenue = res.data.total || 0;
        setTotalRevenue(revenue);

        const percent = Math.min((revenue / TARGET) * 100, 100); // giới hạn 100%
        setProgress(parseFloat(percent.toFixed(2)));
      } catch (error) {
        console.error("Lỗi lấy tổng doanh thu:", error);
      }
    };

    fetchRevenue();
  }, []);

  const series = [progress];
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-white sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-black">
            Monthly Target
          </h3>
          <div className="relative inline-block">
            <button onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100"
              >
                View More
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="relative">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart options={options} series={series} type="radialBar" height={330} />
          </div>
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            +{progress.toFixed(1)}%
          </span>
        </div>

        {/* Mô tả doanh thu */}
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          Bạn đã đạt{" "}
          <strong className="text-gray-800">{progress.toFixed(1)}%</strong> mục tiêu tháng (
          <strong>{totalRevenue.toLocaleString("vi-VN")} VNĐ</strong> /{" "}
          {TARGET.toLocaleString("vi-VN")} VNĐ). Tiếp tục phát huy nhé! 💪
        </p>
      </div>

      {/* Dòng tổng kết */}
      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs sm:text-sm">Target</p>
          <p className="text-base font-semibold text-center text-gray-800 sm:text-lg">
            {TARGET.toLocaleString("vi-VN")} VNĐ
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs sm:text-sm">Revenue</p>
          <p className="text-base font-semibold text-center text-gray-800 sm:text-lg">
            {totalRevenue.toLocaleString("vi-VN")} VNĐ
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs sm:text-sm">Progress</p>
          <p className="text-base font-semibold text-center text-gray-800 sm:text-lg">
            {progress.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
