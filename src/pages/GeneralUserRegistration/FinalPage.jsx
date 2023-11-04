import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import checkedImg from '../../images/checked.png';
import Snackbar from "../../components/GeneralUserRegistration/SnackBar";

export default function FinalPage() {   
    return (
        <div>      
                <Snackbar />
                <Stack sx={{ width: '100%' }} alignItems='center'>
                    <img src={checkedImg} alt = "checked" className='w-48' />
                </Stack>
    
        </div>
    );
}