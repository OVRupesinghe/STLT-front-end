import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography } from '@mui/material'; // Step 1: Import Typography component
import sliderData from '../../data/sliderData';

export default function ImageCarousel(props) {
    return (
        <Carousel indicators = {false}>
            {sliderData.map((item, i) => <Item key={i} item={item} />)}
        </Carousel>
    );
}

function Item(props) {
    return (
        <Paper style={{ position: 'relative'}} >
            {/* Step 2: Add text element */}
            <Typography
                variant="h4"
                className='text-white'
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    fontFamily: 'Inter'
                }}
            >
               {props.item.title}
            </Typography>
            <img src={props.item.img} alt={props.item.name} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} className="brightness-50"/>
        </Paper>
    );
}
