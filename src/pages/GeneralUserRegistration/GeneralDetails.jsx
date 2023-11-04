import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Steppers from '../../components/GeneralUserRegistration/Steppers';
import Alert from '@mui/material/Alert';
import useFormContext from '../../hooks/useFormContext';
import axios from '../../api/posts'

export default function GeneralDetails() {

    const { register, errors } = useFormContext();
    return (
        <div>
            <Grid container spacing={2} sx={{ mt: 3 }}>
                <Steppers step={0} />
                <Grid item xs={12} sm={6} sx={{ mt: 6 }}>
                    <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        {...register("fname", {
                            required: "field required",
                            pattern: {
                                value: /^[A-Za-z]+$/i,
                                message: "Invalid first name"
                            }
                        })}
                    />
                    {errors.firstName?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.firstName?.message}</Alert> : ""}
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 6 }}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoComplete="family-name"
                        {...register("lname", {
                            required: "field required",
                            pattern: {
                                value: /^[A-Za-z]+$/i,
                                message: "Invalid last name"
                            }
                        })}
                    />
                    {errors.lastName?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.lastName?.message}</Alert> : ""}
                </Grid>
                <Grid item xs={12} sx={{ mt: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        {...register("username", {
                            required: "field required",
                            validate: {
                                checkUser: async (value) => {
                                    const response = await axios.get(`checkusername/${value}`);
                                    if(response.data.message == "Username already exists"){
                                        return response.data.message
                                    }else{
                                        return true
                                    }
                                }
                            }
                        }
                        )}
                    />
                    {errors.username?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.username?.message}</Alert> : ""}
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
                                    if(response.data.message == "User with this email already exists"){
                                        return response.data.message
                                    }else{
                                        return true
                                    }
                                }
                            }
                        }
                        )}
                    />
                    {errors.email?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.email?.message}</Alert> : ""}
                </Grid>
            </Grid>

        </div>
    );
}