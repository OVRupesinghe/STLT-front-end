import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Typography } from '@mui/material';
import InputForm from '../../components/General user/Profile/InputForm';
import VehicalInfo from '../../components/General user/Profile/VehicalInfo';
import SectionTitle from '../../components/General user/Profile/SectionTitle';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import theme from '../../components/General user/theme';
import axios from '../../api/posts';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';

function ProfilePage() {

  const { auth } = useAuth();
  const [profileData, setProfileData] = React.useState([]);
  const phone = auth.phone;

  const getUserData = async () => {
    try {
      const res = await axios.get(`user/${phone}`);   
      setProfileData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect (() => {
    getUserData();
  },[])


  
  return (

    <Stack sx={{
      [theme.breakpoints.up('md')]: {
        justifyContent: 'center',
        height:'90vh'
       
      },
      [theme.breakpoints.down('md')]: {
        height: 'auto',
        justifyContent: 'space-between',
        width:'70%',
        marginTop:2 
      }

    }}>
      <Grid container sx = {{height:'90%'}}>
        <Grid item xs={12} md={12}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }} className='rounded-tl-lg shadow-md'>
            <SectionTitle titleText={"Your Profile"} />
            <Avatar sx={{ width: 200, height: 200 }} className='bg-green-800'>
              <PersonIcon sx={{ fontSize: 150 }} />
            </Avatar>
            <Badge badgeContent={'USER'} color="success" />
            <Typography sx={{ marginTop: 2 }}>
              {profileData.fname} {profileData.lname}
            </Typography>
            <InputForm password = {profileData.password}/>
          </Paper>
          <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 'none' }} className='rounded-bl-xl shadow-md'>
            <Stack justifyContent='center' alignItems='center' direction='row'>
              <QrCodeScannerIcon className='text-zinc-500 mr-2' />
              <SectionTitle titleText={"Your Information"} />
            </Stack>
            <VehicalInfo profile_data = {profileData}/>
          </Paper>
        </Grid>
      </Grid>
    </Stack >
  );
}

export default ProfilePage;
