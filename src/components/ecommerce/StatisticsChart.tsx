import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import api from "../../api";

export default function StatisticsChart() {
  const [salesData, setSalesData] = useState<number[]>([]);
  const [revenueData, setRevenueData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/payment/sales-revenue");
        console.log("📊 Data from API:", res.data); // 🛠 Kiểm tra dữ liệu trả về

        const sales = res.data.sales;
        const revenue = res.data.revenue;

        const monthLabels = sales.map((s: any) => `Th ${s.month}/${s.year}`);
        const salesValues = sales.map((s: any) => s.totalSales);
        const revenueValues = revenue.map((r: any) => r.totalRevenue);

        setCategories(monthLabels);
        setSalesData(salesValues);
        setRevenueData(revenueValues);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      yaxis: {
        lines: { show: true },
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: { format: "MMM yyyy" },
    },
    xaxis: {
      categories: categories,
      type: "category",
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: ["#6B7280"] },
      },
    },
  };

  const series = [
    { name: "Sales", data: salesData },
    { name: "Revenue", data: revenueData },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-black">
          Statistics
        </h3>
        <ChartTab />
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
