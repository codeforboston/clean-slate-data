import React, { useState, useEffect, useLayoutEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

import Question from "./Question";
import HubEditor from "./HubEditor";
import ChartPanel from "./ChartPanel";

function addQuestion(questions, setQuestions){
  let new_question = getEmptyQuestion();
  new_question.editing = true;
  //new_question.edits = getEmptyEdits(new_question);
  const new_questions = [...questions, new_question];
  setQuestions(new_questions);
}

function moveQuestion(questions, setQuestions, indexToMove, direction){
  // First question can't move up and last question can't move down
  if((indexToMove === 0 && direction === 'upwards') || (indexToMove === questions.length - 1 && direction === 'downwards')){
    return;
  }
  if(direction === 'upwards'){
    // This swaps the question with the one above it
    [questions[indexToMove - 1], questions[indexToMove]] = [questions[indexToMove], questions[indexToMove - 1]];
  }
  if(direction === 'downwards'){
    // This swaps the question with the one below it
    [questions[indexToMove], questions[indexToMove + 1]] = [questions[indexToMove + 1], questions[indexToMove]];
  }
  setQuestions([...questions]);
}

function deleteQuestion(questions, setQuestions, indexToDelete){
  const newQuestions = questions.filter((_, index) => index !== indexToDelete);
  setQuestions(newQuestions);
}

function updateQuestion(questions, setQuestions, indexToUpdate, updatedQuestion){
  questions[indexToUpdate] = updatedQuestion;
  setQuestions([...questions]);
}

function getEmptyQuestion(){
  let question = {
    name: 'New Question',
    editing: false,
    edits: {},
    loading: false,
    answer: '',
    answerPercent: '',
    eventType: 'offenses',
    maxEvents: '',
    maxIneligibleEvents: '',
    sexIneligible: false,
    murderIneligible: false,
    guiltyIneligible: false,
    ineligibleIneligible: false,
    maxAge: '',
  };
  question.edits = getEmptyEdits(question);
  return question;
}

function getEmptyEdits(question){
  return {
    name: question.name,
    eventType: question.eventType,
    maxEvents: question.maxEvents,
    maxIneligibleEvents: question.maxIneligibleEvents,
    sexIneligible: question.sexIneligible,
    murderIneligible: question.murderIneligible,
    guiltyIneligible: question.guiltyIneligible,
    ineligibleIneligible: question.ineligibleIneligible,
    maxAge: question.maxAge,
  }
}

const QuestionsHub = ({ loading, defaultQuestions }) => {
    const [questions, setQuestions] = useState([]);
    const [hubSettings, setHubSettings] = useState({
      region: 'Northwest',
      editing: false,
      maxJuvenileAge: 20,
      onlyJuveniles: true,
      edits: {
        region: 'Northwest',
        maxJuvenileAge: 20,
        onlyJuveniles: true,
      }
    });

    useLayoutEffect(() => {
      setDefaultQuestions();
    }, []);

    useEffect(() => {
      if(loading === false){
        for(let questionIndex in questions){
          questions[questionIndex].loading = true;
          updateQuestion(questions, setQuestions, questionIndex, questions[questionIndex]);
        }
      }
    }, [loading]);

    useEffect(() => {
      for(let questionIndex in questions){
        questions[questionIndex].loading = true;
        questions[questionIndex].maxAge = (hubSettings.onlyJuveniles) ? hubSettings.maxJuvenileAge : '';
        updateQuestion(questions, setQuestions, questionIndex, questions[questionIndex]);
      }
    }, [hubSettings.onlyJuveniles, hubSettings.maxJuvenileAge]);

    function setDefaultQuestions(){
      let questions = [];
      for(let question of defaultQuestions){
        let new_question = getEmptyQuestion();
        new_question = Object.assign(new_question, question);
        new_question.edits = getEmptyEdits(new_question);
        new_question.loading = 'initial';
        questions.push(new_question);
      }
      setQuestions(questions);
    }
  
    return (
      <div>

        <Paper className='hub-paper' display='flex'>

          <Box display='flex' justifyContent='space-between' ml={2} mr={2} pt={1}>
            <Typography variant='h5'>
              {hubSettings.region}
            </Typography>
            <IconButton size='small' onClick={() => {
              let newSettings = hubSettings;
              if(hubSettings.editing === true){
                // Toggle hub editor off
                newSettings.editing = false;
                newSettings.edits.region = hubSettings.region;
                newSettings.edits.maxJuvenileAge = hubSettings.maxJuvenileAge;
                newSettings.edits.onlyJuveniles = hubSettings.onlyJuveniles;
                setHubSettings({...newSettings});
              } else {
                // Toggle hub editor on
                newSettings.editing = true;
                setHubSettings({...newSettings});
              }
            }}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <Box ml={3}>
            <Typography variant='subtitle2'>
              {(hubSettings.onlyJuveniles) ? 
                'Individuals with a juvenile offense (below age ' + (parseInt(hubSettings.maxJuvenileAge) + 1) + ')' : 'Individuals of any age'}
            </Typography>
          </Box>

          {hubSettings.editing && <HubEditor hubSettings={hubSettings} setHubSettings={setHubSettings} />}

          <ChartPanel questions={questions} hubSettings={hubSettings}/>

          <List>
            {questions.map((question, index) => (
              <ListItem key={index.toString()}>
                <Question 
                  question={question} 
                  question_index={index}
                  moveQuestion={(indexToMove, direction) => moveQuestion(questions, setQuestions, indexToMove, direction)}
                  deleteQuestion={(indexToDelete) => deleteQuestion(questions, setQuestions, indexToDelete)}
                  updateQuestion={(indexToUpdate, updatedQuestion) => updateQuestion(questions, setQuestions, indexToUpdate, updatedQuestion)}
                  getEmptyEdits={(question) => getEmptyEdits(question)}
                  hubSettings={hubSettings}
                />
              </ListItem>
            ))}
          </List>
          <Box pl={1.5} pb={1.5}>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => addQuestion(questions, setQuestions)}
            >
              Add Question
            </Button>
          </Box>

        </Paper>

      </div>
    );
  };
  
  export default QuestionsHub;