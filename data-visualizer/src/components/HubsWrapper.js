import React, { useState, useEffect } from 'react';
import * as dataForge from 'data-forge';
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

async function fetchData(){
  await fetch("https://raw.githubusercontent.com/codeforboston/clean-slate/master/data/cleaned/visualizer_northwestern.csv")
  .then(response => response.text())
  .then((text) => {
    let df = dataForge.fromCSV(text);
    window.nw = df;
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
      <div>
        <QuestionsHub loading={loading} defaultQuestions={nwDefaultQuestions}/>
      </div>
    );
  };
  
  export default HubsWrapper;