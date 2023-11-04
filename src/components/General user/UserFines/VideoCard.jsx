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
        sx={{ width: "200px", borderRadius:"10px"}}
        image={violationImage}
        alt="Live from space album cover"
      />
    </Card>
  );
}