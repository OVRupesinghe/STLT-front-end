import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import BasicCard from './PreviousOffenceCard';
import useDetailsContext from '../../../hooks/useDetailsContext';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
];

export default function StickyHeadTable() {

  const { previousOffences } = useDetailsContext();
  console.log(previousOffences);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
      <TableContainer sx={{ maxHeight: 570 }}>
        <TableBody>
          {previousOffences.map((offence, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {/* Assuming columns is an array of column IDs */}
                <BasicCard data={offence} />
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Paper>
  );
}