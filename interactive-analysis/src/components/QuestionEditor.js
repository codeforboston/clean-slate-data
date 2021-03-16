import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const QuestionEditor = ({ question, question_index, updateQuestion, getEmptyEdits }) => {

  async function handleSubmit(event){
    event.preventDefault();
    question.name = question.edits.name;
    question.maxEvents = question.edits.maxEvents;

    question.edits = getEmptyEdits(question);
    question.editing = false;
    question.loading = true;
    question.answer = 0;

    updateQuestion(question_index, question);
  }
  
    const nameInput = <TextField
      variant='outlined'
      size='small'
      value={question.edits.name}
      helperText='Question name'
      onChange={(event) => {
        question.edits.name = event.target.value;
        updateQuestion(question_index, question);
      }}
    />

    const maxEventsInput = <TextField
      variant='outlined'
      size='small'
      value={question.edits.maxEvents}
      type='number'
      helperText={question.edits.eventType === 'offenses' ? 'Max offenses' : 'Max incidents'}
      onChange={(event) => {
        question.edits.maxEvents = event.target.value;
        updateQuestion(question_index, question);
      }}
    />

    const submitButton = <Button
      variant='contained'
      type='submit'
    >
      Submit
    </Button>

    return (
      <div>

        <form onSubmit={(event) => handleSubmit(event)}>
          <Box display='flex' alignItems='center' m={1}>
            {nameInput}
          </Box>
          <Box display='flex'>
            <Box m={1}>
              {maxEventsInput}
            </Box>
          </Box>
          <Box display='flex' justifyContent='flex-end' m={1}>
            <Box>
              {submitButton}
            </Box>
          </Box>
        </form>

      </div>
    );
  };
  
  export default QuestionEditor;