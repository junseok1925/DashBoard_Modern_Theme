import React from "react";
import styled, { withTheme } from "styled-components";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const EnvChart = ({ labels, label1, label2, data11, data12, data13, data14, data21, data22, data23, data24, theme }) => {
  // lables: x축   label은 툴팁에 나오는 내용 data: y축
  const barChartData = {
    labels: labels, //x축 이름
    datasets: [
      {
        data: data11,
        //label: "방문객 수",
        label: "황리단길 " + label1,
        yAxisID: "A",
        backgroundColor: "rgba(114, 197, 238, 0.5)",
        //backgroundColor: 'rgba(247, 205, 175, 0.7)',//bar색상
        fill: true,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
        },
        minBarLength: 5,
      },
      {
        data: data12,
        //label: "방문객 수",
        label: "불국사 " + label1,
        yAxisID: "A",
        backgroundColor: "rgba(255, 221, 133, 0.7)", //bar색상
        fill: true,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
        },
        minBarLength: 5,
      },
      {
        data: data13,
        //label: "방문객 수",
        label: "동궁과월지 " + label1,
        yAxisID: "A",
        backgroundColor: "rgba(186, 229, 117, 0.7)", //bar색상
        fill: true,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
        },
        minBarLength: 5,
      },
      {
        data: data14,
        //label: "방문객 수",
        label: "봉황대고분 " + label1,
        yAxisID: "A",
        backgroundColor: "rgba(151, 147, 181, 0.7)", //bar색상
        fill: true,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
        },
        minBarLength: 5,
      },

      {
        data: data21,
        //label: "방문객 수",
        label: "황리단길 " + label2,
        yAxisID: "B",
        borderColor: "rgba(70, 65, 217, 0.5)",
        backgroundColor: "rgba(70, 65, 217, 0.5)",
        //borderColor: 'rgba(247, 205, 175, 1)',//bar색상
        //backgroundColor: 'rgba(247, 205, 175, 1)',
        fill: false,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
        },
        minBarLength: 5,
        type: "line",
      },
      {
        data: data22,
        //label: "방문객 수",
        label: "불국사 " + label2,
        yAxisID: "B",
        borderColor: "rgba(255, 221, 133, 0.5)",
        backgroundColor: "rgba(255, 221, 133, 0.5)",
        //borderColor: 'rgba(247, 205, 175, 1)',//bar색상
        //backgroundColor: 'rgba(247, 205, 175, 1)',
        fill: false,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
        },
        minBarLength: 5,
        type: "line",
      },
      {
        data: data23,
        //label: "방문객 수",
        label: "동궁과월지 " + label2,
        yAxisID: "B",
        borderColor: "rgba(186, 229, 117, 0.5)",
        backgroundColor: "rgba(186, 229, 117, 0.5)",
        //borderColor: 'rgba(247, 205, 175, 1)',//bar색상
        //backgroundColor: 'rgba(247, 205, 175, 1)',
        fill: false,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
        },
        minBarLength: 5,
        type: "line",
      },
      {
        data: data24,
        //label: "방문객 수",
        label: "봉황대고분 " + label2,
        yAxisID: "B",
        borderColor: "rgba(151, 147, 181, 0.5)",
        backgroundColor: "rgba(151, 147, 181, 0.5)",
        //borderColor: 'rgba(247, 205, 175, 1)',//bar색상
        //backgroundColor: 'rgba(247, 205, 175, 1)',
        fill: false,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
        },
        minBarLength: 5,
        type: "line",
      },
    ],

    color: "rgb(255,255,255)",
  };

  const options = {
    plugins: {
      id: "custom_canvas_background_color",
      beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = rgba(0, 0, 0, 1);
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        align: "center",
        anchor: "center",
      },
      tooltip: {},
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255,255,255,0)",
          drawBorder: true,
          borderColor: "gray",
          fontColor: "rgba(246, 36, 89, 1)",
        },
        ticks: {
          color: "gray",
        },
      },
      A: {
        grid: {
          color: "rgba(255,255,255,0.1)",
          borderColor: "gray",
        },
        position: "left",
        ticks: {
          color: "gray",
          font: {
            // [y축 폰트 스타일 변경]
            family: "Comic Sans MS",
            size: 11,
            weight: "normal",
            lineHeight: 0.5,
          },
        },
      },
      B: {
        grid: {
          color: "rgba(229,229,229,1)",
          borderColor: "gray",
        },
        position: "right",
        ticks: {
          color: "gray",
          font: {
            // [y축 폰트 스타일 변경]
            family: "Comic Sans MS",
            size: 11,
            weight: "normal",
            lineHeight: 0.5,
          },
        },
      },
    },
  };
  const darkoptions = {
    plugins: {
      id: "custom_canvas_background_color",
      beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = rgba(0, 0, 0, 1);
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        align: "center",
        anchor: "center",
      },
      tooltip: {},
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255,255,255,0)",
          drawBorder: true,
          borderColor: "white",
          fontColor: "rgba(246, 36, 89, 1)",
        },
        ticks: {
          color: "white",
        },
      },
      A: {
        grid: {
          color: "rgba(255,255,255,0)",
          borderColor: "white",
        },
        position: "left",
        ticks: {
          color: "white",
          font: {
            // [y축 폰트 스타일 변경]
            family: "Comic Sans MS",
            size: 11,
            weight: "normal",
            lineHeight: 0.5,
          },
        },
      },
      B: {
        grid: {
          color: "rgba(255,255,255,0.1)",
          borderColor: "white",
        },
        position: "right",
        ticks: {
          color: "white",
          font: {
            // [y축 폰트 스타일 변경]
            family: "Comic Sans MS",
            size: 11,
            weight: "normal",
            lineHeight: 0.5,
          },
        },
      },
    },
  };

  const barChart = <Bar width={50} height={7} options={theme === "dark" ? darkoptions : options} data={barChartData} />;
  return barChart;
};
export default EnvChart;
