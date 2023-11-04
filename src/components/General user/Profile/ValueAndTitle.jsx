import React from "react";
import { Typography, Box } from "@mui/material";

function ValueAndTitle({ value, title }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, marginBottom: 4, paddingX: 3 }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '14px' }}>{value}</Typography>
      <Typography variant="body2" sx={{ marginTop: 1, fontWeight: 'medium', color: '#6B7280', fontSize: '10px' }}>{title}</Typography>
    </Box>
  );
}

export default ValueAndTitle;

