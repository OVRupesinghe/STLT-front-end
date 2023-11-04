import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function DropDown(props) {
  const [division, setDivision] = React.useState('');

  const handleChange = (event) => {
    setDivision(event.target.value);
  };

  return (
    <Box width = '230px'>
      <TextField label = 'Division' select value = {division} onChange = {handleChange} fullWidth   SelectProps={{
          sx: {
            height: '50px',
          },
        }}>
        {props.valuesArr.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
      </TextField>
      </Box>
  );
}