import React from 'react';
import { Typography } from '@mui/material';

function SectionTitle({ titleText }) {
  return (
    <Typography variant="h6" className = 'text-zinc-500' sx={{ fontWeight: 'bold', marginTop: 2, marginBottom: 2 }}>
      {titleText}
    </Typography>
  );
}

export default SectionTitle;
