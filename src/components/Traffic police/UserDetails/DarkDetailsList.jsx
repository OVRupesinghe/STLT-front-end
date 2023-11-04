import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';

export default function DarkDetailsList(props) {
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {props.detailsArr.map((value) => (
                <ListItem
                    key={value}
                    disableGutters
                    sx={{ marginBottom: '10px', /* add your margin value here */ }}
                    secondaryAction={
                        <Typography className="text-sm font-thin text-slate-300" sx={{ wordWrap: 'break-word', width: '200px' }}>
                            {props.dataArr[props.detailsArr.indexOf(value)]}
                        </Typography>
                    }
                >
                    <Typography sx={{ wordWrap: 'break-word' }} className="text-sm font-medium text-white">
                        {`${value}:`} 
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
}