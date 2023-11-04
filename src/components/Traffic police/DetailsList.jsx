import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';

export default function DetailsList(props) {


    return (
        <List sx={{ width: '100%' }}>
            {props.detailsArr.map((value) => (
                <ListItem
                    key={value}
                    disableGutters
                    secondaryAction={
                        <Typography className = 'font-medium text-neutral-400'>
                            {props.dataArr[props.detailsArr.indexOf(value)]}
                        </Typography>
                    }
                >

                    <Typography sx={{overflowWrap: 'break-word', wordBreak: 'break-word'}} className = 'font-semibold text-neutral-600'>
                        {`${value}:`}
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
}