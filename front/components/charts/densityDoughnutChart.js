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
        backgroundColor: ["#4042C5", "#4155D7", "#4077F8", "#3E8BFF", "#399AFF", "#4AAAFF", "#68BAFF", "#95CEFF", "#BFE0FF", "#001FDA", "#282DE2", "#4233E8", "#543CEB"],
        borderColor: ["#4042C5", "#4155D7", "#4077F8", "#3E8BFF", "#399AFF", "#4AAAFF", "#68BAFF", "#95CEFF", "#BFE0FF", "#001FDA", "#282DE2", "#4233E8", "#543CEB"],
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
            // weight: "normal", // 글꼴 굵기
            family: "Pretendard", //  폰트 추가
          },
          color: "white", // 글자 색상
        },
      },
      title: {
        display: false,
        text: "실시간 방문객",
        font: {
          family: "Pretendard", //  폰트 추가
          weight: "600",
        },
      },
      datalabels: {
        font: {
          family: "Pretendard", //  폰트 추가
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
