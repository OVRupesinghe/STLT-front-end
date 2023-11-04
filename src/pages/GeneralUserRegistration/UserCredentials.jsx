import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import passImg from "../../images/password.png";
import useFormContext from "../../hooks/useFormContext";
import Steppers from "../../components/GeneralUserRegistration/Steppers";

export default function ContactDetails() {
  const { register, errors, watch } =
    useFormContext();
  const password = useRef({});
  password.current = watch("pass", "");
  return (
    <div>
      <Steppers step={1} />
      <Grid container spacing={2} sx={{ marginTop: "8%" }}>
        <Stack sx={{ width: "100%" }} alignItems="center">
          <img alt ='passwordImage'src={passImg} className="w-32" />
        </Stack>
        <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="pass"
            label="Password"
            type="password"
            autoFocus
            {...register("pass", {
              required: "field required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                message:
                  "Invalid format, a password should have at least one uppercase letter,least one digit, least one special character, minimum length of 8 characters.",
              },
            })}
          />
          {errors.pass?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.pass?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            type="password"
            id="confirmPass"
            label="Confirm Password"
            {...register(
              "cpass",
              {
                required: "field required",
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              }
            )}
          />
          {errors.cpass?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.cpass?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
}
