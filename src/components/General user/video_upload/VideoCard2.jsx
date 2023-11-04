import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect } from 'react';

export default function RecipeReviewCard(props) {
  const axiosPrivate = useAxiosPrivate();
  const [video, setVideo] = React.useState(null); // [video, setVideo
  const getVideo = async () => {
    try {
      const response = await axiosPrivate.get(`upload/view-video/${props.access}`);
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

  return (
    <Card sx={{ maxWidth: 700, borderStyle: 'none', borderRadius: '10px' }}>

      <CardMedia
        component="video"
        height="auto"
        src={video}
        autoPlay
        controls
      />
    </Card>
  );
}