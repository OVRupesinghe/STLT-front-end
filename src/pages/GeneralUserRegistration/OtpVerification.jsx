import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import otpImg from '../../images/otp.png';
import Timer from '../../components/GeneralUserRegistration/Timer';
import useFormContext from '../../hooks/useFormContext';
import Steppers from '../../components/GeneralUserRegistration/Steppers';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export default function OtpVerification() {

    const { register, errors } = useFormContext();

    return (
        <div>
            <Steppers step={2} />
            <Grid container spacing={2} sx={{ marginTop: '8%' }}>
                <Stack sx={{ width: '100%' }} alignItems='center'>
                    <img src={otpImg} alt="otp" className='w-52' />
                </Stack>

                <Grid item xs={12} sx={{ mt: 3 }}>

                    <Timer />
                    <TextField
                        fullWidth
                        id="otp"
                        label="Enter 6-digit number."
                        {...register("otp", {
                            required: "field required",
                            pattern: {
                                value: /^\d{6}$/,
                                message: "OTP should have 6 digits"
                            }
                        })}
                    />
                    {errors.otp?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.otp?.message}</Alert> : ""}
                </Grid>


            </Grid>
        </div>
    );
}