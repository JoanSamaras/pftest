import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from 'src/hooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Order } from './types';
import { PfTableHead, PfTableLoading, PfTableToolbar } from './components';

export const PfTable = (): JSX.Element => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: rows, loading } = useAppSelector((state) => state.characters);

  const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: MouseEvent<unknown>, id: number) => {
    console.log('Row clicked with id:', id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...rows]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  if (loading) return <PfTableLoading />;

  return (
    <Box sx={{ width: '100%' }}>
      <PfTableToolbar />
      <TableContainer>
        <Table sx={{ minWidth: 750, width: '100%' }} aria-labelledby='tableTitle' size={'medium'}>
          <PfTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {visibleRows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row._id)}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
