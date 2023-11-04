import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FineCard from './VideoCard2';
import useFineContext from '../../../hooks/useFineContext';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import RateReviewIcon from '@mui/icons-material/RateReview';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import image from '../../../images/gavel.png';
import SmallText from './SmallText';
import useFormContext from '../../../hooks/useFormContext';
import { Alert } from '@mui/material';
import DialogBox from './AppealConfirmDialog';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '15px',
};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 5,
};

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    }
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    }
});

const appealTypes = [
    {
        value: 'The evidence is fake or tampered with',
    },
    {
        value: 'I was not the driver of the vehicle',
    },
    {
        value: 'The vehicle was stolen',
    },
    {
        value: 'I was the previous owner of the vehicle',
    },
    {
        value: "There doesn't seem to be a violation ",
    },
    {
        value: 'I was already fined for this violation',
    }
    ,
    {
        value: 'Other',
    },
    // Add more violation types here
];

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClose();
    }
    const { register, errors } = useFormContext();
    return (
        <div style={{ padding: '10px' }}>
            <Button size='large' startIcon={<RateReviewIcon />} color='error' onClick={handleOpen} sx={{ borderRadius: '20px', width: '200px', textTransform: 'none' }}>Appeal</Button>
            <ThemeProvider theme={lightTheme}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style2 }}>
                        <Grid component='form' onSubmit={handleSubmit} container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" color='#020617' component="h2" align="center" sx={{ fontWeight: '600' }}>
                                    Appeal Form
                                </Typography>
                            </Grid>
                            <Stack sx={{ width: "100%", marginTop: '5%' }} alignItems="center" margin spacing={2}>
                                <img src={image} style={{ width: '20%' }} />
                                <SmallText text={"Note that by submitting an appeal you will be directing your case to the relevant police division and if necessary further legal action can be taken. Please make sure to read the appeal guidelines before submitting an appeal."} />
                            </Stack>
                            <Grid item xs={12} >
                                <TextField
                                    id="outlined-select-vehical-type"
                                    select
                                    label="Appeal Reason"
                                    fullWidth
                                    helperText="Select reason type"

                                    {...register("appealReason", {
                                        required: "field required",
                                    })}
                                    align="center"
                                >
                                    {appealTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.appealReason?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.appealReason?.message}</Alert> : ""}
                            </Grid>
                            <Grid item xs={12} sx={{ mt: '10px' }}>
                                <TextField
                                    id="outlined-multiline-description"
                                    label="Description"
                                    multiline
                                    rows={5}
                                    fullWidth
                                    helperText="Enter a description about the reason to appeal"
                                    {...register("description", {
                                        required: "field required",
                                    })}
                                />
                                {errors.description?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.description?.message}</Alert> : ""}
                            </Grid>
                        </Grid>
                        <Stack sx={{ width: "100%", marginTop: '5%' }} direction='row' justifyContent='space-evenly' margin spacing={2}>
                            <DialogBox />
                        </Stack>
                    </Box>
                </Modal>
            </ThemeProvider>
        </div>
    );
}

export default function NestedModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <div className="relative flex justify-center items-center overflow-hidden bg-cover bg-no-repeat" style={{ width: '100%', height: 'auto' }} onClick={handleOpen}>
                    <img
                        src={`http://localhost:8000/images/previews/${props.thumbnail}`}
                        className="transition duration-300 ease-in-out hover:scale-110"
                        alt="video-thumbnail" />
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: '25%' }}>
                        <FineCard data={props.items} />
                        <Stack width='100%' alignItems='center'>
                            {
                                props.items.status === 1 ? (
                                    <Typography>
                                        <Alert severity="success">Fine was paid</Alert>
                                    </Typography>
                                ) : (
                                    props.isPassed ?
                                    <Typography>
                                        <Alert severity="error">Appeal date has passed</Alert>
                                    </Typography>
                                    : <ChildModal /> 
                                )

                            }
                        </Stack>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}