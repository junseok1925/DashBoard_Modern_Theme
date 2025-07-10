import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { withTheme } from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({datas, label}) => {


  const data = {
    plugins: [ChartDataLabels],
    labels: label,
    datasets: [
      {
        label: '# of Votes',
      data: datas,
      backgroundColor: [
        'rgba(255, 188, 121, 1)',
        'rgba(255, 145, 169, 1)',        
      ],
      borderColor: [
        'rgba(255, 188, 121, 1)',
        'rgba(255, 145, 169, 1)',
      ],
      borderWidth: 1,
      cutout:"45%",
      }
    ]
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      title: {
        display: false,
        text: '대중교통 이용비율',
        font: {
          //size: 17,
          weight: 'bold'
        },
      },
      datalabels: {
        font: {
          size: 12,
          weight: 'bold'
        },
        display: true,
        formatter: (value,ctx) => {
            let total = 0
            for(let i = 0 ;i<2; i++ ){
               total += ctx.dataset.data[i]
            }
            let result = (value / total ) *100
            if(result <= 15){
                return '';
            }else{
                return result.toFixed(1) + '%';
            }
        },
        color: [
          'white',
        'white',
        ],
        // backgroundColor: '#404040'
        weight: 'bold',
        textShadowBlur: 1,
        textShadowColor : 'white',
      },
      doughnutlabel: {
        labels: [{
          text: 'test',
          font: {
            size: 17,
            weight: 'bold'
          }
        }, {
          text: 'total'
        }]
      },
    }
  };


  return (
    <Doughnut 
      type="doughnut"
      width={350}
      height={290}
      options={options}
      plugins={data.plugins}
      data={data}
    />
  );

}

export default DoughnutChart;