import React from "react";
import styled, { withTheme } from 'styled-components';
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const EnvTvocChart = ({labels, label, data1, data2, data3, data4, theme}) => {// lables: x축   label은 툴팁에 나오는 내용 data: y축
  const barChartData = {
    labels: labels, //x축 이름
    datasets: [
      {
        data: data1,
        //label: "방문객 수",
        label: '황리단길 TVOC',
        backgroundColor: 'rgba(114, 197, 238, 0.7)',//bar색상
        fill: true,
        datalabels: {
          align: 'end',
          anchor: 'start',
          color: 'white'
        }, 
        minBarLength : 5,
      },  
      {
        data: data2,
        //label: "방문객 수",
        label: '첨성대 TVOC',
        backgroundColor: 'rgba(255, 221, 133, 0.7)',//bar색상
        fill: true,
        datalabels: {
          align: 'end',
          anchor: 'start',
          color: 'white'
        }, 
        minBarLength : 5,
      },  
      {
        data: data3,
        //label: "방문객 수",
        label: '동궁과월지 TVOC',
        backgroundColor: 'rgba(186, 229, 117, 0.7)',//bar색상
        fill: true,
        datalabels: {
          align: 'end',
          anchor: 'start',
          color: 'white'
        }, 
        minBarLength : 5,
      },  
      {
        data: data4,
        //label: "방문객 수",
        label: '봉황대고분 TVOC',
        backgroundColor: 'rgba(151, 147, 181, 0.7)',//bar색상
        fill: true,
        datalabels: {
          align: 'end',
          anchor: 'start',
          color: 'white'
        }, 
        minBarLength : 5,
      },
             
    ],
    
    
    color:'rgb(255,255,255)'
  };

  const options ={
    plugins: {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = rgba(0,0,0,1);
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        align: 'center',
        anchor: 'center'
      },
      tooltip: {
      }         
    },
    scales: { 
      x: {
        grid:{
          color: 'rgba(255,255,255,0)',
          drawBorder: true,
          borderColor: 'gray',
          fontColor: 'gray',
        },
        ticks: {
          color:'gray'
        }
      },
      y: {
        grid:{
          color: 'rgba(229,229,229,0.5)',
          borderColor: 'gray',
        },
        ticks: {
          color:'gray',
          font: { // [y축 폰트 스타일 변경]
            family: 'Comic Sans MS',
            size: 11,
            weight: 'normal',
            lineHeight: 0.5,   
          } 
        }
      },
      
     }
    
  }

  const darkoptions = {
    plugins: {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = rgba(0,0,0,1);
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        align: 'center',
        anchor: 'center'
      },
      tooltip: {
      }         
    },
    scales: { 
      x: {
        grid:{
          color: 'rgba(255,255,255,0)',
          drawBorder: true,
          borderColor: 'white',
          fontColor: 'rgba(246, 36, 89, 1)',
        },
        ticks: {
          color:'white'
        }
      },
      y: {
        grid:{
          color: 'rgba(255,255,255,0.1)',
          borderColor: 'white',
        },
        ticks: {
          color:'white',
          font: { // [y축 폰트 스타일 변경]
            family: 'Comic Sans MS',
            size: 11,
            weight: 'normal',
            lineHeight: 0.5,   
          } 
        }
      },
      
     }
    
  }


  const barChart = (
    <Bar
      type="bar"
      width={48}
      height={10}
      options={theme === 'dark'? darkoptions : options}
      data={barChartData}
    />
  );
  return barChart;
};
export default EnvTvocChart;
