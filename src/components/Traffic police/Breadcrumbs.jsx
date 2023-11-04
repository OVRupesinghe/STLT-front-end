import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


export const MuiBreadcrumbs = () => {
    return (
        <Box m={2}>
            <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='small'/>}>
                <Typography fontSize={20} color='text.primary'>Home</Typography>
                <Typography fontSize={20} color='text.primary'>User Details</Typography>
                
                
            </Breadcrumbs>
        </Box>
    )
}