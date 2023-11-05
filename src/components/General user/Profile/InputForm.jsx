import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import ChangePassword from './ChangePassword';
import DeleteProfile from './DeleteProfile';
import { provinces } from "../../../data/Constants";
import MenuItem from '@mui/material/MenuItem';
import UpdateIcon from '@mui/icons-material/Update';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const InputForm = (props) => {
  const [formData, setFormData] = useState({
    fname: 'Osura',
    lname: 'Viduranga',
    username: '200012702955',
    email: 'OV@gmail.com'
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
    // Handle form submission here, for example, submit data to server or perform some action
    // console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' >
            <ChangePassword password = {props.password}/>
            <DeleteProfile />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default InputForm;
