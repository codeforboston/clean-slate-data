import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Chart } from "react-google-charts";

const ChartPanel = ({ questions, hubSettings }) => {

    let chartData = [['Question', 'Percent Eligible']]
    for(let question of questions){
      chartData.push([question.name, question.answerPercent]);
    }

    let chartTitle = (hubSettings.onlyJuveniles) 
      ? 'Percentage Eligible of Individuals with a Juvenile Offense' : 'Percentage Eligible of Individuals';

    const horizontalChart = <Box>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="BarChart"
        loader={<Box m={2} display='flex' justifyContent='center'>
          <Typography variant='h6'>
            Loading Chart...
          </Typography>
        </Box>}
        data={chartData}
        options={{
          // title: 'TITLE',
          legend: 'none',
          chartArea: { width: '60%', height: '75%' },
          hAxis: {
            title: chartTitle,
            minValue: 0,
            maxValue: 100,
          },
          vAxis: {
            title: 'Question',
          },
        }}
      />
    </Box>

    return (
      <Box className='chart-box'>
        {horizontalChart}
      </Box>
    );
  };
  
  export default ChartPanel;