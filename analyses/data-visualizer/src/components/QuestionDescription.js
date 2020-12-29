import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';

const QuestionDescription = ({ question, hubSettings }) => {

    function getListItem(text){
      return(
        <Box m={-1.5}>
          <ListItem >
            <Typography variant='body2'>
              {'\u2022 ' + text}
            </Typography>
          </ListItem>
        </Box>  
      );
    }

    if(question.eventType === 'offenses'){
        return (
          <Box ml={2} mt={1} mb={2}>
            <Box mb={0.5}>
              <Typography variant='subtitle2'>
                Individuals eligible for expungement have:
              </Typography>
            </Box>
            <List className='description-list'>
              {getListItem('At least one eligible offense')}
              {question.maxEvents !== '' && getListItem('No more than ' + question.maxEvents + ' total offenses')}
              {question.maxIneligibleEvents !== '' && getListItem('No more than ' + question.maxIneligibleEvents + ' ineligible offenses')}
            </List>
            <Box mb={0.5} mt={1}>
              <Typography variant='subtitle2'>
                {(question.sexIneligible || question.murderIneligible || question.guiltyIneligible || question.ineligibleIneligible || question.maxAge !== '') 
                  ? 'Offenses eligible for expungement all:' : 'All ' + (hubSettings.juvenilesOnly && 'juvenile ') + 'offenses are eligible for expungement'}
              </Typography>
            </Box>
            <List>
              {question.maxAge !== '' && getListItem('Occurred before the offender turned ' + (parseInt(question.maxAge) + 1))}
              {question.ineligibleIneligible && getListItem('Are not considered ineligible under 100J')}
              {question.sexIneligible && getListItem('Are not a sex offense')}
              {question.murderIneligible && getListItem('Are not a murder offense')}
              {question.guiltyIneligible && getListItem('Did not result in a guilty disposition')}
            </List>
          </Box>
        );
    } else{
        return (
          <Box ml={2} mt={1} mb={2}>
            <Box mb={0.5}>
              <Typography variant='subtitle2'>
                Individuals eligible for expungement have:
              </Typography>
            </Box>
            <List>
              {getListItem('At least one eligible incident')}
              {question.maxEvents !== '' && getListItem('No more than ' + question.maxEvents + ' total incidents')}
              {question.maxIneligibleEvents !== '' && getListItem('No more than ' + question.maxIneligibleEvents + ' ineligible incidents')}
            </List>
            <Box mb={0.5} mt={1}>
              <Typography variant='subtitle2'>
                {(question.sexIneligible || question.murderIneligible || question.guiltyIneligible || question.ineligibleIneligible || question.maxAge !== '') 
                  ? 'Incidents eligible for expungement have only offenses that:' : 'All incidents are eligible for expungement'}
              </Typography>
            </Box>
            <List>
              {question.maxAge !== '' && getListItem('Occurred before the offender turned ' + (parseInt(question.maxAge) + 1))}
              {question.ineligibleIneligible && getListItem('Are not considered ineligible under 100J')}
              {question.sexIneligible && getListItem('Are not sex offenses')}
              {question.murderIneligible && getListItem('Are not murder offenses')}
              {question.guiltyIneligible && getListItem('Did not result in a guilty disposition')}
            </List>
          </Box>
        );
    }
  };
  
  export default QuestionDescription;