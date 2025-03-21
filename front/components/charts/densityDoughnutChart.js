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
        backgroundColor: ["#001FDA", "#282DE2", "#399AFF", "#3E8BFF", "#4042C5", "#4077F8", "#4165E5", "#4233E8", "#4AAAFF", "#573BF1", "#68BAFF"],
        borderColor: ["#001FDA", "#282DE2", "#399AFF", "#3E8BFF", "#4042C5", "#4077F8", "#4165E5", "#4233E8", "#4AAAFF", "#573BF1", "#68BAFF"],
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
          usePointStyle: true, // ⬅️ 범례 네모를 원으로 변경
          pointStyle: "circle", // ⬅️ 원 모양 설정
          font: {
            size: 12, // 글자 크기
            weight: "normal", // 글꼴 굵기
          },
          color: "white", // 글자 색상
        },
      },
      title: {
        display: false,
        text: "실시간 방문객",
        font: {
          weight: "bold",
        },
      },
      datalabels: {
        font: {
          size: 12,
          weight: "600",
        },
        display: true,
        formatter: (value, ctx) => {
          let total = 0;
          for (let i = 0; i < 3; i++) {
            total += ctx.dataset.data[i];
          }
          let result = (value / total) * 100;
          return result <= 15 ? "" : result.toFixed(1) + "%";
        },
        color: ["rgba(255, 255, 255,1)"],
        weight: "600",
      },
    },
  };

  return <Doughnut type="doughnut" width={400} height={400} options={options} plugins={data.plugins} data={data} />;
};

export default DoughnutChart;
