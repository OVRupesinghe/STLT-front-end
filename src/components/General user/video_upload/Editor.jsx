import React from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { Grid } from '@mui/material';
import useFormContext from '../../../hooks/useFormContext';
import Stack from '@mui/material/Stack';
import { useRef } from 'react';
import { useEffect } from 'react';


const Editor = ({ open, onClose }) => {

  const { videoUrl, videoDuration, startTime, setStartTime, endTime, setEndTime } = useFormContext();
  const videoRef = useRef(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.currentTime >= endTime) {
        videoRef.current.currentTime = startTime;
      }
    };

    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        videoRef.current.pause();
      }
    };
  }, [startTime, endTime]);



  const handleSliderChange = (event, newValue) => {
    setStartTime(newValue[0]);
    setEndTime(newValue[1]);
  };


  return (
    <div className='px-10 py-3 ' style={{ height: '50vh' }}>
      <Stack direction='column' gap={7}>
        <video ref={videoRef} controls width="100%" height="auto">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Stack direction='column' gap={4}>
          <Grid container className='flex flex-row justify-between my-6' spacing={4}>
            <Grid item xs={6}>
              <TextField
                label="Starts-at (in seconds)"
                type="number"
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Ends-at (in seconds)"
                type="number"
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
                fullWidth
                size='small'
              />
            </Grid>
          </Grid>

          <Slider
            getAriaLabel={() => 'Minimum distance'}
            disableSwap
            value={[startTime, endTime]}
            onChange={handleSliderChange}
            min={0}
            max={videoDuration} // Set this based on the duration of your video
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} sec`}
            // Customize the track and thumb styles using the sx prop
            sx={{
              '& .MuiSlider-rail': {
                height: 40,
                backgroundColor: '#d6d6d6',
              },
              '& .MuiSlider-track': {
                height: 40, // Change the track height here
                backgroundColor: 'white', // Change the track color
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 10, // Change the thumb width
                height: 45, // Change the thumb height
                backgroundColor: '#8E8E8E', // Change the thumb color
                borderRadius: '0',
              },
              '& .MuiSlider-mark': {
                backgroundColor: '#f44336', // Change the marker color
              },
              '& .MuiSlider-markActive': {
                backgroundColor: '#ff5722', // Change the active marker color
              },
              width : '93%',
              margin : 'auto'
            }}
          />
        </Stack>
      </Stack>

    </div>
  );
};

export default Editor;

