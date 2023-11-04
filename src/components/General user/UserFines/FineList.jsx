import React ,{useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box,Tab} from "@mui/material";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import finesList from '../../data/finesList';
import finesList2 from "../../data/finesList2";
import Button from '@mui/material/Button';
import VideoPlayer from './FineVideo';
import Grid from '@mui/material/Grid';

export default function TabView() {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box className ="py-6">
            <TabContext value={value} >
                <Box sx={{borderBottom:1,borderColor:'divider'}} className="px-4">
                    <TabList onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label="Video violations" value="1"  sx={{fontWeight: 'bold'}}/>
                        <Tab label="On-spot violations" value="2"  sx={{fontWeight: 'bold'}}/>
                    </TabList>
                </Box>
                <TabPanel value="1" className="py-10">
                    <TableContainer  component={Paper} sx={{maxHeight:'900px'}}>
                        <Table aria-label="simple table" stickyHeader>
                            <TableHead >
                                <TableRow>
                                    <TableCell align="Center">Type</TableCell>
                                    <TableCell align="Center">Location</TableCell>
                                    <TableCell align="Center">Date</TableCell>
                                    <TableCell align="Center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                {
                                    finesList.map(row => (
                                        <TableRow key={row.id} sx={{'&:last-child td,&:last-cgild th':{border:0}}}>
                                            <TableCell align="Center">{row.type}</TableCell>
                                            <TableCell align="Center">{row.location}</TableCell>
                                            <TableCell align="Center">{row.date}</TableCell>
                                            <TableCell align="Center"><Button variant='contained'>View</Button></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody> */}
                            <TableBody>
                                <TableRow>
                                    <TableCell align="Center">
                                        {/* <VideoPlayer 
                                            options={{
                                                autoplay: false,
                                                controls: true,
                                                responsive: true,
                                                fluid: true,
                                                sources: [{
                                                    src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
                                                    type: 'video/mp4'
                                                }]
                                            }}
                                        /> */}
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <VideoPlayer
                                                    options={{
                                                        autoplay: false,
                                                        controls: true,
                                                        responsive: true,
                                                        fluid: true,
                                                        sources: [{
                                                            src: 'https://media.w3.org/2010//sintel/trailer_hd.mp4',
                                                            type: 'video/mp4'
                                                        }]
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell align="Center">Downtown</TableCell>
                                    <TableCell align="Center">2021-10-10</TableCell>
                                    <TableCell align="Center"><Button variant='contained'>View</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value="2" className="py-10">
                    <TableContainer  component={Paper} sx={{maxHeight:'900px'}}>
                        <Table aria-label="simple table" stickyHeader>
                            <TableHead >
                                <TableRow>
                                    <TableCell align="Center">Type</TableCell>
                                    <TableCell align="Center">Location</TableCell>
                                    <TableCell align="Center">Date</TableCell>
                                    <TableCell align="Center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    finesList2.map(row => (
                                        <TableRow key={row.id} sx={{'&:last-child td,&:last-cgild th':{border:0}}}>
                                            <TableCell align="Center">{row.type}</TableCell>
                                            <TableCell align="Center">{row.location}</TableCell>
                                            <TableCell align="Center">{row.date}</TableCell>
                                            <TableCell align="Center"><Button variant='contained'>View</Button></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </TabContext>
        </Box>
    )
}
