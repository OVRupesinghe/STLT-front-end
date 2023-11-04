import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import DarkDetailsList from './DarkDetailsList';

function FinePaid() {
    return (
        <Typography component="div" className='text-sm text-green-500'>
            Yes
        </Typography>
    );
}

function FineNotPaid() {
    return (
        <Typography component="div" className='text-sm text-red-500'>
            No
        </Typography>
    );
}

function formatDate(inputDate) {
    const parts = inputDate.split(/[-T:Z]/);
  
    const year = parts[0];
    const day = parts[2];
    const month = parts[1]; // Adding 1 to adjust for zero-indexed months
  
    return `${year}-${month}-${day}`;
  }


const OffenceDetails = ['Offence', 'Date', 'Location', 'Fine Settled'];
// const OffenceData = ['Speeding', '01/01/2021', 'Kandy', <FinePaid />];

export default function BasicCard(props) {

    const OffenceData = [props.data.offense,formatDate(props.data.date), props.data.location]
    if(props.data.status ===1){
        OffenceData.push(<FinePaid />)
    }else{
        OffenceData.push(<FineNotPaid />)
    }
    return (
        <Stack>
            <Paper className='bg-slate-950 opacity-90 rounded-xl' sx={{ display: 'flex', width: 500, flexDirection: 'column', padding: 4, marginTop: 2 }}>
                <Stack direction='column' sx={{ width: '100%' }} alignItems='center'>
                    <DarkDetailsList detailsArr={OffenceDetails} dataArr={OffenceData} />
                </Stack>
            </Paper>
        </Stack>
    );
}