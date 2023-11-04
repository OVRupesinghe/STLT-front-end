import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import VideoCard from './VideoCard2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderStyle: 'none',
    borderRadius: '10px'
};

export default function ViewFineModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(props.videoKey)
    return (
        <div>
            <div class="relative flex justify-center items-center overflow-hidden bg-cover bg-no-repeat" style={{width: '100%', height: 'auto' }} onClick={handleOpen}>
                <img
                    src={`http://localhost:8000/images/previews/${props.url}`}
                    class="transition duration-300 ease-in-out hover:scale-110"
                    alt="video-thumbnail" />
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <VideoCard access = {props.videoKey}/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}