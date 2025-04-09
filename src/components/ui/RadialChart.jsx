import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart = ({ series, labels }) => {
  const [state, _] = useState({
    series: series,
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                let total = w.globals.series.reduce(
                  (result, item) => result + item,
                  0
                );
                return `${total}%`;
              },
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

{
  /* <RadialChart
series={[10, 20, 70]}
labels={["Male", "Female", "Non-Binary"]}
/> */
}
