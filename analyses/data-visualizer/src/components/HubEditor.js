import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const HubEditor = ({ hubSettings, setHubSettings }) => {

  function handleSubmit(event){
    event.preventDefault();
    hubSettings.region = hubSettings.edits.region;
    hubSettings.maxJuvenileAge = hubSettings.edits.maxJuvenileAge;
    hubSettings.onlyJuveniles = hubSettings.edits.onlyJuveniles;
    hubSettings.editing = false;
    setHubSettings({...hubSettings});
  }
  
  const regionInput = <Box>
    <Typography>
      Region:
    </Typography>
    <FormControl component='fieldset'>
      <RadioGroup name='regionInput' value={hubSettings.edits.region} onChange={(event) => {
        hubSettings.edits.region = event.target.value;
        setHubSettings({...hubSettings});
      }}>
        <FormControlLabel value='Northwest' control={<Radio color='primary' />} label='Northwest' />
        <Box mt={-1}>
          <FormControlLabel value='Middlesex' control={<Radio color='primary' disabled />} label='Middlesex' />
        </Box>
        <Box mt={-1}>
          <FormControlLabel value='Suffolk' control={<Radio color='primary' disabled />} label='Suffolk' />
        </Box>
      </RadioGroup>
    </FormControl>
  </Box>

  const ageThresholdInput = <TextField
    variant='outlined'
    size='small'
    value={hubSettings.edits.maxJuvenileAge}
    type='number'
    helperText='Max juvenile age'
    onChange={(event) =>{
      hubSettings.edits.maxJuvenileAge  = event.target.value;
      setHubSettings({...hubSettings});
    }}
  />

  const ageInput = <FormControlLabel
    control={
      <Checkbox
        color='primary'
        checked={hubSettings.edits.onlyJuveniles}
        name='ageInput'
        onChange={(event) => {
          hubSettings.edits.onlyJuveniles = (hubSettings.edits.onlyJuveniles) ? false : true;
          setHubSettings({...hubSettings});
        }}
      />
    }
    label={'Eligible offenses must have occured at a juvenile age'}
  />


  const submitButton = <Button
    variant='contained'
    type='submit'
  >
    Submit
  </Button>

    return (
      <Box m={2}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Box>
            {regionInput}
          </Box>
          <Box mt={1.5}>
            {ageThresholdInput}
          </Box>
          <Box mt={1.5}>
            {ageInput}
          </Box>
          <Box display='flex' justifyContent='flex-end' mt={1.5} mr={1}>
            {submitButton}
          </Box>
        </form>
      </Box>
    );
  };
  
  export default HubEditor;