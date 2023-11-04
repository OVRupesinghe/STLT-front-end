import React from 'react';
import { Typography } from '@mui/material';

function SmallText({ text }) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '12px', fontWeight: 'normal' }}>
      {text}
    </Typography>
  );
}

export default SmallText;
