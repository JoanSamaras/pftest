import { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { TableProps } from '../types';
import { headCells } from '../constants';

export const PfTableHead = (props: TableProps): JSX.Element => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.label ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.label}
                direction={orderBy === headCell.label ? order : 'asc'}
                onClick={createSortHandler(headCell.label)}
              >
                {headCell.description}
                {orderBy === headCell.label ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.description
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
