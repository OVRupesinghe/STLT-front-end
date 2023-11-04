import React from 'react'
import { Typography } from '@mui/material'

export default function SmallText({text}) {
  return (
    <Typography color= 'gray' variant='caption'>
        {text}
    </Typography>
  );
}
