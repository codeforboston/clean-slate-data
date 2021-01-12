import React, { useState, useEffect } from 'react';
import * as dataForge from 'data-forge';
import Box from '@material-ui/core/Box';
import QuestionsHub from "./QuestionsHub"

const nwDefaultQuestions = [
  {
    name: 'Q1',
    maxEvents: 1,
    ineligibleIneligible: true,
    maxAge: 20,
  },
  {
    name: 'Q2A',
    eventType: 'incidents',
    maxEvents: 1,
    ineligibleIneligible: true,
    maxAge: 20,
  },
  {
    name: 'Q3A',
    eventType: 'incidents',
    maxEvents: 1,
    ineligibleIneligible: true,
    guiltyIneligible: true,
    maxAge: 20,
  },
  {
    name: 'Q2B',
    eventType: 'incidents',
    maxEvents: 1,
    sexIneligible: true,
    murderIneligible: true,
    maxAge: 20,
  },
  {
    name: 'Q3B',
    eventType: 'incidents',
    maxEvents: 1,
    sexIneligible: true,
    murderIneligible: true,
    guiltyIneligible: true,
    maxAge: 20,
  },
  {
    name: 'Q3A.2',
    eventType: 'incidents',
    ineligibleIneligible: true,
    guiltyIneligible: true,
    maxAge: 20,
  },
  {
    name: 'Q2B.2',
    eventType: 'incidents',
    sexIneligible: true,
    murderIneligible: true,
    maxAge: 20,
  },
  {
    name: 'Q3B.2',
    eventType: 'incidents',
    sexIneligible: true,
    murderIneligible: true,
    guiltyIneligible: true,
    maxAge: 20,
  },
];

const sfDefaultQuestions = [
  {
    name: 'Q1',
    maxEvents: 1,
    ineligibleIneligible: true,
  },
  {
    name: 'Q2A',
    eventType: 'incidents',
    maxEvents: 1,
    ineligibleIneligible: true,
  },
  {
    name: 'Q3A',
    eventType: 'incidents',
    maxEvents: 1,
    ineligibleIneligible: true,
    guiltyIneligible: true,
  },
  {
    name: 'Q2B',
    eventType: 'incidents',
    maxEvents: 1,
    sexIneligible: true,
    murderIneligible: true,
  },
  {
    name: 'Q3B',
    eventType: 'incidents',
    maxEvents: 1,
    sexIneligible: true,
    murderIneligible: true,
    guiltyIneligible: true,
  },
  {
    name: 'Q3A.2',
    eventType: 'incidents',
    ineligibleIneligible: true,
    guiltyIneligible: true,
  },
  {
    name: 'Q2B.2',
    eventType: 'incidents',
    sexIneligible: true,
    murderIneligible: true,
  },
  {
    name: 'Q3B.2',
    eventType: 'incidents',
    sexIneligible: true,
    murderIneligible: true,
    guiltyIneligible: true,
  },
];

async function fetchData(){
  await fetch("https://raw.githubusercontent.com/codeforboston/clean-slate/master/data/cleaned/visualizer_northwestern.csv")
  .then(response => response.text())
  .then((text) => {
    let df = dataForge.fromCSV(text);
    window.nw = df;
    console.log('NW DATA FETCHED');
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
        <QuestionsHub loading={loading} defaultQuestions={nwDefaultQuestions} region={'nw'} maxJuvenileAge={20} onlyJuveniles={true}/>
        <QuestionsHub loading={loading} defaultQuestions={sfDefaultQuestions} region={'sf'}/>
        {/* <QuestionsHub loading={loading} defaultQuestions={sfDefaultQuestions} region={'ms'}/> */}
      </Box>
    );
  };
  
  export default HubsWrapper;