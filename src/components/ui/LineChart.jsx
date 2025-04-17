import ReactApexChart from "react-apexcharts";
import { useState } from "react";
const LineChart = ({ data }) => {
  let series = [];
  let labels = [];
  // console.log(data);
  data.map((item) => {
    labels.push(item.day);
    series.push(item.count);
  });
  series.reverse();
  labels.reverse();
  const [state, _] = useState({
    series: [
      {
        name: "Users",
        data: series,
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
          show: true,
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
        categories: labels,
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
