import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../../api";
import { ApexOptions } from "apexcharts";

export default function MonthlySalesChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const res = await api.get("/payment/monthly-sales");
        const result = res.data;

        const labelArr = result.map((item: any) => item.month);
        const dataArr = result.map((item: any) => item.total);

        setLabels(labelArr);
        setData(dataArr);
      } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo tháng:", err);
      }
    };

    fetchMonthlySales();
  }, []);

  const options: ApexOptions={
    chart: {
      type: "bar" as "bar",
      height: 350,
    },
    xaxis: {
      categories: labels,
    },
    colors: ["#6366F1"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Doanh thu",
      data: data,
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Monthly Sales</h2>
      <Chart options={options} series={series} type="bar" height={350} />
      </div>
  );
}
