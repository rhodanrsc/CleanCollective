import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
      >
        <FormControlLabel label="Hateful or abusive content " control={<Radio />} value="hateful" />
        <FormControlLabel label="Violent or repulsive content" control={<Radio />} value="violent" />
        <FormControlLabel label="Sexual Content" control={<Radio />} value="sexual" />
        <FormControlLabel label="Spam or misleading " control={<Radio />} value="spam" />
        <FormControlLabel label="Harmful or dangerous acts" control={<Radio />} value="harmful" />
      </RadioGroup>
    </FormControl>
  );
}