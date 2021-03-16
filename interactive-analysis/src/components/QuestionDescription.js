import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';

const QuestionDescription = ({ question, hubSettings }) => {

    function getCategoryListItem(key, text){
      return(
        <Box m={-1.5} ml={2.5}>
          <ListItem >
            <Typography variant='body2'>
              {'\u2022 ' + text}
            </Typography>
          </ListItem>
        </Box>  
      );
    }

    function getCategoryLists(categories){
      let categoryJSX = [];
      let category;
      let categoryNumber;
      let text;
      for(let categoryIndex in categories){
        category = categories[categoryIndex];
        categoryNumber = parseInt(categoryIndex) + 1;
        // Display category max and category number
        if(category[0]){
          categoryJSX.push([
            <Box key={categoryIndex} mt={1.5}>
              <ListItem>
                <Typography variant='subtitle2'>
                  {'\u2022 No more than ' + category[0] + ' incidents from Category ' + categoryNumber + ':'}
                </Typography>
              </ListItem>
            </Box>
          ]);
        } else {
          // If this category allows 0 incidents (forbidden category)
          categoryJSX.push([
            <Box key={categoryIndex} mt={1.5}>
              <ListItem>
                <Typography variant='subtitle2'>
                  {'\u2022 No incidents from Category ' + categoryNumber + ':'}
                </Typography>
              </ListItem>
            </Box>
          ]);
        }
        // Display category age restriction, if there is one
        if(hubSettings.ageCategory == 'onlyJuvenile' || category[1][0] == 1){
          text = 'Only juvenile offenses (under ' + parseInt(hubSettings.maxJuvenileAge + 1) + ')';
          categoryJSX.push(getCategoryListItem(1, text));
        }
        if(hubSettings.ageCategory == 'onlyAdult' || category[1][0] == 0){
          text = 'Only adult offenses (over ' + parseInt(hubSettings.maxJuvenileAge) + ')';
          categoryJSX.push(getCategoryListItem(1, text));
        }
        // Display 100J eligibility restriction, if there is one
        if(category[1][1] == 1){
          text = 'Only offenses considered eligible under 100J';
          categoryJSX.push(getCategoryListItem(2, text));
        }
        if(category[1][1] == 0){
          text = 'At least one offense NOT considered eligible under 100J';
          categoryJSX.push(getCategoryListItem(2, text));
        }
        // Display the sex/murder restriction, if there is one
        if(category[1][2] == 0){
          text = 'Only non-sex, non-murder offenses';
          categoryJSX.push(getCategoryListItem(3, text));
        }
        if(category[1][2] == 1){
          text = 'At least one sex or murder offense';
          categoryJSX.push(getCategoryListItem(3, text));
        }
        // Display the guilty/nonguilty restriction, if there is one
        if(category[1][3] == 0){
          text = 'Only offenses with a nonguilty disposition';
          categoryJSX.push(getCategoryListItem(4, text));
        }
        if(category[1][3] == 1){
          text = 'At least one offense with a guilty disposition';
          categoryJSX.push(getCategoryListItem(4, text));
        }
        // If the category is completely unrestricted (code '....')
        if(category[1] == '....' && hubSettings.ageCategory != 'onlyJuvenile' && hubSettings.ageCategory != 'onlyAdult'){
          text = 'This category allows incidents of any kind';
          categoryJSX.push(getCategoryListItem(5, text));
        }
      }
      return categoryJSX;
    }

    let unit = hubSettings.descriptionUnit;

    return (
      <Box ml={2} mt={1} mb={2}>
        <Box mb={-2}>
          <Typography variant='subtitle2'>
            {'Eligible ' + unit + ' have no more than ' + question.maxEvents + ' incidents:'}
          </Typography>
        </Box>
        <List>
          {getCategoryLists(question.categories)}
        </List>
        <Box mr={2.5} mt={1}>
          <Typography variant='subtitle2'>
            {'All ' + unit + ' with any incident outside of these categories are ineligible.'}
          </Typography>
        </Box>
      </Box>
    )
  };
  
  export default QuestionDescription;