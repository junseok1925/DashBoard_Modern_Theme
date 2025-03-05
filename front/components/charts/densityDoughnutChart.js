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
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 159, 64, 0.3)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(54, 162, 235, 0.4)',  
        'rgba(70, 65, 217, 0.4)',            
        'rgba(153, 102, 255, 0.4)',
        'rgba(243, 51, 145, 0.4)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',  
        'rgba(70, 65, 217, 1)',            
        'rgba(153, 102, 255, 1)',
        'rgba(243, 51, 145, 0.9)',
      ],
      borderWidth: 1,
      cutout:"45%",
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: false,
        text: '실시간 방문객',
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
            for(let i = 0 ;i<3; i++ ){
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
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',  
          'rgba(70, 65, 217, 1)',            
          'rgba(153, 102, 255, 1)',
          'rgba(243, 51, 145, 0.9)',
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
      width={400}
      height={400}
      options={options}
      plugins={data.plugins}
      data={data}
    />
  );

}

export default DoughnutChart;