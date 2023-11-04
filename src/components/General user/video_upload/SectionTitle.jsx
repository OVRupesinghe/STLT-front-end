import React from 'react'
import { Typography } from '@mui/material'

function SectionTitle({titleText}) {
  return (
    <Typography className='font-bold text-lg text-slate-500 my-2'>
        {titleText}
    </Typography>
  )
}

export default SectionTitle