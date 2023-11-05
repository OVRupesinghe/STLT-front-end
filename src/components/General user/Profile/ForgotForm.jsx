import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ModalButton from './ModalButton';
import SmallText from './SmallText';
import useFormContext from "../../../hooks/useFormContext";
import Alert from "@mui/material/Alert";
import { useRef } from 'react';
import Button from '@mui/material/Button';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/posts';
import { Typography } from '@mui/material';


const PwdForm = () => {

    const { register, errors, watch, getValues, handleSubmit } = useFormContext();
    const sendEmail = async (e) => {
        const data = {
            email: getValues("email")
        }
        try{
            const response = await axios.post('forgotPassword', data);
            alert(response.data.message);
            console.log(response.data.message);
        }catch(error){
            console.log(error);
        }

    };
    return (
        <form>
            <Grid container spacing={5} sx={{ padding: 5, display: 'flex' }}>
                <>
                    <Grid item xs={12}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', textAlign:'center' }}>Enter the email address</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            {...register("email", {
                                required: "field required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address"
                                },
                                validate: {
                                    checkEmail: async (value) => {
                                        const response = await axios.get(`checkemail/${value}`);
                                        if (response.data.message == "Email not found") {
                                            return response.data.message
                                        } else {
                                            return true
                                        }
                                    }
                                }
                            }
                            )}
                        />
                        {errors.email?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.email?.message}</Alert> : ""}
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick = {sendEmail} color='success' variant='contained'>
                            Send Password to email
                        </Button>
                    </Grid>
                </>

            </Grid>
        </form>
    );
};

export default PwdForm;