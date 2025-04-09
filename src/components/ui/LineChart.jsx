import ReactApexChart from "react-apexcharts";
import { useState } from "react";
const LineChart = ({ data }) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Users",
        data: data,
      },
    ],
    options: {
      chart: {
        width: "100%",
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "User Joined By Days",
        align: "left",
      },
      colors: ["oklch(70% 0.165 254.624)"],
      grid: {
        show: false,
      },
      tooltip: {
        theme: "dark",
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
    },
  });

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="line"
      height={350}
    />
  );
};

export default LineChart;
