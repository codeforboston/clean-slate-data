import React, { useState, useEffect } from 'react';
import * as dataForge from 'data-forge';
import Box from '@material-ui/core/Box';
import QuestionsHub from "./QuestionsHub"

const defaultQuestions = [
  {
    name: 'Q1',
    maxEvents: 4,
    //shared: '.1.2',
    categories: [[2, '.1.1'], [2, '.1.0']],
  },
  {
    name: 'Q2',
    maxEvents: 4,
    //shared: '..02',
    categories: [[2, '..01'], [2, '..00']],
  },
  {
    name: 'Q3',
    maxEvents: 4,
    //shared: '.2.2',
    categories: [[0, '.0.1'], [4, '....']],
  },
];

async function fetchData(){
  // Northwest
  await fetch("https://raw.githubusercontent.com/codeforboston/clean-slate-data/master/data/cleaned/interactive_northwestern.csv")
  .then(response => response.text())
  .then((text) => {
    let df = dataForge.fromCSV(text);
    window.nw = df;
    console.log('NW DATA FETCHED');
  });

  // Suffolk
  await fetch("https://raw.githubusercontent.com/codeforboston/clean-slate-data/master/data/cleaned/interactive_suffolk.csv")
  .then(response => response.text())
  .then((text) => {
    let df = dataForge.fromCSV(text);
    window.sf = df;
    console.log('SF DATA FETCHED');
  });

  // Middlesex
  await fetch("https://raw.githubusercontent.com/codeforboston/clean-slate-data/master/data/cleaned/interactive_middlesex.csv")
  .then(response => response.text())
  .then((text) => {
    let df = dataForge.fromCSV(text);
    window.ms = df;
    console.log('MS DATA FETCHED');
  });
}

const HubsWrapper = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchData().then(() => {
        setLoading(false);
      })
    }, []);
  
    return (
      <Box display='flex' justifyContent='center' className='hubs-wrapper'>
        <QuestionsHub loading={loading} defaultQuestions={defaultQuestions} region={'nw'} maxJuvenileAge={20} ageCategory={'onlyJuvenile'}/>
        <QuestionsHub loading={loading} defaultQuestions={defaultQuestions} region={'sf'} ageCategory={'allAges'}/>
        <QuestionsHub loading={loading} defaultQuestions={defaultQuestions} region={'ms'} maxJuvenileAge={18} ageCategory={'onlyJuvenile'}/>
      </Box>
    );
  };
  
  export default HubsWrapper;