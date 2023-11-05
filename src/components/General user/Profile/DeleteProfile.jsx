import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ModalButton from './ModalButton';
import DeleteIcon from '@mui/icons-material/Delete';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
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

export default function DeleteProfile() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        startIcon={<DeleteIcon />}
        color="error"
        onClick={handleClickOpen}
        sx={{ textTransform: 'none' }}
        size = 'large'
        className='rounded-full'
      
      >
        Delete Account
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            <b>Delete Account</b>
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'medium', padding: '16px', textAlign: 'center' }}>
              Are you sure you want to delete your account? This action will remove all your data related to your account and cannot be undone.
            </Typography>
            <ModalButton buttonText={"Confirm Deletion"} type={"error"} />
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

