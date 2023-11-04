import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import DetailsList from '../DetailsList';
import CircleIcon from '@mui/icons-material/Circle';
import LicenseImg from '../../../images/1.png';
import { useTheme } from '@emotion/react';
import "@fontsource/inter";
import useDetailsContext from '../../../hooks/useDetailsContext';

function Status() {
    return (
        <Stack direction = 'row' alignItems='center' spacing = {1}>
             <CircleIcon sx={{ fontSize: 8 }} className='text-green-500' />
            <Typography component="div" className='text-lg text-green-500'>
                Active
            </Typography>
        </Stack>

    );
}

function Demerits(val) {
    return (
        <Typography variant="subtitle1" component="div" className='text-orange-500'>
            {val} 
        </Typography>
    );
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
const LicenseKeys = ['Status', 'Demerit Points', 'License No.', 'Date of Issue', 'Date of Expiry', 'Vehicle Categories', 'Restrictions'];


export default function LicenseCard() {
    const {LicenseDetails} = useDetailsContext();
    const dateOfIssue = formatDate(LicenseDetails.dateOfIssue);
    const dateOfExpiry = formatDate(LicenseDetails.dateOfExpiry);
    const LicenseData = [Status(), Demerits(LicenseDetails.demeritPoints), LicenseDetails.licenseNumber, dateOfIssue, dateOfExpiry, LicenseDetails.vehicleClass, LicenseDetails.restrictions];
    const theme = useTheme();
    return (

        <Grid item lg={12} align='center' sx = {{width:'100%'}} >
            <Paper className = 'shadow-md' sx={{ gap: 3, paddingLeft: 0 ,boxShadow: 'none', display: 'flex', width: '75%', flexDirection: 'column', padding: 5 , [theme.breakpoints.down('sm')]: {width: '100%' }}}>
                <Typography component="div" className='text-2xl text-center text-slate-950 font-semibold subpixel-antialiased' sx={{ fontFamily: 'inter' }}>
                    License Details
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={5} justifyContent='space-evenly'>
                    <Stack >
                        <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-full">
                            <img
                                src={LicenseImg}
                                class="max-w-xs transition duration-300 ease-in-out hover:scale-110 rounded-full"
                                alt="Louvre" />
                        </div>
                    </Stack>

                    <Stack direction='column' sx={{ width: '100%' }} alignItems='center' >
                        <DetailsList detailsArr={LicenseKeys} dataArr={LicenseData} />
                    </Stack>
                </Stack>
            </Paper>
        </Grid>

    );
}

