import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { PfTableHead } from './TableHead';
import { TableContentProps } from '../types';

export const PfTableContent = ({
  order,
  orderBy,
  handleRequestSort,
  visibleRows,
  handleClick,
  emptyRows,
}: TableContentProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 750, width: '100%' }} aria-labelledby='tableTitle' size={'medium'}>
        <PfTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {visibleRows.map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row)}
                role='checkbox'
                tabIndex={-1}
                key={row._id}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  component='th'
                  id={labelId}
                  scope='row'
                  sx={{ paddingLeft: 2, backgroundColor: '#efefef', minWidth: 200 }}
                >
                  {row.name}
                </TableCell>
                <TableCell align='right' sx={{ minWidth: 150 }}>
                  {row.films.length > 0 ? (
                    <List dense={true}>
                      {row.films.map((film, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={film} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    row.films
                  )}
                </TableCell>
                <TableCell align='right' sx={{ minWidth: 150 }}>
                  {row.tvShows.length > 0 ? (
                    <List dense={true}>
                      {row.tvShows.map((show, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={show} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    row.tvShows
                  )}
                </TableCell>
                <TableCell align='right' sx={{ minWidth: 150 }}>
                  {row.allies.length > 0 ? (
                    <List dense={true}>
                      {row.allies.map((ally, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={ally} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    row.allies
                  )}
                </TableCell>
                <TableCell align='right' sx={{ minWidth: 150 }}>
                  {row.enemies.length > 0 ? (
                    <List dense={true}>
                      {row.enemies.map((enemy, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={enemy} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    row.enemies
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
