import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import BasicModal from './Modal.jsx';


export default function OptionCard(props) {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={3} className='drop-shadow-md rounded-3xl overflow-hidden transition duration-300 ease-in-out md:hover:scale-110 ' sx={{
      // width: 400,
      // height: 600,
      backgroundImage: `url(${props.img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',  // Add this line to enable flexbox layout
      flexDirection: 'column',  // Align items vertically
      justifyContent: 'flex-end',  // Align items to the bottom
      paddingBottom: '50px',
      [theme.breakpoints.up('sm')]: {
        height: 500,
      },

      [theme.breakpoints.up('xs')]: {
        width: 100,
        height: 300,
      },

    }}>
      <Box className='bg-white' sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}>
        {/* <Typography variant='h5' align='center' className='font-bold text-black'>{props.txt} <ChevronRightIcon fontSize='large' className='font-bold text-gray-700' /> </Typography> */}
        <BasicModal txt={props.txt} status={props.status} />
      </Box>
    </Grid>
  );
}