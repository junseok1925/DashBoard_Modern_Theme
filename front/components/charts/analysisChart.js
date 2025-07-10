import { useRef, useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { withTheme } from "styled-components";

const Chart = ({ labels, label, datas, theme }) => {
  const chartRef = useRef(null);
  const [gradient, setGradients] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const newGradients = datas.map(() => {
        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, "rgba(68, 169, 255, 0.8)"); // 상단 색상
        gradient.addColorStop(1, "rgba(113, 138, 226, 0.8)"); // 하단 색상
        return gradient;
      });
      setGradients(newGradients);
    }
  }, [datas]);

  const data = {
    plugins: [ChartDataLabels], //플러그인 사용을 위해 연결
    labels: labels,
    datasets: [
      {
        data: datas,
        //label: "방문객 수",
        label: label,
        backgroundColor: gradient, //bar색상
        fill: true,

        minBarLength: 5,
      },
    ],

    color: "rgb(255,255,255)",
  };

  const options = {
    interaction: {
      mode: "index", //툴팁 전체 출력
      intersect: false,
    },
    layout: {
      padding: {
        top: 30,
      },
    },
    plugins: {
      legend: {
        position: false, //레전드 위치
      },
      title: {
        display: false, //타이틀
        text: "Total",
        fontSize: 25,
      },
      datalabels: {
        //그래프 안에 숫자
        anchor: "end", //start , end
        align: "top", //top bottom middle 데이터 라벨 표시 위치
        color: ["white"],
        font: {
          size: 14,
          // weight:600,
        },
        formatter: function (value, context) {
          //데이터 값이 0 이면 출력 안함
          if (context.dataset.label !== "전체") {
            value = Number(value);
            value = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if (value == 0 || !value) {
              return null;
            } else {
              return value;
            }
          } else {
            if (value == 0 || !value) {
              return null;
            } else {
              let result = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
              return result;
            }
          }
        },
      },
      tooltip: {
        // backgroundColor: 'rgba(124, 35, 35, 0.4)',
        padding: 10,
        // bodySpacing: 5,     //툴팁 내부의 항목 간격
      },
    },
    maintainAspectRatio: false, //false :  상위 div에 구속
    responsive: true, //false : 정적 true: 동적
    scales: {
      //  yAxes: [{
      //         ticks:{
      //           display: true,
      //           beginAtZero: true,

      //         }
      //       }],
      x: {
        grid: {
          color: "rgba(255,255,255,0.3)",
          drawBorder: true,
          borderColor: "white",
        },
        ticks: {
          color: "white",
          font: {
            // [y축 폰트 스타일 변경]
            family: "Pretendard",
            size: 12,
            weight: "600",
          },
        },
        stacked: true,
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.3)",
          borderColor: "white",
        },
        ticks: {
          color: "white",
          font: {
            // [y축 폰트 스타일 변경]
            family: "Pretendard",
            size: 12,
            weight: "600",
            lineHeight: 0.5,
          },
          display: true,
          beginAtZero: true,
          min: 0,
          // max: 1000,
          // stepSize: 100,
          padding: 8,
          fontColor: "gray",
          callback: function (value, index) {
            if (value.toString().length > 8) return Math.floor(value / 100000000).toLocaleString("ko-KR") + "억";
            else if (value.toString().length > 4) return Math.floor(value / 10000).toLocaleString("ko-KR") + "만";
            else return value.toLocaleString("ko-KR");
          },
        },
        stacked: true,
      },
    },
    onClick: function (evt, element) {
      // onClickNot working element null
      // console.log(evt, element); //클릭시 이벤트 추가 가능
    },
  };
  return (
    <div className="chart">
      <Bar ref={chartRef} data={data} options={theme === "dark" ? darkoptions : options} plugins={data.plugins} />
    </div>
  );
};

export default Chart;
