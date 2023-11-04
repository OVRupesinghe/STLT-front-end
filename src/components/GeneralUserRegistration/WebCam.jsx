import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';

export default function WebCam() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photoURL, setPhotoURL] = useState('');
    const getVideo = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        width: 1920,
                        height: 1080,
                    },
                })
                .then(stream => {
                    let video = videoRef.current;
                    if (video) {
                        video.srcObject = stream;
                        video.play().catch(err => {
                            console.log(err);
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

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
            localStorage.setItem('takenPhoto', blob);
            setPhotoURL(URL.createObjectURL(blob));
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
        getVideo();
    }, []);

    return (
        <div className="webcam-container">
            <div className={`video ${hasPhoto ? 'behind' : ''}`}>
                <video ref={videoRef}></video>
                <Stack sx={{ mt: '20px' }}>
                    <Button variant='outlined' onClick={takePhoto}>TAKE PHOTO</Button>
                </Stack>
            </div>
            <div className={`photo ${hasPhoto ? 'active' : ''}`}>
                <canvas ref={photoRef}></canvas>
                <Stack sx={{ mt: '20px' }}>
                    <Button variant='contained' className='bg-black' onClick={closePhoto}>RETAKE</Button>
                    <img src={photoURL} alt='takephoto' />
                </Stack>
            </div>
        </div>
    );
}
