import React ,{useState} from "react";
import {Box,Tab, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';


export default function TabView() {
    return (
        <Box className ="py-6">
            <Typography variant="h5"  className="p-5" sx={{fontWeight: 'bold'}}>
                TicketID
            </Typography>
            <Grid container spacing={2} className="p-6">
                <Grid item xs={12}>
                    <Box boxShadow={3} className ="p-4">
                        <Grid container>
                            <Grid item xs={9}>
                                <Typography variant="h6" component="div">
                                    Running through a red light
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6" component="div" className="text-right">
                                    Rs 500
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box boxShadow={3} className ="p-4">
                        <Typography variant="h6" component="div">
                            Running through a red light
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box boxShadow={3} className ="p-4">
                        <Typography variant="h6" component="div">
                            Running through a red light
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
