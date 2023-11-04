import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import qr from '../../images/qr.png'
import license from '../../images/license.png'
import OptionCard from '../../components/Traffic police/Home/OptionCard';
import { useTheme } from '@mui/material/styles';
import CustomizedSteppers from '../../components/Traffic police/Steppers.jsx';
import useAuth from '../../hooks/useAuth';


export default function Home() {
    const theme = useTheme();
    const { auth} = useAuth();
    console.log(auth.user);
    return (
        <>
            <Box>
                <CustomizedSteppers step={0} />
            </Box>
            <Box sx = {{height: '70vh'}} > 

                <Grid container sx={{ justifyContent: 'center', marginTop: 10 }}>
                    <OptionCard txt={'Scan QR'} img={qr} status='qr' />
                    <Grid item xs={12} sm={3} sx={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', [theme.breakpoints.up('sm')]: {
                            height: 500
                        },

                        [theme.breakpoints.up('xs')]: {
                            width: 200,
                            height: 100,
                        },
                    }} >

                        <Typography variant='h3' align='center' className='font-bold text-gray-700'>OR</Typography>

                    </Grid>
                    <OptionCard txt={'Enter License No.'} img={license} status='license' />

                </Grid>
            </Box>
        </>

    );
}
