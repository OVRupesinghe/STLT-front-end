import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

const Timer = () => {
  const [seconds, setSeconds] = useState(180);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (seconds > 0) {
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setExpired(true);
    } else {
      setExpired(false);
    }
  }, [seconds]);

  // Format the seconds into "mm:ss" string
  const formattedTime = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <>
      {expired ? (
                    <Grid item>
                    OTP expired:
                        <Link href="#" className='ml-1 mr-1' >
                             Resend
                        </Link>

                    </Grid>
      ) : (
        <Typography component="h1" variant="subtitle1" className="mb-5 font-light text-neutral-700">
        Enter OTP code : (expires in {formattedTime})
        </Typography>
      )}
    </>
  );
};

export default Timer;
