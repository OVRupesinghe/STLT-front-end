import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import useFormContext from '../../hooks/useFormContext';
import TextField from '@mui/material/TextField';
import Steppers from '../../components/GeneralUserRegistration/Steppers';

export default function UserImage() {

    const { register, setValue } = useFormContext();

    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    
    const takePhoto = (event) => {
        event.preventDefault();
        const width = 396;
        const height = width / (16 / 9);
        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        photo.toBlob((blob) => {
            // Store the Blob in local storage
            setValue('verificationPIC', blob);
            setHasPhoto(true);
        });

    }

    const closePhoto = (event) => {
        event.preventDefault();
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    }

    useEffect(() => {
        let videoStream;

        const startVideo = async () => {
            try {
                videoStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 1920,
                        height: 1080,
                    },
                });

                let video = videoRef.current;
                if (video) {
                    video.srcObject = videoStream;
                    video.play().catch(err => {
                        console.log(err);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        startVideo();

        return () => {
            // Cleanup: Stop the video stream when the component unmounts
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (

        <div>
            <Steppers step={1} />
            <Grid container spacing={2}>

                <Grid item xs={12} sm={12} sx={{ mt: 3, height: '300px' }} >
                    <div className="webcam-container">
                        <div className={`video ${hasPhoto ? 'behind' : ''}`}>
                            <video ref={videoRef}></video>
                            <Stack sx={{ mt: '30px' }}>
                                <Button variant='outlined' onClick={takePhoto}>TAKE PHOTO</Button>
                            </Stack>
                        </div>
                        <div className={`photo ${hasPhoto ? 'active' : ''}`}>
                            <canvas ref={photoRef}></canvas>
                            <Stack sx={{ mt: '30px' }}>
                                <Button variant='contained' className='bg-black' onClick={closePhoto}>RETAKE</Button>
                            </Stack>
                        </div>
                    </div>
                </Grid>
                <TextField
                    required
                    fullWidth
                    id="photoUrl"
                    label="Last Name"
                    className='hidden'
                    autoComplete="family-name"
                    {...register("verificationPIC", {
                        required: "Please capture your photo",
                    })}
                />
                <Grid item xs={12} className='font-light text-neutral-500 mt-5' >
                    Please use your device's camera to take the photo and click on the "Take Photo" button.
                </Grid>
                <Grid item xs={12} className='font-light text-neutral-500'>
                    Make sure that your face is clearly visible in the photo.
                </Grid>
            </Grid>

        </div>
    );
}



