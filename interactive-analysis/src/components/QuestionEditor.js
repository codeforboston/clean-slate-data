import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const QuestionEditor = ({ question, question_index, updateQuestion, getEmptyEdits }) => {

  async function handleSubmit(event){
    event.preventDefault();
    question.name = question.edits.name;
    question.maxEvents = question.edits.maxEvents;
    question.categories = question.edits.categories;
    //question.shared = question.edits.shared;

    question.edits = getEmptyEdits(question);
    question.editing = false;
    question.loading = true;
    question.answer = 0;

    updateQuestion(question_index, question);
  }

  /* function updateSharedInput(event, codeDigitIndex){
    console.log(event.target.value);
    question.edits.shared = replaceStringChar(question.edits.shared, event.target.value, codeDigitIndex)
    updateQuestion(question_index, question);
  } */

  // Returns a new string matching the passed in string, except the character
  // at the specified index is now the passed in new character
  function replaceStringChar(string, newChar, charIndex){
    return string.substr(0, charIndex) + newChar + string.substr(charIndex + 1)
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

    const maxEventsInput = <Box ml={1}><TextField
      variant='outlined'
      size='small'
      value={question.edits.maxEvents}
      type='number'
      //helperText={question.edits.eventType === 'offenses' ? 'Max offenses' : 'Max incidents'}
      helperText={'Max incidents'}
      onChange={(event) => {
        question.edits.maxEvents = event.target.value;
        updateQuestion(question_index, question);
      }}
    /></Box>

    /* const eligibleSharedInput = 
    <Box display='flex' alignItems='center' mb={1}>
      <Box mr={1}>
        <Typography variant='body2'>
          Offenses ineligible under 100J:
        </Typography>
      </Box>
      <Select value={question.edits.shared[1]} onChange={(event) => {updateSharedInput(event, 1)}}>
        <MenuItem value={'.'}><Typography variant='body2'>Any Number</Typography></MenuItem>
        <MenuItem value={'1'}><Typography variant='body2'>None</Typography></MenuItem>
        <MenuItem value={'0'}><Typography variant='body2'>At Least One</Typography></MenuItem>
        <MenuItem value={'2'}><Typography variant='body2'>Varies by Subcategory</Typography></MenuItem>
      </Select>
    </Box>

    const sexMurderSharedInput = 
    <Box display='flex' alignItems='center' mb={1}>
      <Box mr={1}>
        <Typography variant='body2'>
          Sex/Murder Offenses:
        </Typography>
      </Box>
      <Select value={question.edits.shared[2]} onChange={(event) => {updateSharedInput(event, 2)}}>
        <MenuItem value={'.'}><Typography variant='body2'>Any Number</Typography></MenuItem>
        <MenuItem value={'0'}><Typography variant='body2'>None</Typography></MenuItem>
        <MenuItem value={'1'}><Typography variant='body2'>At Least One</Typography></MenuItem>
        <MenuItem value={'2'}><Typography variant='body2'>Varies by Subcategory</Typography></MenuItem>
      </Select>
    </Box>

    const guiltySharedInput = 
    <Box display='flex' alignItems='center' mb={1}>
      <Box mr={1}>
        <Typography variant='body2'>
          Guilty Offenses:
        </Typography>
      </Box>
      <Select value={question.edits.shared[3]} onChange={(event) => {updateSharedInput(event, 3)}}>
        <MenuItem value={'.'}><Typography variant='body2'>Any Number</Typography></MenuItem>
        <MenuItem value={'0'}><Typography variant='body2'>None</Typography></MenuItem>
        <MenuItem value={'1'}><Typography variant='body2'>At Least One</Typography></MenuItem>
        <MenuItem value={'2'}><Typography variant='body2'>Varies by Subcategory</Typography></MenuItem>
      </Select>
    </Box> */

    const submitButton = 
    <Button
      variant='contained'
      type='submit'
    >
      Submit
    </Button>

    const addCategoryButton = <Button
      onClick={() => {
        question.edits.categories.push([1, '....']);
        updateQuestion(question_index, question);
      }}
      variant='contained'
      startIcon={<AddIcon />}
    >
      Add Category
    </Button>

    return (
      <div>

        <form onSubmit={(event) => handleSubmit(event)}>
          <Box display='flex' alignItems='center' m={1}>
            {nameInput}
            {maxEventsInput}
          </Box>
          {/* <Box m={1} mt={2}>
            <Typography variant='subtitle2'>
              All Eligible Incidents Must Have:
            </Typography>
            <Box ml={2}>
              {eligibleSharedInput}
              {sexMurderSharedInput}
              {guiltySharedInput}
            </Box>
          </Box> */}

          <Box>
            <List>
              {question.edits.categories.map((category, categoryIndex) => (
                <ListItem key={categoryIndex.toString()}>
                  <Paper display='flex' className='question-paper'>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Box m={1} display='flex'>
                        <Typography variant='subtitle2'>{'Category ' + (categoryIndex + 1)}</Typography>
                      </Box>
                      <Box m={1} display='flex'>
                        <IconButton size='small' onClick={() => {
                          const newCategories = question.edits.categories.filter((_, index) => index !== categoryIndex);
                          question.edits.categories = newCategories;
                          updateQuestion(question_index, question);
                        }}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box m={1} mt={-1} ml={2}>
                      <TextField
                        onChange={(event) => {
                          let value = event.target.value;
                          if(value < 0){
                            value = 0;
                          }
                          question.edits.categories[categoryIndex][0] = value;
                          updateQuestion(question_index, question);
                        }}
                        variant='outlined'
                        helperText={'Max category incidents'}
                        size='small'
                        value={category[0]}
                        type='number'
                      />
                    </Box>

                    <Box display='flex' alignItems='center' m={1} ml={2}>
                      <Box mr={1}>
                        <Typography variant='body2'>
                          Offenses Ineligible Under 100J:
                        </Typography>
                      </Box>
                      <Select value={category[1][1]} onChange={(event) => {
                        let newCode = replaceStringChar(category[1], event.target.value, 1);
                        question.edits.categories[categoryIndex][1] = newCode;
                        updateQuestion(question_index, question);
                      }}>
                        <MenuItem value={'.'}><Typography variant='body2'>Any Number</Typography></MenuItem>
                        <MenuItem value={'1'}><Typography variant='body2'>None</Typography></MenuItem>
                        <MenuItem value={'0'}><Typography variant='body2'>At Least One</Typography></MenuItem>
                      </Select>
                    </Box>

                    <Box display='flex' alignItems='center' m={1} ml={2}>
                      <Box mr={1}>
                        <Typography variant='body2'>
                          Guilty Offenses:
                        </Typography>
                      </Box>
                      <Select value={category[1][3]} onChange={(event) => {
                        let newCode = replaceStringChar(category[1], event.target.value, 3);
                        question.edits.categories[categoryIndex][1] = newCode;
                        updateQuestion(question_index, question);
                      }}>
                        <MenuItem value={'.'}><Typography variant='body2'>Any Number</Typography></MenuItem>
                        <MenuItem value={'0'}><Typography variant='body2'>None</Typography></MenuItem>
                        <MenuItem value={'1'}><Typography variant='body2'>At Least One</Typography></MenuItem>
                      </Select>
                    </Box>

                    <Box display='flex' alignItems='center' m={1} ml={2}>
                      <Box mr={1}>
                        <Typography variant='body2'>
                          Sex/Murder Offenses:
                        </Typography>
                      </Box>
                      <Select value={category[1][2]} onChange={(event) => {
                        let newCode = replaceStringChar(category[1], event.target.value, 2);
                        question.edits.categories[categoryIndex][1] = newCode;
                        updateQuestion(question_index, question);
                      }}>
                        <MenuItem value={'.'}><Typography variant='body2'>Any Number</Typography></MenuItem>
                        <MenuItem value={'0'}><Typography variant='body2'>None</Typography></MenuItem>
                        <MenuItem value={'1'}><Typography variant='body2'>At Least One</Typography></MenuItem>
                      </Select>
                    </Box>

                  </Paper>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box display='flex' justifyContent='flex-end' m={1}>
            <Box>
              {addCategoryButton}
            </Box>
            <Box ml={1}>
              {submitButton}
            </Box>
          </Box>
        </form>

      </div>
    );
  };
  
  export default QuestionEditor;