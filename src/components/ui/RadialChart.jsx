import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { color } from "three/tsl";

const RadialChart = ({ data }) => {
  const rawValues = Object.values(data);
  const labels = Object.keys(data);
  const total = rawValues.reduce((acc, val) => acc + val, 0);
  const series = rawValues.map((val) => ((val / total) * 100).toFixed(2));

  const [state] = useState({
    series: series,
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      colors: [
        "oklch(70% 0.165 254.624)",
        "oklch(79% 0.209 151.711)",
        "oklch(70% 0.191 22.216)",
        "oklch(71% 0.202 349.761)",
      ],
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              label: "Total",
              formatter: () => "100%",
            },
          },
        },
      },
      labels: labels,
    },
  });

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="radialBar"
      height={350}
    />
  );
};

export default RadialChart;
