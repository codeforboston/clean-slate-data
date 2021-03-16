import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import QuestionEditor from "./QuestionEditor"
import QuestionDescription from "./QuestionDescription"
import findAnswer from '../functions/findanswer';

const Question = ({ question, question_index, moveQuestion, deleteQuestion, updateQuestion, getEmptyEdits, hubSettings }) => {
  
    useEffect(() => {
      if(question.loading === true){
        findAnswer(question, hubSettings)
        .then((res) => {
          question.loading = false;
          question.answer = res;
          updateQuestion(question_index, question);
        });
      }
    }, [question.loading])

    const question_editor = <QuestionEditor 
      question={question} 
      question_index={question_index} 
      updateQuestion={updateQuestion}
      getEmptyEdits={getEmptyEdits}
    />

    function getQuestionAnswerDisplay(){
      let unit = hubSettings.descriptionUnit;
      let a = question.answer;
      if(question.loading || !question.answer){
        return <div>LOADING</div>
      } else {
        return <div>
          {
            a.EligibleAnytime.percentOfTotal + '% of ' + unit + ' (' + a.EligibleAnytime.individuals + ')' +' are potentially eligible for expungement. ' +
            'Of those, ' + a.EligibleToday.percentOfEligibleAnytime + '% (' + a.EligibleToday.individuals + ') are eligible currently, and ' + 
            a.EligibleLater.percentOfEligibleAnytime + '% (' + a.EligibleLater.individuals + ') will be eligible in the future. ' +
            'Of those eligible currently, ' + a.EligibleTodayIncomplete.percentOfEligibleToday + '% (' + a.EligibleTodayIncomplete.individuals + ') have incomplete disposition data. ' +
            'Of those eligible in the future, ' + a.EligibleLaterIncomplete.percentOfEligibleLater + '% (' + a.EligibleLaterIncomplete.individuals + ') have incomplete disposition data. ' 
          }
        </div>
      }
    }
  
    return (
      <Paper className='question-paper'>
        <Box display='flex' justifyContent='space-between'>
          <Box m={1} display='flex'>
            <Box>
              <Typography variant='h6'>
                {question.name}
              </Typography>
            </Box>
          </Box>
          <Box m={1}>
            <IconButton size='small' onClick={() => {
              if(question.editing){
                question.editing = false;
                question.edits = getEmptyEdits(question);
              } else {
                question.editing = true;
              }
              updateQuestion(question_index, question);
            }}>
              <EditIcon />
            </IconButton>
            <IconButton size='small' onClick={() => {
              moveQuestion(question_index, 'upwards');
            }}>
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton size='small' onClick={() => {
              moveQuestion(question_index, 'downwards');
            }}>
              <KeyboardArrowDownIcon />
            </IconButton>
            <IconButton size='small' onClick={() => {
              deleteQuestion(question_index);
            }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Box mt={-0.7} ml={1.5} mb={1.5}>
          <Typography variant='subtitle2'>
            {getQuestionAnswerDisplay()}
          </Typography>
        </Box>

        {question.editing && question_editor}

        {!question.editing && <QuestionDescription question={question} hubSettings={hubSettings} />}

      </Paper>
    );
  };
  
  export default Question;