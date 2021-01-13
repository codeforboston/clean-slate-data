import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

//import findAnswer from '../functions/findanswer';

const QuestionEditor = ({ question, question_index, updateQuestion, getEmptyEdits }) => {

  async function handleSubmit(event){
    event.preventDefault();
    question.name = question.edits.name;
    question.eventType = question.edits.eventType;
    question.maxEvents = question.edits.maxEvents;
    question.maxIneligibleEvents = question.edits.maxIneligibleEvents;
    question.sexIneligible = question.edits.sexIneligible;
    question.murderIneligible = question.edits.murderIneligible;
    question.guiltyIneligible = question.edits.guiltyIneligible;
    question.ineligibleIneligible = question.edits.ineligibleIneligible;
    //question.maxAge = question.edits.maxAge;

    question.edits = getEmptyEdits(question);
    question.editing = false;
    question.loading = true;
    question.answer = '';
    question.answerPercent = '';

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

    const eventTypeInput = <FormControl component='fieldset'>
      <RadioGroup name='eventType' value={question.edits.eventType} onChange={(event) => {
        question.edits.eventType = event.target.value;
        updateQuestion(question_index, question);
      }}>
        <FormControlLabel value='offenses' control={<Radio color='primary' />} label='Offenses' />
        <Box mt={-1}>
          <FormControlLabel value='incidents' control={<Radio color='primary' />} label='Incidents' />
        </Box>
      </RadioGroup>
    </FormControl>

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

    const maxIneligibleEventsInput = <TextField
      variant='outlined'
      size='small'
      value={question.edits.maxIneligibleEvents}
      type='number'
      helperText={question.edits.eventType === 'offenses' ? 'Max ineligible offenses' : 'Max ineligible incidents'}
      onChange={(event) =>{
        question.edits.maxIneligibleEvents  = event.target.value;
        updateQuestion(question_index, question);
      }}
    />

    const sexInput = <FormControlLabel
      control={
        <Checkbox
          color='primary'
          checked={question.edits.sexIneligible}
          name='sexInput'
          onChange={(event) => {
            question.edits.sexIneligible = (question.edits.sexIneligible) ? false : true;
            updateQuestion(question_index, question);
          }}
        />
      }
      label={question.edits.eventType === 'offenses' ? 
        'Sex offenses are ineligible' : 'Incidents with a sex offense are ineligible'}
    />

    const murderInput = <FormControlLabel
      control={
        <Checkbox
          color='primary'
          checked={question.edits.murderIneligible}
          name='murderInput'
          onChange={(event) => {
            question.edits.murderIneligible = (question.edits.murderIneligible) ? false : true;
            updateQuestion(question_index, question);
          }}
        />
      }
      label={question.edits.eventType === 'offenses' ? 
        'Murder offenses are ineligible' : 'Incidents with a murder offense are ineligible'}
    />

    const ineligibleInput = <FormControlLabel
      control={
        <Checkbox
          color='primary'
          checked={question.edits.ineligibleIneligible}
          name='ineligibleInput'
          onChange={(event) => {
            question.edits.ineligibleIneligible = (question.edits.ineligibleIneligible) ? false : true;
            updateQuestion(question_index, question);
          }}
        />
      }
      label={question.edits.eventType === 'offenses' ? 
        'Offenses ineligible under 100J are ineligible' : 'Incidents with an offense ineligible under 100J are ineligible'}
    />

    const guiltyInput = <FormControlLabel
      control={
        <Checkbox
          color='primary'
          checked={question.edits.guiltyIneligible}
          name='guiltyInput'
          onChange={(event) => {
            question.edits.guiltyIneligible = (question.edits.guiltyIneligible) ? false : true;
            updateQuestion(question_index, question);
          }}
        />
      }
      label={question.edits.eventType === 'offenses' ? 
        'Offenses with a guilty disposition are ineligible' : 'Incidents with an offense with a guilty disposition are ineligible'}
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
            <Box ml={3}>
              {eventTypeInput}
            </Box>
          </Box>
          <Box display='flex'>
            <Box m={1}>
              {maxEventsInput}
            </Box>
            <Box m={1}>
              {maxIneligibleEventsInput}
            </Box>
          </Box>
          <Box display='flex' flexDirection='column' ml={1}>
            {ineligibleInput}
            {sexInput}
            {murderInput}
            {guiltyInput}
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