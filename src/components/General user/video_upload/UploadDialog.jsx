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
import SmallText from './SmallText';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Dropzone from './Dropzone';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import createTheme from "@mui/material/styles/createTheme";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(3), // Adjust the value as needed
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <ThemeProvider theme={theme}>
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
              color: '#999999',
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    </ThemeProvider>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function UploadDialog() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    }
  });
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
        Upload Evidence
      </Button>
      <ThemeProvider theme={darkTheme}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={{ width: '100%' }}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            <center>Upload Evidence</center>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Dropzone />
          </DialogContent>
          <DialogActions>
            <center>
              <SmallText text={"By submitting your videos to CopSco, you acknowledge that you agree to CopSco Terms of Service and Community Guidelines. Please make sure that you do not violate others' copyright or privacy rights. Learn more"} />
            </center>
          </DialogActions>
        </BootstrapDialog>
      </ThemeProvider>
    </div>

  );
}

