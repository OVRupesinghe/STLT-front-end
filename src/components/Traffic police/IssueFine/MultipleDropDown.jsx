import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultipleDropDown(props) {
  const [violations, setViolations] = React.useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setViolations(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box width = '230px'>
      <TextField label = 'Division' select value = {violations} onChange = {handleChange} fullWidth SelectProps={{
          multiple: true,
      }}>
        {props.valuesArr.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
      </TextField>
      </Box>
  );
}