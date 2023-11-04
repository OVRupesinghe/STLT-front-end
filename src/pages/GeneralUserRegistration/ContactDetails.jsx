import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import otpImg from "../../images/otp.png";
import useFormContext from "../../hooks/useFormContext";
import Steppers from "../../components/GeneralUserRegistration/Steppers";
import axios from '../../api/posts'

export default function ContactDetails() {
  const { register, errors } = useFormContext();

  return (
    <Grid container spacing={2} sx={{ marginTop: "8%" }}>
      <Steppers step={2} />
      <Grid item xs={12} sx={{ mt: 3 }}>
        <TextField
          required
          fullWidth
          id="userid"
          label="Enter a username:"
          autoComplete="username"
          {...register("username", {
            required: "field required",
            validate: {
              checkUser: async (value) => {
                const response = await axios.get(`checkusername/${value}`);
                if (response.data.message == "Username already exists") {
                  return response.data.message
                } else {
                  return true
                }
              },

            }
          }
          )}
        />
        {errors.username?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.username?.message}</Alert> : ""}
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Typography
          component="h1"
          variant="subtitle1"
          className="mb-5 font-light text-neutral-500"
        >
          Enter your address :
        </Typography>
        <TextField
          fullWidth
          id="address"
          label="Address"
          multiline
          rows={4}
          {...register("address", {
            required: "field required",
          })}
        />
        {errors.address?.message ? (
          <Alert sx={{ mt: "10px" }} severity="error">
            {errors.address?.message}
          </Alert>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
}
