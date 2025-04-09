// import { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const DonutChart = ({ series }) => {
//   const [state, _] = useState({
//     series: series,
//     options: {
//       chart: {
//         width: 30,
//         type: "donut",
//       },
//       dataLabels: {
//         enabled: true,
//         formatter: function (val) {
//           return `${val.toFixed(1)}%`;
//         },
//         style: {
//           fontSize: "14px",
//         },
//       },
//       plotOptions: {
//         pie: {
//           donut: {
//             labels: {
//               show: false,
//             },
//           },
//           expandOnClick: true,
//         },
//       },
//       tooltip: {
//         enabled: true,
//         y: {
//           formatter: function (value) {
//             return `${value}`;
//           },
//           title: {
//             formatter: (seriesName) => seriesName,
//           },
//         },
//       },
//       responsive: [
//         {
//           breakpoint: 800,
//           options: {
//             chart: {
//               width: 200,
//             },
//             legend: {
//               show: false,
//             },
//           },
//         },
//       ],
//       legend: {
//         show: false,
//       },

//     },
//   });

//   return (
//     <ReactApexChart
//       options={state.options}
//       series={state.series}
//       type="donut"
//       width={400}
//     />
//   );
// };
// export default DonutChart;
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

const DonutChart = ({ series }) => {
  const [state, _] = useState({
    series: series,
    options: {
      chart: {
        type: "donut",
        width: "100%",
      },
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
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
      },
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
      labels: ["Pending", "Resolved", "Closed", "Rejected"],
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
