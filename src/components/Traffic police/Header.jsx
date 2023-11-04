import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileData from '../../data/profileData.js';
import Profile from '../Traffic police/ProfilePic.jsx';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import { MuiBreadcrumbs } from '../Traffic police/Breadcrumbs';
import useAuth from '../../hooks/useAuth';


export default function Header() {
    const { auth } = useAuth();
    const userName = auth.user
    const profileElements = ProfileData.map(profile => {
        return <Profile
            key={profile.id} // to remove a warning
            profile={profile}
            name = {userName}
        />
    });

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <IconButton>
                    <HelpIcon fontSize="medium" />
                </IconButton>
            </div>
            <div className="flex justify-center">
                <MuiBreadcrumbs />
            </div>
            <div className="ml-auto">
                <Typography variant="h6" component="div">
                    {profileElements}
                </Typography>
            </div>
        </div>

    );
}