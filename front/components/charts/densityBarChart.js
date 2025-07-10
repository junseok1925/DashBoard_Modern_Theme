import { Chart as ChartJs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { withTheme } from "styled-components";
import { Chart as ChartJS } from "chart.js/auto";

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
        backgroundColor: (context) => {
          // 각 데이터 포인트에 대한 색상 동적 설정
          const value = context.dataset.data[context.dataIndex];
          if (value >= 10) {
            return "rgba(255, 99, 132, 0.4)"; // 빨간색
          } else if (value >= 6) {
            return "rgba(255, 159, 64, 0.3)"; // 주황색
          } else if (value >= 2) {
            return "rgba(75, 192, 192, 0.4)"; // 초록색
          } else {
            return "rgba(54, 162, 235, 0.4)"; // 기본 색상
          }
        },
        borderColor: (context) => {
          // 각 데이터 포인트에 대한 색상 동적 설정
          const value = context.dataset.data[context.dataIndex];
          if (value >= 10) {
            return "rgba(255, 99, 132, 1)"; // 빨간색
          } else if (value >= 6) {
            return "rgba(255, 159, 64, 1)"; // 주황색
          } else if (value >= 2) {
            return "rgba(75, 192, 192, 1)"; // 초록색
          } else {
            return "rgba(54, 162, 235, 1)"; // 기본 색상
          }
        },
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
          color: "rgba(255, 255, 255, 0.3)",
          //drawBorder: true,
          //borderColor: 'gray',
          fontColor: "rgba(246, 36, 89, 1)",
        },
        ticks: {
          display: false,
        },

        stacked: true,
      },
      y: {
        max: 5,
        grid: {
          color: "rgba(255, 255, 255, 0.3)",
        },
        ticks: {
          font: {
            // [y축 폰트 스타일 변경]
            //family: 'Comic Sans MS',
            size: 13,
            //weight: 'bold',
            lineHeight: 0.5,
          },
          display: true,
          beginAtZero: true,
          maxTicksLimit: 2,
          padding: 8,
          fontColor: "gray",
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
      <Bar data={data} options={options} plugins={data.plugins} />
    </div>
  );
};

export default BarChart;
