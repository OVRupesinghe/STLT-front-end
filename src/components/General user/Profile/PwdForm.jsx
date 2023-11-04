import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ModalButton from './ModalButton';
import SmallText from './SmallText';

const PwdForm = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    oldpass: '',
    newpass: '',
    newpass_confirm: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, for example, submit data to the server or perform some action
    // console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <Grid item xs={12}>
          <SmallText text={"In order to protect your account, we suggest you to have a password"} />
          <SmallText text={"- Longer than 8 characters"} />
          <SmallText text={"- Contains at least one uppercase, one lowercase and one special character"} />
          <SmallText text={"- Something not easily predictable.(Ex: Your pet’s name, Your birthday, abcd, 1234, etc. )"} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="newpass"
            label="New Password:"
            variant="outlined"
            type='password'
            fullWidth
            size='small'
            value={formData.newpass}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirm_newpass"
            label="Confirm New Password:"
            variant="outlined"
            fullWidth
            size='small'
            type='password'
            value={formData.confirm_newpass}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <ModalButton buttonText={"SAVE PASSWORD"} type={"success"} />
        </Grid>
      </Grid>
    </form>
  );
};

export default PwdForm;
