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
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';


const PwdForm = (props) => {
  const old_password = props.password;
  const axios = useAxiosPrivate();
  const theme = useTheme();
  const {auth} = useAuth();
  const { register, errors, watch, getValues, handleSubmit } = useFormContext();
  const password = useRef({});
  password.current = watch("pass", "");
  const [formData, setFormData] = useState({
    oldpass: '',
    newpass: '',
    newpass_confirm: ''
  });

  // State to track whether the old password is correct
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Check if the entered old password is correct
    if (name === 'oldpass' && value === old_password) {
      setIsOldPasswordCorrect(true);
    } else {
      setIsOldPasswordCorrect(false);
    }
  };

  const onSubmit = async (e) => {
    const data = {
      phone:auth.phone,
      pass: getValues("pass"),
    }
    console.log(data);
    try{
      const res = await axios.post('changePassword', data);
      console.log(res.data);
    }catch(err){
      console.log(err);
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5} sx={{ padding: 5, display: 'flex' }}>
        <Grid item xs={12}>
          <TextField
            name="oldpass"
            label="Current Password:"
            variant="outlined"
            fullWidth
            size='small'
            type='password'
            value={formData.oldpass}
            onChange={handleChange}
          />
        </Grid>
        {isOldPasswordCorrect ? ( // Only show the following fields if old password is correct
          <>
            <Grid item xs={12}>
              <SmallText text={"In order to protect your account, we suggest you to have a password"} />
              <SmallText text={"- Longer than 8 characters"} />
              <SmallText text={"- Contains at least one uppercase, one lowercase and one special character"} />
              <SmallText text={"- Something not easily predictable.(Ex: Your pet’s name, Your birthday, abcd, 1234, etc. )"} />
            </Grid>
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type='submit' color = 'success' variant = 'contained'>
              SAVE PASSWORD
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
    </form>
  );
};

export default PwdForm;