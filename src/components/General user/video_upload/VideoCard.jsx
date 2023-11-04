import React from "react";
import { Card, Typography, Box } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import violationImage from './violation.jpg'

export default function VideoCard({vidName, vidPreview}) {
  return (
    <Card sx={{ display: "flex", backgroundColor:"transparent", border: "none", boxShadow:"none" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={violationImage}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
            {vidName}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}