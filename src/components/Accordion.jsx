import React from 'react';
import { Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function FaqAccordion(props) {
    return (
            <Accordion defaultExpanded className='bg-slate-200 rounded-lg' sx = {{boxShadow:'none'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className = 'text-slate-700'>{props.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className = 'text-slate-500'>
                         {props.answer}
                    </Typography>
                </AccordionDetails>
            </Accordion>
    );
}