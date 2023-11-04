import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import image from '../../../images/license_card.png';
import ColorTextField from './TextField.jsx';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QRScanner from './QR_Scanner.jsx';
import { useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style1 = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  height: '60%',
  bgcolor: '#ffff',
  borderRadius: 5,
  boxShadow: 24,
  p: 4
};

const style2 = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Set width to 100% for full screen
  height: '60%', // Set height to 100% for full screen
  bgcolor: '#ffff',
  borderRadius: 5,
  boxShadow: 24,
  p: '2%'
};


export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = createTheme();
  const isSmBreakpoint = useMediaQuery(theme.breakpoints.between('xs', 'xl'));
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('user-details');
  };

  if (props.status === 'qr') {
    return (
      <div>
        <Button onClick={handleOpen}><Typography variant='h6' align='center' className='font-bold text-black'>{props.txt} <ChevronRightIcon fontSize='large' className='font-bold text-gray-700' /> </Typography>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={isSmBreakpoint ? style2 : style1} spacing={2}>
            <QRScanner isModalOpen={open} />
          </Box>
        </Modal>
      </div>
    );
  } else {

    return (
      <div>
        <Button onClick={handleOpen}><Typography variant='h6' align='center' className='font-bold text-black'>{props.txt} <ChevronRightIcon fontSize='large' className='font-bold text-gray-700' /> </Typography>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={isSmBreakpoint ? style2 : style1} spacing={2}>

            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton sx={{ color: 'black' }} onClick={handleClose}>
                <ArrowBackIcon fontSize='medium' />
              </IconButton>

              <Typography id="modal-modal-title" variant="h5" component="h4" className='font-bold text-black'>
                Enter License No.
              </Typography>

            </Stack>
            <img src={image} alt='' style={{ width: 250, height: 'auto' }} />
            <Stack spacing={2}>
              <ColorTextField />
              <Box textAlign="center">
                <Button variant="contained" sx={{ width: 'auto' }} onClick={handleButtonClick} >Confirm</Button>
              </Box>

            </Stack>


          </Box>
        </Modal>
      </div>
    );
  }

}
