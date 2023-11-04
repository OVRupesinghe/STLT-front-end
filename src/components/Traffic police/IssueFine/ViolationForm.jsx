import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import FormList from './FormList';
import DropDown from './DropDown';
import MultipleDropDown from './MultipleDropDown';
import { useTheme } from '@emotion/react';
import "@fontsource/inter";

const policeDivisions = [
    "Colombo Central Police Division",
    "Colombo North Police Division",
    "Colombo South Police Division",
    "Nugegoda Police Division",
    "Mount Lavinia Police Division",
    "Kelaniya Police Division",
    "Gampaha Police Division",
    "Negombo Police Division",
    "Panadura Police Division",
    "Kalutara Police Division",
    "Kandy Police Division",
    "Gampola Police Division",
    "Theldeniya Police Division",
    "Matale Police Division",
    "Nuwaraeliya Police Division",
    "Hatton Police Division",
];
const policeStations = [
    "Pettah",
    "Keselwatta",
    "Dam Street",
    "Wolfendhal Street",
    "Fort",
    "Slave Island",
    "Maradana",
    "Maligawatta"
];

const offences = [
    "Driving without a valid license",
    "Driving under the influence of alcohol",
    "Driving without a valid insurance",
    "Driving without a valid registration",
    "Driving without a valid emission test",
    "Driving without a valid revenue license",
    "Driving without a valid route permit",
    "Driving without a valid fitness certificate",
    "Driving without a valid number plate",
    "Driving without a valid speed limiter",
    "Driving without a valid speedometer",
    "Driving without a valid side mirror",
    "Driving without a valid rear mirror",
    "Driving without a valid headlight",
    "Driving without a valid tail light",
    "Driving without a valid indicator",
    "Driving without a valid horn",
    "Driving without a valid wiper",
    "Driving without a valid seat belt",
    "Driving without a valid helmet",
    "Driving without a valid reflector",
    "Driving without a valid mudguard",
    "Driving without a valid silencer",
    "Driving without a valid foot rest",
    "Driving without a valid handle bar",
    "Driving without a valid stand",
    "Driving without a valid chain cover",
    "Driving without a valid number plate light",
    "Driving without a valid number plate sticker",
    "Driving without a valid number plate reflector",
    "Driving without a valid number plate screw",
    "Driving without a valid number plate lock",
    "Driving without a valid number plate frame",
    "Driving without a valid number plate cover",
    "Driving without a valid number plate holder",
    "Driving without a valid number plate bolt",
    "Driving without a valid number plate nut",
    "Driving without a valid number plate washer",
    "Driving without a valid number plate clamp",
    "Driving without a valid number plate bracket",
]


const LicenseDetails = ['Date', 'Time', 'Police Division', 'Police Station', 'Offence', 'Fine Amount', 'Demerit Points'];
const LicenseData = ['01/01/2021', '12:00 PM', <DropDown valuesArr={policeDivisions} />, <DropDown valuesArr={policeStations} />, <MultipleDropDown valuesArr={offences} />, 'Rs. 5000', '8'];

export default function ViolationForm() {
    const theme = useTheme();
    return (

        <Grid item lg={12} align='center'>
            <Paper className='shadow-md' sx={{
                gap: 3, boxShadow: 'none', display: 'flex', width: '50%', flexDirection: 'column', padding: 5, borderRadius: 4, [theme.breakpoints.down('md')]: {
                    width: '100%', // Width for small screens
                },
                [theme.breakpoints.between('md','xl')]: {
                    width: '80%', // Width for small screens
                }
            }}>
                <Typography component="div" className='text-2xl text-center text-slate-950 font-semibold subpixel-antialiased' sx={{ fontFamily: 'inter' }}>
                    Violation Details
                </Typography>
                <Stack direction='column' alignItems="center" spacing={5} justifyContent='space-evenly'>
                    <FormList detailsArr={LicenseDetails} dataArr={LicenseData} />
                </Stack>
            </Paper>
        </Grid>

    );
}

