import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SmallText from './SmallText';
import { Grid, TextField, MenuItem, Typography } from '@mui/material';
import useFormContext from '../../../hooks/useFormContext';
import Stack from '@mui/material/Stack';
import VideoThumbnail from 'react-video-thumbnail';
import Alert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Img from "../../../images/tuk-tuk.png";
import Bus from "../../../images/bus.png";
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const vehicalTypes = [
  {
    value: 'motor_car',
    label: <Stack spacing={1} direction='row' justifyContent='space between'><DirectionsCarIcon /><p>Motor Car</p></Stack>,
  },
  {
    value: 'motor_bicycle',
    label: <Stack spacing={1} direction='row' justifyContent='space between'><TwoWheelerIcon /><p>Motor Bicycle</p></Stack>,
  },
  {
    value: 'lorry',
    label: <Stack spacing={1} direction='row' justifyContent='space between'><LocalShippingIcon /><p>Lorry / Truck</p></Stack>,
  },
  {
    value: 'three_wheeler',
    label: <Stack spacing={1} direction='row' justifyContent='space between'><img src={Img} alt="tuk-tuk" width="25px" height="25px" /><p>Three Wheeler</p></Stack>,
  },
  {
    value: 'Van',
    label: <Stack spacing={1} direction='row' justifyContent='space between'><AirportShuttleIcon /><p>Van</p></Stack>,
  },
  {
    value: 'Bus',
    label: <Stack spacing={1} direction='row' justifyContent='space between'><img src={Bus} alt="bus" width="25px" height="25px" /><p>Bus</p></Stack>,
  },
  // Add more vehicle types here
];

const violationTypes = [
  {
    value: '001',
    label: 'Drunk Driving',
  },
  {
    value: '002',
    label: 'Speeding',
  },
  {
    value: '003',
    label: 'Reckless Driving',
  },
  {
    value: '004',
    label: 'Running Red Light',
  },
  {
    value: '005',
    label: 'Seatbelt Violation',
  },
  // Add more violation types here
];

const District = [
  {
    value: 'Colombo District',
    label: 'Colombo District',
  },
  {
    value: 'Gampaha District',
    label: 'Gampaha District',
  },
  {
    value: 'Kalutara District',
    label: 'Kalutara District',
  },
  {
    value: 'Kandy District',
    label: 'Kandy District',
  },
  {
    value: 'Matale District',
    label: 'Matale District',
  },
  {
    value: 'Nuwara Eliya District',
    label: 'Nuwara Eliya District',
  },
  {
    value: 'Galle District',
    label: 'Galle District',
  },
  {
    value: 'Matara District',
    label: 'Matara District',
  },
  {
    value: 'Hambantota District',
    label: 'Hambantota District',
  },
  {
    value: 'Jaffna District',
    label: 'Jaffna District',
  },
  {
    value: 'Mannar District',
    label: 'Mannar District',
  },
  {
    value: 'Vavuniya District',
    label: 'Vavuniya District',
  },
  {
    value: 'Mullaitivu District',
    label: 'Mullaitivu District',
  },
  {
    value: 'Batticaloa District',
    label: 'Batticaloa District',
  },
  {
    value: 'Ampara District',
    label: 'Ampara District',
  },
  {
    value: 'Trincomalee District',
    label: 'Trincomalee District',
  },
  {
    value: 'Kurunegala District',
    label: 'Kurunegala District',
  },
  {
    value: 'Puttalam District',
    label: 'Puttalam District',
  },
  {
    value: 'Anuradhapura District',
    label: 'Anuradhapura District',
  },
  {
    value: 'Polonnaruwa District',
    label: 'Polonnaruwa District',
  },
  {
    value: 'Badulla District',
    label: 'Badulla District',
  },
  {
    value: 'Monaragala District',
    label: 'Monaragala District',
  },
  {
    value: 'Ratnapura District',
    label: 'Ratnapura District',
  },
  {
    value: 'Kegalle District',
    label: 'Kegalle District',
  },
];

const citiesByDistrict = {
  "": [""],
  "Colombo District": ["Colombo", "Dehiwala-Mount Lavinia", "Moratuwa"],
  "Gampaha District": ["Gampaha", "Negombo", "Wattala"],
  "Kalutara District": ["Kalutara", "Panadura", "Horana"],
  "Kandy District": ["Kandy", "Peradeniya", "Gampola"],
  "Matale District": ["Matale", "Dambulla", "Sigiriya"],
  "Nuwara Eliya District": ["Nuwara Eliya", "Hatton", "Talawakelle"],
  "Galle District": ["Galle", "Matara", "Hikkaduwa"],
  "Matara District": ["Matara", "Tangalle", "Mirissa"],
  "Hambantota District": ["Hambantota", "Tissamaharama", "Ambalantota"],
  "Jaffna District": ["Jaffna", "Point Pedro", "Chavakachcheri"],
  "Mannar District": ["Mannar", "Nanaddan", "Madhu"],
  "Vavuniya District": ["Vavuniya", "Chettikulam", "Nedunkeni"],
  "Mullaitivu District": ["Mullaitivu", "Puthukudiyiruppu", "Mankulam"],
  "Batticaloa District": ["Batticaloa", "Kattankudy", "Eravur"],
  "Ampara District": ["Ampara", "Kalmunai", "Sammanthurai"],
  "Trincomalee District": ["Trincomalee", "Nilaveli", "Kuchchaveli"],
  "Kurunegala District": ["Kurunegala", "Kuliyapitiya", "Narammala"],
  "Puttalam District": ["Puttalam", "Chilaw", "Anamaduwa"],
  "Anuradhapura District": ["Anuradhapura", "Medawachchiya", "Kekirawa"],
  "Polonnaruwa District": ["Polonnaruwa", "Hingurakgoda", "Medirigiriya"],
  "Badulla District": ["Badulla", "Bandarawela", "Haputale"],
  "Monaragala District": ["Monaragala", "Wellawaya", "Bibile"],
  "Ratnapura District": ["Ratnapura", "Embilipitiya", "Balangoda"],
  "Kegalle District": ["Kegalle", "Dehiowita", "Mawanella"],
};



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(3), // Adjust the value as needed
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary[200],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ComplaintDialog() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [date, setDate] = React.useState(dayjs());
  const [time, setTime] = React.useState(dayjs());
  const today = dayjs();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { page, getValues, setValue, setPage, videoUrl, trimmedVideo, register, errors, videoThumbnail, setVideoThumbnail } = useFormContext();
  const { auth } = useAuth();
  const handleNext = () => setPage(page + 1);
  const handleBack = () => setPage(page - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue('video', trimmedVideo);
    setValue('user', auth.user);
    setValue('previewImage', videoThumbnail);
    setValue('date', date.format('YYYY-MM-DD'));
    // Extract hour and minute components
    const hours = time.$d.getHours();
    const minutes = time.$d.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    setValue('time', formattedTime);
    console.log(getValues());
    handleNext();
  };
  const thumbnailHandler = (thumbnailUrl) => {
    // Convert the thumbnail URL to a Blob
    fetch(thumbnailUrl)
      .then(response => response.blob())
      .then(thumbnailBlob => {
        setVideoThumbnail(thumbnailBlob);
      })
      .catch(error => {
        console.error('Error fetching or converting thumbnail:', error);
      });
  };
  return (
    <div>
      <Button
        startIcon={<CloudUploadIcon />}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className="rounded-full"
        sx={{ boxShadow: 'none', textTransform: 'none' }}
      >
        Finish Uploading
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <center><b>Edit Details</b></center>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={5} alignItems='center'>
            <Grid item xs={6}>
              {/* Form */}
              <Grid component="form" container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    name="vehical_number"
                    label="Vehicle Number:"
                    variant="outlined"
                    fullWidth
                    type="text"
                 
                    helperText="Enter vehicle number"
                    {...register("vehicleNum")}
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    id="outlined-select-vehical-type"
                    select
                    label="Vehicle Type"
                    fullWidth
                    helperText="Select vehicle type"
              
                    {...register("type", {
                      required: "field required",
                    })}
                    align="center"
                  >
                    {vehicalTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  {errors.vehicleNum?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.vehicleNum?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={6}>
                  {errors.type?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.type?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-select-district"
                    select
                    label="District"
                    fullWidth
            
                    helperText="Select the district"
                    {...register("district", {
                      required: "field required",
                    })}
                    value={selectedDistrict}
                    onChange={(e) => {
                      const selectedDistrict = e.target.value;
                      setSelectedDistrict(selectedDistrict);
                      // Update the selected city when the district changes
                      setSelectedCity("");
                    }}
                  >
                    {District.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-select-city"
                    select
                    label="City"
                    fullWidth
             
                    helperText="Select the city"
                    {...register("city", {
                      required: "field required",
                    })}
                    value={selectedCity}
                    onChange={(e) => {
                      const selectedCity = e.target.value;
                      setSelectedCity(selectedCity);
                    }}
                  >
                    {citiesByDistrict[selectedDistrict].map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  {errors.province?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.province?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={4}>
                  {errors.district?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.district?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={4}>
                  {errors.city?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.city?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={date} // Make sure dateValue is set in your component's state
                      onChange={(newValue) => setDate(newValue)}
                      label="Date"
                      name="date"
                      helperText="Select the date of the incident"
                      required
                      maxDate={today}
                      minDate={dayjs().subtract(2, 'week')}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Time"
                      helperText="Select the time of the incident"
                      value={time}
                      onChange={(newValue) => setTime(newValue)}
                    />

                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sx = {{mt:'10px'}}>
                  <TextField
                    id="outlined-multiline-description"
                    label="Description"
                    multiline
                    rows={5}
                    fullWidth
                    helperText="Enter a description about the incident"
                    {...register("description", {
                      required: "field required",
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  {errors.description?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.description?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} padding={5}>
              {/* Preview and note */}
              <Stack spacing={5}>
                <Stack alignItems='center' justifyContent='center' width='100%' sx={{ backgroundColor: '#D9D9D9' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '70%',
                      height: 'auto',
                    }}
                  >
                    <VideoThumbnail videoUrl={videoUrl} thumbnailHandler={thumbnailHandler} />
                  </div>

                </Stack>
                <Stack gap={1}>
                  <Typography variant='subtitle2' sx={{ fontWeight: '600' }} color='#5A5A5A'>Why do we collect this information?</Typography>
                  <SmallText text="By obtaining supplementary information related to the video evidence, law enforcement can strengthen the evidentiary value of the footage, establish a more accurate account of events, and conduct a thorough and fair investigation." />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="space-around" width="100%">

            <Button onClick={handleBack} sx={{ padding: '20px' }}>Back</Button>

            <Button onClick={handleSubmit} sx={{ padding: '20px' }}>Next</Button>

          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
