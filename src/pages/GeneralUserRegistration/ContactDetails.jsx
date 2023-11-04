import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import otpImg from '../../images/otp.png';
import useFormContext from '../../hooks/useFormContext';
import Steppers from '../../components/GeneralUserRegistration/Steppers';

export default function ContactDetails() {

    const { register, errors } = useFormContext();

    return (

        <Grid container spacing={2} sx={{ marginTop: '8%' }}>
            <Steppers step={2} />
            <Stack sx={{ width: '100%' }} alignItems='center'>
                <img src={otpImg} alt = "otp" className='w-52' />
            </Stack>
            <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography component="h1" variant="subtitle1" className='mt-10 mb-5 font-light text-neutral-500' >
                    Enter your contact number :
                </Typography>
                <TextField
                    fullWidth
                    id="contact"
                    label="Contact No."
                    {...register("contact", {
                        required: "field required",
                        pattern: {
                            value: /^\d{10}$/,
                            message: "Contact number should have 10 digits"
                        }
                    })}
                />
                {errors.contact?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.contact?.message}</Alert> : ""}
            </Grid>

        </Grid>

    );
}