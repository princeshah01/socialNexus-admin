import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data }) => {
  let series = [];
  let labels = [];
  Object.keys(data).forEach((key) => {
    series.push(data[key]);
    labels.push(key.charAt(0).toUpperCase() + key.slice(1));
  });
  const [state, _] = useState({
    series: series,
    options: {
      chart: {
        type: "pie",
        width: "100%",
      },
      labels: labels,
      colors: [
        "oklch(70% 0.165 254.624)",
        "oklch(79% 0.209 151.711)",
        "oklch(70% 0.191 22.216)",
        "oklch(71% 0.202 349.761)",
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `${val.toFixed(1)}%`;
        },
        style: {
          fontSize: "14px",
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (value) => `${value}`,
          title: {
            formatter: (seriesName) => seriesName,
          },
        },
      },
      legend: {
        position: "bottom",
        fontSize: "14px",
        horizontalAlign: "center",
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "100%",
            },
            dataLabels: {
              style: {
                fontSize: "12px",
              },
            },
            legend: {
              fontSize: "12px",
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            dataLabels: {
              style: {
                fontSize: "10px",
              },
            },
            legend: {
              fontSize: "10px",
            },
          },
        },
      ],
    },
  });

  return (
    <div style={{ maxWidth: "100%", margin: "auto" }}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
        width="100%"
      />
    </div>
  );
};

export default PieChart;
