import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomeIcon, UserCircleIcon, BellIcon, PresentationChartLineIcon, InformationCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import useLogout from '../../hooks/useLogout';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(10)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(10)} + 1px)`,
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),

    }),
);



export default function Sidebar() {
    const darkTheme = createTheme({
        components: {
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        background: "#020617",
                        color: "#fff",
                        boxShadow: "46px 5px 36px -36px rgba(0,0,0,0.1)",
                        padding: "10px 10px"

                    }
                }
            }

        }
    });

    const Navigate = useNavigate();


    const logout = useLogout();

    const signOut = async () => {
        await logout();
        Navigate('/login');
    }

    const location = useLocation();

    const isActiveRoute = (route) => {
        return location.pathname === route;
    };
    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        if (open === false) {
            setOpen(true);
        } else {
            setOpen(false);
        }

    };



    const icons = [
        {
            active: <HomeIcon className="h-6 w-6 text-slate-950" />,
            inactive: <HomeIcon className="h-6 w-6 text-slate-400" />,
        },
        {
            active: <UserCircleIcon className="h-6 w-6 text-slate-950" />,
            inactive: <UserCircleIcon className="h-6 w-6 text-slate-400" />,
        },
        {
            active: <BellIcon className="h-6 w-6 text-slate-950" />,
            inactive: <BellIcon className="h-6 w-6 text-slate-400" />,
        },
        {
            active: <PresentationChartLineIcon className="h-6 w-6 text-slate-950" />,
            inactive: <PresentationChartLineIcon className="h-6 w-6 text-slate-400" />,
        },
        {
            active: <InformationCircleIcon className="h-6 w-6 text-slate-950" />,
            inactive: <InformationCircleIcon className="h-6 w-6 text-slate-400" />,
        },
        {
            active: <ArrowLeftOnRectangleIcon className="h-6 w-6 text-slate-950" />,
            inactive: <ArrowLeftOnRectangleIcon className="h-6 w-6 text-slate-400" />,
        }

    ];

    const routes = ['/traffic-police/', '/traffic-police/profile', '/traffic-police/notifications', '/traffic-police/statistics', '/traffic-police/information'];

    return (

        <ThemeProvider theme={darkTheme}>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Box p={3} width='250px' textAlign='center' role='presentation'>
                        <Typography variant='h6' component='div'>CopSco</Typography>
                    </Box>
                    <IconButton onClick={handleDrawerOpen}>
                        <MenuIcon className=' text-slate-400' />
                    </IconButton>

                </DrawerHeader>
                <Divider />
                <List sx={{ height: '50%' }} className='flex flex-col justify-between'>
                    {['Home', 'Profile', 'Notifications', 'Analytics', 'Information', 'Log out'].map((text, index) => {
                        const route = routes[index];
                        const isActive = isActiveRoute(route);
                        if (index === 5) {
                            return (
                                <ListItem key={text} disablePadding sx={{ display: 'block' }} className={isActive ? 'text-slate-950 bg-slate-400 rounded-lg' : ' text-slate-400 hover:bg-slate-600 rounded-lg'}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                        onClick={signOut}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >

                                            {isActive ? icons[index].active : icons[index].inactive}

                                        </ListItemIcon>
                                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        } else {
                            return (
                                <Link to={routes[index]}>
                                    <ListItem key={text} disablePadding sx={{ display: 'block' }} className={isActive ? 'text-slate-950 bg-slate-400 rounded-lg' : ' text-slate-400 hover:bg-slate-600 rounded-lg'}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <Link to={routes[index]}><ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >

                                                {isActive ? icons[index].active : icons[index].inactive}

                                            </ListItemIcon></Link>
                                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            );
                        }
                    })}
                </List>
            </Drawer>
        </ThemeProvider>

    );
}

