import React from "react";
import styled, { withTheme } from "styled-components";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

//Chart.register(ChartDataLabels);

const Chart = ({ labels, label, data }) => {
  // lables: x축   label은 툴팁에 나오는 내용 data: y축
  const barChartData = {
    // labels: ["탈박물관", "문수암", "당항포", "상족암", "생태학습관", "남산공원입구", "남산공원오토캠핑장", "고성박물관", "엄홍길전시관",
    // "고성시장", "수남유수지 생태공원", "갈모봉 산림욕장", "당향포 공룡의 문", "연꽃공원", "옥천사"],
    plugins: [ChartDataLabels],
    labels: labels,
    datasets: [
      {
        //data: [10,20,30,40,50,60,70,80,90,11,12,13,14,15,16],
        data: data,
        //label: "방문객 수",
        label: label,
        backgroundColor: [
          "rgba(249, 111, 96, 0.5)",
          "rgba(243, 51, 145, 0.5)",
          "rgba(200, 78, 213, 0.5)",
          "rgba(150, 103, 211, 0.5)",
          "rgba(108, 128, 209, 0.5)",
          "rgba(138, 181, 237, 0.5)",
          "rgba(0, 201, 249, 0.5)",
          "rgba(0, 214, 230, 0.5)",
          "rgba(0, 189, 177, 0.5)",
          "rgba(0, 180, 120, 0.5)",
          "rgba(123, 206, 127, 0.5)",
          "rgba(201, 228, 40, 0.5)",
          "rgba(255, 244, 104, 0.5)",
          "rgba(255, 189, 0, 0.5)",
          "rgba(255, 40, 0, 0.5)",
        ], //bar색상
        fill: true,
        datalabels: {
          align: "end",
          anchor: "start",
          color: "white",
          font: { size: 24 },
        },
        minBarLength: 5,
      },
    ],

    color: "rgb(255,255,255)",
  };
  const plugin = {
    id: "custom_canvas_background_color",
    beforeDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = rgba(0, 0, 0, 1);
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const barChart = (
    <Bar
      type="bar"
      width={47}
      height={14}
      options={{
        plugins: {
          //       id: 'custom_canvas_background_color',
          // beforeDraw: (chart) => {
          //   const {ctx} = chart;
          //   ctx.save();
          //   ctx.globalCompositeOperation = 'destination-over';
          //   ctx.fillStyle = rgba(0,0,0,1);
          //   ctx.fillRect(0, 0, chart.width, chart.height);
          //   ctx.restore();
          // },
          legend: {
            display: false,
          },
          datalabels: {
            display: function (context) {
              return context.dataset.data[context.dataIndex] > 15;
            },
            align: "top",
            anchor: "center",
            formatter: Math.round,
          },
        },
        scales: {
          // yAxes: [{
          //   ticks:{
          //     display: true,
          //   }
          // }],
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
            stacked: true,
          },
          y: {
            grid: {
              color: "rgba(255,255,255,0.1)",
              borderColor: "white",
            },
            ticks: {
              color: "white",
              font: {
                // [y축 폰트 스타일 변경]
                //family: 'Comic Sans MS',
                size: 11,
                weight: "normal",
                lineHeight: 0.5,
              },
              display: true,
            },
            stacked: true,
          },
        },
      }}
      data={barChartData}
    />
  );
  return barChart;
};
export default Chart;
