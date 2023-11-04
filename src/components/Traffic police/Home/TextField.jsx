import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


export default function ColorTextField() {
  return (
  
      <TextField  size = 'small' label="Driver's license No. or NIC"
              sx={{
        '& > :not(style)': { m: 0, width: '100%', borderRadius: 2, fontSize:15, p:1 }
      }}
      />

  );
}
