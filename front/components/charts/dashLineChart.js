import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ datas, daylabel }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "금일 방문객 추이",
        font: {
          size: 17,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          display: true,
          beginAtZero: true,
          min: 0,
          // max: 1000,
          // stepSize: 100,
          padding: 8,
          fontColor: "gray",
          callback: function (value, index) {
            if (value.toString().length > 8) return Math.floor(value / 100000000).toLocaleString("ko-KR") + "억";
            else if (value.toString().length > 5) return Math.floor(value / 10000).toLocaleString("ko-KR") + "만";
            else return value.toLocaleString("ko-KR");
          },
          color: "white", // Y축 글자(라벨) 흰색
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)", // Y축 그리드 선을 흰색 + 30% 투명도
        },
        stacked: true,
      },
      x: {
        ticks: {
          color: "white", // X축 글자(라벨) 흰색
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)", // X축 그리드 선을 흰색 + 30% 투명도
        },
      },
    },
  };

  const labels = daylabel;
  //const labels = ['월','화','수','목','금','토','일'];

  const data = {
    labels,
    datasets: [
      {
        label: "방문객 수(명)",
        data: datas,
        borderColor: "#F8C140",
        backgroundColor: "#F8C140",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
