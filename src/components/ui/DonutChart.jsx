import ReactApexChart from "react-apexcharts";
import { useState } from "react";

const DonutChart = ({ data }) => {
  let series = [];
  let labels = [];
  Object.keys(data).forEach((key) => {
    console.log(key);
    series.push(data[key]);
    labels.push(key);
  });

  const [state, _] = useState({
    series: series,
    options: {
      chart: {
        type: "donut",
        width: "100%",
      },
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
          fontSize: "10px",
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                formatter: () => "100%",
              },
            },
          },
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
      // legend: {
      //   position: "bottom",
      //   horizontalAlign: "center",
      //   fontSize: "14px",
      // },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: "90%",
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
              width: "90%",
            },
            dataLabels: {
              style: {
                fontSize: "12px",
              },
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              fontSize: "10px",
            },
            dataLabels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      ],
      legend: {
        show: false,
      },
      labels: labels,
    },
  });

  return (
    <div style={{ maxWidth: "100%", margin: "auto" }}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        width="100%"
      />
    </div>
  );
};

export default DonutChart;
