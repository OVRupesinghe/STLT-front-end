import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import video1 from './video1.mp4';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}


export default function RecipeReviewCard(props) {
  const axiosPrivate = useAxiosPrivate();
  const values = props.data;
  const [video, setVideo] = React.useState(null); // [video, setVideo
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    }
  });
  const getVideo = async () => {
    try {
      const response = await axiosPrivate.get(`upload/view-video/${values.videokey}`);
      setVideo(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    console.log(video); // Log the updated video value when it changes
  }, [video]);

  console.log(props.data);
 
  const keyValuePairs = [
    { key: 'Due Date', value: formatDate(values.due_date) },
    { key: 'Vehicle No.', value: values.vehicle_number },
    { key: 'Police Division', value: values.location },
    { key: 'Amount', value: 'Rs.' + values.amount },
    { key: 'Demerit Points', value: values.demerit_points + ' points' }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '15px' }}>
        <CardMedia
          component="video"
          height="194"
          src={video}
          controls
        />
        <CardContent>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            {keyValuePairs.map((pair, index) => (
              <>
                <Grid item xs={12} sm={6} key={index} >
                  <Typography variant='subtitle1' sx = {{marginLeft:'30px'}}>
                    {pair.key}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} key={index}>
                  <Typography variant='subtitle1' sx = {{marginLeft:'30px'}}>
                    {pair.value}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}