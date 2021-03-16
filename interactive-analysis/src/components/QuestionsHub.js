import React, { useState, useEffect, useLayoutEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Question from "./Question";
import ChartPanel from "./ChartPanel";

function addQuestion(questions, setQuestions){
  let new_question = getEmptyQuestion();
  new_question.editing = true;
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
    categories: [],
    answer: 0,
    maxEvents: '',
  };
  question.edits = getEmptyEdits(question);
  return question;
}

function getEmptyEdits(question){
  return {
    name: question.name,
    categories: question.categories,
    maxEvents: question.maxEvents,
  }
}

const QuestionsHub = ({ loading, defaultQuestions, region, maxJuvenileAge, ageCategory }) => {
    const [questions, setQuestions] = useState([]);
    const [hubSettings, setHubSettings] = useState({
      region: region,
      descriptionUnit: (region != 'ms') ? 'individuals' : 'cases',
      maxJuvenileAge: (maxJuvenileAge) ? maxJuvenileAge : 20,
      ageCategory: ageCategory,
    });

    useLayoutEffect(() => {
      setDefaultQuestions();
    }, []);

    useEffect(() => {
      if(!loading){
        for(let questionIndex in questions){
          questions[questionIndex].loading = true;
          updateQuestion(questions, setQuestions, questionIndex, questions[questionIndex]);
        }
      }
    }, [loading]);

    function setDefaultQuestions(){
      let questions = [];
      for(let question of defaultQuestions){
        let new_question = getEmptyQuestion();
        new_question = Object.assign(new_question, question);
        new_question.edits = getEmptyEdits(new_question);
        // question will not be answered until loading switches from 'initial' to 'true'
        new_question.loading = 'initial';
        questions.push(new_question);
      }
      setQuestions(questions);
    }

    function reloadAllQuestions(){
      for(let questionIndex in questions){
        questions[questionIndex].loading = true;
        updateQuestion(questions, setQuestions, questionIndex, questions[questionIndex]);
      }
    }

    function getRegionName(region){
      switch(region){
        case 'nw':
          return 'Northwest';
        case 'sf':
          return 'Suffolk';
        case 'ms':
          return 'Middlesex';
        default:
          return 'Unknown Region';
      }
    }

    const ageCategorySelection = <Box display='flex' mt={1} mb={2} ml={5} mr={5}>
      <FormControl display='flex' fullWidth={true}>
        <InputLabel id='age-category-label'>Analysis includes:</InputLabel>
        <Select labelId='age-category-label' value={hubSettings.ageCategory} onChange={(event) => {
          hubSettings.ageCategory = event.target.value;
          setHubSettings({...hubSettings});
          reloadAllQuestions();
        }}>
          <MenuItem value={'allAges'}>
            <Typography variant='subtitle2'>
              All individuals
            </Typography>
          </MenuItem>
          {hubSettings.region != 'sf' && <MenuItem value={'onlyJuvenile'}>
            <Typography variant='subtitle2'>
              {'Individuals with only juvenile offenses (under ' + (parseInt(hubSettings.maxJuvenileAge) + 1) + ')'}
            </Typography>
          </MenuItem>}
          {hubSettings.region != 'sf' && <MenuItem value={'onlyAdult'}>
            <Typography variant='subtitle2'>
              {'Individuals with only adult offenses (over ' + parseInt(hubSettings.maxJuvenileAge) + ')'}
            </Typography>
          </MenuItem>}
        </Select>
      </FormControl>
    </Box>
  
    return (
      <Box m={1} className='hub-paper'>

        <Paper display='flex'>

          <Box display='flex' justifyContent='space-between' ml={2} mr={2} pt={1}>
            <Typography variant='h5'>
              {getRegionName(hubSettings.region)}
            </Typography>
          </Box>

          {ageCategorySelection}

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

      </Box>
    );
  };
  
  export default QuestionsHub;