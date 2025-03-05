import { Chart as ChartJs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { withTheme } from "styled-components";

const Chart = ({ labels, label, datas, theme }) => {
  const data = {
    plugins: [ChartDataLabels], //플러그인 사용을 위해 연결
    labels: labels,
    datasets: [
      {
        //data: [10,20,30,40,50,60,70,80,90,11,12,13,14,15,16],
        data: datas,
        //label: "방문객 수",
        label: label,
        backgroundColor: [
          //그래프 막대 색상
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
        //그래프 안에 숫자
        anchor: "end", //start , end
        align: "top", //top bottom middle 데이터 라벨 표시 위치
        color: [
          "rgba(249, 111, 96, 1)",
          "rgba(243, 51, 145, 1)",
          "rgba(200, 78, 213, 1)",
          "rgba(150, 103, 211, 1)",
          "rgba(108, 128, 209, 1)",
          "rgba(138, 181, 237, 1)",
          "rgba(0, 201, 249, 1)",
          "rgba(0, 214, 230, 1)",
          "rgba(0, 189, 177, 1)",
          "rgba(0, 180, 120, 1)",
          "rgba(123, 206, 127, 1)",
          "rgba(201, 228, 40, 1)",
          "rgba(255, 244, 104, 1)",
          "rgba(255, 189, 0, 1)",
          "rgba(255, 40, 0, 1)",
        ],
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
        stacked: true,
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

  const darkoptions = {
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
        align: "top", //top bottom middle 데이터 라벨 표시 위치
        color: [
          "rgba(249, 111, 96, 1)",
          "rgba(243, 51, 145, 1)",
          "rgba(200, 78, 213, 1)",
          "rgba(150, 103, 211, 1)",
          "rgba(108, 128, 209, 1)",
          "rgba(138, 181, 237, 1)",
          "rgba(0, 201, 249, 1)",
          "rgba(0, 214, 230, 1)",
          "rgba(0, 189, 177, 1)",
          "rgba(0, 180, 120, 1)",
          "rgba(123, 206, 127, 1)",
          "rgba(201, 228, 40, 1)",
          "rgba(255, 244, 104, 1)",
          "rgba(255, 189, 0, 1)",
          "rgba(255, 40, 0, 1)",
        ],
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
      yAxes: [
        {
          ticks: {
            display: true,
            beginAtZero: true,
          },
        },
      ],
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
            family: "Comic Sans MS",
            size: 11,
            weight: "normal",
            lineHeight: 0.5,
          },
          display: true,
          beginAtZero: true,
          min: 0,
          // max: 1000,
          // stepSize: 100,
          padding: 8,
          fontColor: "#fff",
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
      //console.log(evt, element);	//클릭시 이벤트 추가 가능
    },
  };
  return (
    <div className="chart">
      <Bar data={data} options={theme === "dark" ? darkoptions : options} plugins={data.plugins} />
    </div>
  );
};

export default Chart;
