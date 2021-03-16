import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Chart } from "react-google-charts";

const ChartPanel = ({ questions, hubSettings }) => {

    let a;
    let unit = hubSettings.descriptionUnit;

    let chartData = [['Question', 'Eligible Now', {role: 'tooltip'}, 'Eligible Later', {role: 'tooltip'}]];
    for(let question of questions){
        a = question.answer;
        if(!a){
          chartData.push([
            question.name, 
            0, 
            'Answer is loading...', 
            0,
            'Answer is loading...'  
          ])
        } else {
          chartData.push([
            question.name, 
            a.EligibleToday.percentOfTotal, 
            'Eligible Today: ' + a.EligibleToday.percentOfTotal + '% ' +
              '(' + a.EligibleToday.individuals + ' ' + unit + ')\n' +
              'Of these, ' + a.EligibleTodayIncomplete.percentOfEligibleToday + '% have incomplete disposition data ' +
              '(' + a.EligibleTodayIncomplete.individuals + ' ' + unit + ')',
            a.EligibleLater.percentOfTotal,
            'Eligible Later: ' + a.EligibleLater.percentOfTotal + '% ' +
              '(' + a.EligibleLater.individuals + ' ' + unit + ')\n' +
              'Of these, ' + a.EligibleLaterIncomplete.percentOfEligibleLater + '% have incomplete disposition data ' +
              '(' + a.EligibleLaterIncomplete.individuals + ' ' + unit + ')',
          ])
        }
    }

    let chartTitle = 'Eligible ' + unit.charAt(0).toUpperCase() + unit.slice(1);
      

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
          legend: {position: 'top', maxLines: 4},
          isStacked: true,
          chartArea: { width: '60%', height: '75%' },
          hAxis: {
            title: chartTitle,
            minValue: 0,
            maxValue: 100,
            format: '#\'%\'',
          },
          vAxis: {
            title: 'Question',
          },
          bar: {groupWidth: '65%'},
          series: {
            0: {color:'#4285F4'},
            1: {color:'#34A853'},
          }
        }}
      />
    </Box>

    return (
      <Box className='chart-box'>
        {questions.length !== 0 && horizontalChart}
      </Box>
    );
  };
  
  export default ChartPanel;