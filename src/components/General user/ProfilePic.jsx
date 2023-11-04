import React from 'react';
import { Typography, Stack } from '@mui/material';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Notifications from './Notifications';

export default function Profile(props) {

    return (
        <Stack direction='row' alignItems='center' margin>
            <div className="ml-auto flex items-center">
                <HelpOutlineOutlinedIcon className="mr-4" />
                <Notifications />
            </div>
            <div className='px-5'>
                <Typography variant='subtitle1'>Mr. {props.name}</Typography>
            </div>
            <div className="ml-auto flex items-center">             
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{props.name[0]}</Avatar>
            </div>
        </Stack>

    )
}