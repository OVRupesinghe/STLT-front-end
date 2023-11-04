import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import DetailsList from '../DetailsList';
import { useTheme } from '@emotion/react';
import "@fontsource/inter";
import useDetailsContext from '../../../hooks/useDetailsContext';

const PersonalKeys = ['Full Name', 'Age', 'Address', 'Phone No.', 'NIC No.'];


export default function PersonalDetailsCard() {
    const theme = useTheme();
    const {personalDetails} = useDetailsContext();
    const PersonalData = [personalDetails.fullName, personalDetails.age, personalDetails.address, personalDetails.contactNumber, personalDetails.nic];
    return (

        <Grid item lg={12} align='center' sx={{ width: '100%' }}>
            <Paper className='shadow-md' sx={{
                gap: 3, boxShadow: 'none', display: 'flex', width: '75%', flexDirection: 'column', padding: 5, [theme.breakpoints.down('sm')]: {
                    width: '100%', // Width for small screens
                }
            }}>
                <Typography component="div" className='text-2xl text-center text-slate-950 font-semibold subpixel-antialiased' sx={{ fontFamily: 'inter' }}>
                    Personal Details
                </Typography>
                <Stack direction='row' justifyContent='center'>
                    <Stack direction='column' sx={{ width: '100%' }} alignItems='center' >
                        <DetailsList detailsArr={PersonalKeys} dataArr={PersonalData} />
                    </Stack>
                </Stack>
            </Paper>
        </Grid>

    );
}

