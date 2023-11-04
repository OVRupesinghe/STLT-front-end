import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Steppers from '../../components/GeneralUserRegistration/Steppers';
import Alert from '@mui/material/Alert';
import useFormContext from '../../hooks/useFormContext';
import axios from '../../api/posts';
import Typography from '@mui/material/Typography';


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
                                    if (response.data.message == "User with this email already exists") {
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
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <Typography
                        component="h1"
                        variant="subtitle1"
                        className="mb-5 font-light text-neutral-500"
                    >
                        Enter your Sri Tel mobile number :
                    </Typography>
                    <TextField
                        fullWidth
                        id="contact"
                        label="Contact No."
                        {...register("contact", {
                            required: "field required",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Contact number should have 10 digits",
                            },
                            validate: {
                                checkPhone: async (value) => {
                                    const response = await axios.get(`checkphone/${value}`);
                                    if (
                                        response.data.message == "User with this phone number already exists"
                                    ) {
                                        return response.data.message;
                                    } else {
                                        return true;
                                    }
                                },
                                checkValidity: async (value) => {
                                    const response = await axios.get(`checkphoneValidity/${value}`);
                                    if (
                                        response.data.message == "Not a valid SriTel phone number"
                                    ) {
                                        return response.data.message;
                                    } else {
                                        return true;
                                    }
                                }
                            },
                        })}
                    />
                    {errors.contact?.message ? (
                        <Alert sx={{ mt: "10px" }} severity="error">
                            {errors.contact?.message}
                        </Alert>
                    ) : (
                        ""
                    )}
                </Grid>
            </Grid>

        </div>
    );
}