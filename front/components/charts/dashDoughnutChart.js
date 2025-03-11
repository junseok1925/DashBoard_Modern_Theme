import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { withTheme } from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ datas, label }) => {
  const data = {
    plugins: [ChartDataLabels],
    labels: label,
    datasets: [
      {
        label: "# of Votes",
        data: datas,
        backgroundColor: ["#4077F8", "#4042C5", "#95CEFF", "rgba(75, 192, 192, 0.4)", "rgba(54, 162, 235, 0.4)", "rgba(70, 65, 217, 0.4)", "rgba(153, 102, 255, 0.4)", "rgba(243, 51, 145, 0.4)"],
        borderColor: ["#4077F8", "#4042C5", "#95CEFF", "rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)", "rgba(70, 65, 217, 1)", "rgba(153, 102, 255, 1)", "rgba(243, 51, 145, 0.9)"],
        borderWidth: 1,
        cutout: "45%",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "white",
          font: {
            size: 12,
            //weight: "600",
          },
        },
      },
      title: {
        display: false,
        text: "실시간 방문객",
        font: {
          size: 16,
        },
      },
      datalabels: {
        display: true,
        formatter: (value, ctx) => {
          let total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
          let result = (value / total) * 100;
          return result <= 5 ? "" : result.toFixed(1) + "%";
        },
        color: "white",
        font: (context) => ({
          size: 12,
        }),
        textShadowBlur: 7,
        textShadowColor: "black",
      },
      doughnutlabel: {
        labels: [
          {
            text: "test",
            font: {
              size: 17,
              weight: "bold",
            },
          },
          {
            text: "total",
          },
        ],
      },
    },
  };

  return <Doughnut type="doughnut" width={400} height={400} options={options} plugins={data.plugins} data={data} />;
};

export default DoughnutChart;
