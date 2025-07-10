import { Chart as ChartJs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { withTheme } from "styled-components";

const Chart = ({ labels, label, datas, theme }) => {
  const data = {
    plugins: [ChartDataLabels], //플러그인 사용을 위해 연결
    labels: labels, //그래프상 날짜 데이터
    datasets: [
      {
        data: datas,
        //label: "방문객 수",
        label: label,
        backgroundColor: theme, //bar색상
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
    //maxBarThickness: 15,    // bar 타입 막대의 최대 굵기
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
        anchor: "end", //start , end
        align: "bottom", //top bottom middle 데이터 라벨 표시 위치
        color: "rgb(255,255,255)",
        formatter: function (value, context) {
          //데이터 값이 0 이면 출력 안함
          if (context.dataset.label !== "전체") {
            value = Number(value);
            value = value
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if (value == 0 || !value) {
              return null;
            } else {
              return value;
            }
          } else {
            if (value == 0 || !value) {
              return null;
            } else {
              let result = value
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
              return result;
            }
          }
        },
      },
      tooltip: {
        // backgroundColor: 'rgba(124, 35, 35, 0.4)',
        padding: 5,
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
          color: "rgba(255,255,255,0)",
          drawBorder: true,
          borderColor: "gray",
          fontColor: "rgba(246, 36, 89, 1)",
        },
        ticks: {
          color: "gray",
          font: {
            // [y축 폰트 스타일 변경]
            family: "Comic Sans MS",
            size: 12,
            weight: "bold",
          },
        },
        stacked: false,
      },
      y: {
        grid: {
          color: "rgba(229,229,229,0.5)",
          borderColor: "gray",
        },
        ticks: {
          color: "gray",
          font: {
            // [y축 폰트 스타일 변경]
            family: "Comic Sans MS",
            size: 12,
            weight: "bold",
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
            if (value.toString().length > 8)
              return (
                Math.floor(value / 100000000).toLocaleString("ko-KR") + "억"
              );
            else if (value.toString().length > 4)
              return Math.floor(value / 10000).toLocaleString("ko-KR") + "만";
            else return value.toLocaleString("ko-KR");
          },
        },
        stacked: false,
      },
    },
    onClick: function (evt, element) {
      // onClickNot working element null
    },
  };

  return (
    <div className="chart">
      <Bar
        data={data}
        options={options}
        plugins={data.plugins}
        height={300}
        //width={100}
      />
    </div>
  );
};

export default Chart;
