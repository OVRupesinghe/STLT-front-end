import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FinePrintCard from "../../components/Traffic police/FinePrint/FinePrintCard";
import TransitionAlerts from "../../components/Traffic police/FinePrint/SnackBar.jsx";
import "@fontsource/inter";
import { useTheme } from "@emotion/react";

export default function FinePrint() {
  const theme = useTheme();
  return (
    <>
      <Box>
        <TransitionAlerts/>
      </Box>
      <Box sx={{ marginTop: "20px"}}>
        <Stack direction="row" justifyContent='center' >
          <Grid container sx = {{width:'50%',[theme.breakpoints.down('sm')]: {width: '100%' }}}>
            <FinePrintCard/>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}
