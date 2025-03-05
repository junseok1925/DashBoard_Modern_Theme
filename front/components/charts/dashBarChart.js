import { Chart as ChartJs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { withTheme } from "styled-components";

const BarChart = ({ daylabel, label, datas, theme }) => {
  const data = {
    plugins: [ChartDataLabels], //플러그인 사용을 위해 연결
    labels: daylabel, //그래프상 날짜 데이터
    datasets: [
      {
        //data: [10,20,30,40,50,60,70,80,90,11,12,13,14,15,16],
        data: datas,
        //label: "방문객 수",
        label: label,
        backgroundColor: [
          "rgba(107, 171, 241, 0.5)",
          "rgba(105, 177, 243, 0.5)",
          "rgba(108, 187, 240, 0.5)",
          "rgba(114, 197, 238, 0.5)",
          "rgba(110, 204, 220, 0.5)",
          "rgba(69, 199, 193, 0.4)",
          "rgba(75, 192, 192, 0.4)",
        ], //bar색상
        borderColor: [
          "rgba(107, 171, 241, 1)",
          "rgba(105, 177, 243, 1)",
          "rgba(108, 187, 240, 1)",
          "rgba(114, 197, 238, 1)",
          "rgba(110, 204, 220, 1)",
          "rgba(69, 199, 193, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1.5,
        borderRadius: 4,
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
    plugins: {
      legend: {
        position: false, //레전드 위치
      },
      title: {
        display: false, //타이틀
        text: "지난주 방문객 추이",
        font: {
          size: 17,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
      datalabels: {
        display: false,
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
      x: {
        grid: {
          color: "rgba(255,255,255,0)",
          //drawBorder: true,
          //borderColor: 'gray',
          fontColor: "rgba(246, 36, 89, 1)",
        },

        stacked: true,
      },
      y: {
        ticks: {
          font: {
            // [y축 폰트 스타일 변경]
            //family: 'Comic Sans MS',
            size: 12,
            //weight: 'bold',
            lineHeight: 0.5,
          },
          display: true,
          beginAtZero: true,
          maxTicksLimit: 7,
          padding: 8,
          fontColor: "gray",
          callback: function (value, index) {
            if (value.toString().length > 8) return Math.floor(value / 100000000).toLocaleString("ko-KR") + "억";
            else if (value.toString().length > 5) return Math.floor(value / 10000).toLocaleString("ko-KR") + "만";
            else return value.toLocaleString("ko-KR");
          },
        },
        //stacked: true,
      },
    },
    // onClick: function(evt, element) {
    //     // onClickNot working element null
    //     console.log(evt, element);	//클릭시 이벤트 추가 가능
    // }
  };

  return (
    <div className="chart">
      <Bar data={data} options={theme === "dark" ? darkoptions : options} plugins={data.plugins} />
    </div>
  );
};

export default BarChart;
