import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Link, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import InputForm from '../../components/General user/Profile/InputForm';
import VehicalInfo from '../../components/General user/Profile/VehicalInfo';
import SectionTitle from '../../components/General user/Profile/SectionTitle';
import ValueAndTitle from '../../components/General user/Profile/ValueAndTitle';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import WalletIcon from '@mui/icons-material/Wallet';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DownloadingIcon from '@mui/icons-material/Downloading';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import theme from '../../components/General user/theme';

function ProfilePage() {

  
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
        <Grid item xs={12} md={3}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }} className='rounded-tl-lg shadow-md'>
            <SectionTitle titleText={"Your Profile"} />
            <Avatar sx={{ width: 200, height: 200 }} className='bg-green-800'>
              <PersonIcon sx={{ fontSize: 150 }} />
            </Avatar>
            <Badge badgeContent={'STARTER'} color="success" />
            <Typography sx={{ marginTop: 2 }}>
              Osura Viduranga
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
              <ValueAndTitle value={24} title={"Demerit Points"} />
              <Divider orientation="vertical" variant="middle" flexItem sx={{ marginX: 1 }} />
              <ValueAndTitle value={"3200.00 LRK"} title={"Rewards"} />
              <Divider orientation="vertical" variant="middle" flexItem sx={{ marginX: 1 }} />
              <ValueAndTitle value={"1/10"} title={"Reward Points"} />
            </Box>
            <Button
              startIcon={<WalletIcon />}
              variant="contained"
              className="bg-green-800 rounded-full"
              sx={{ boxShadow: "none", textTransform: "none" }}
            >
              Withdraw
            </Button>
          </Paper>
          <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 'none' }} className='rounded-bl-xl shadow-md'>
            <Stack justifyContent='center' alignItems='center' direction='row'>
              <QrCodeScannerIcon className='text-zinc-500 mr-2' />
              <SectionTitle titleText={"Your Secret QR"} />
            </Stack>
            <Card sx={{ border: 'none', boxShadow: 'none' }} className='shadow-xl rounded-md'>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="50"
                  image="https://www.bdc.ca/globalassets/digizuite/40415-bdc-qr-code.jpg?v=498d76"
                  alt="qr_code"
                  sx={{ height: 200, width: 200, marginBottom: 1 }}

                />
                <CardContent>

                  <Button
                    startIcon={<DownloadingIcon />}
                    variant="contained"
                    className="rounded-full"
                    sx={{ boxShadow: "none", textTransform: "none" }}>
                    <a href="https://www.bdc.ca/globalassets/digizuite/40415-bdc-qr-code.jpg?v=498d76" download="image.jpg">Download Image</a>
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} >
          <Paper  sx={{ padding: 2, height: '100%' }} className='shadow-md'>
            <Stack justifyContent='center' alignItems='center' direction='row'>
              <AccountBalanceIcon className='text-zinc-500 mr-2' />
              <SectionTitle titleText={"Edit Your Banking Info"} />
            </Stack>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <InputForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} >
          <Paper  sx={{ padding: 2, height: '100%' }} className='rounded-r-lg shadow-md'>
            <Stack justifyContent='center' alignItems='center' direction='row'>
              <DirectionsCarFilledIcon className='text-zinc-500 mr-2' />
              <SectionTitle titleText={"Your Vehicle Info"} />
            </Stack>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Box height='700px' sx={{ overflowY: 'scroll' }}>
              <Stack direction='column' justifyContent='center' alignItems='center'>
                <VehicalInfo />
                <VehicalInfo />
                <VehicalInfo />
                <VehicalInfo />
                <VehicalInfo />
                <VehicalInfo />
                <VehicalInfo />
                <VehicalInfo />
              </Stack>

            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Stack >
  );
}

export default ProfilePage;
