import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ series, labels }) => {
  const [state, _] = useState({
    series: series,
    options: {
      chart: {
        type: "pie",
        width: "100%",
      },
      labels: labels,
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
