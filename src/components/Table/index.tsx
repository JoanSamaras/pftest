import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Input from '@mui/material/Input';
import FilterIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { fetchCharacters } from 'src/store/slices/characters/api';
import { useAppDispatch, useAppSelector, useDebounce } from 'src/hooks';
import { PfTableHead, PfTableLoading } from './components';
import { getComparator } from './utils';
import { Order } from './types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const PfTable = (): JSX.Element => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [searchName, setSearchName] = useState('');
  const [searchTvShow, setSearchTvShow] = useState('');

  const { data: rows, loading, info: paginationInfo } = useAppSelector((state) => state.characters);

  const dispatch = useAppDispatch();
  const debouncedSearchName = useDebounce(searchName, 500);
  const debouncedSearchTvShow = useDebounce(searchTvShow, 500);

  useEffect(() => {
    dispatch(fetchCharacters({}));
  }, [dispatch]);

  useEffect(() => {
    console.log('API call with:', debouncedSearchName);
    dispatch(
      fetchCharacters({
        page: page + 1,
        pageSize: rowsPerPage,
        searchName: debouncedSearchName,
        searchTvShow: debouncedSearchTvShow,
      }),
    );
  }, [debouncedSearchName, debouncedSearchTvShow, page, rowsPerPage, dispatch]);

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
    dispatch(fetchCharacters({ page: newPage + 1, pageSize: rowsPerPage }));
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(event.target.value, 10);
    setRowsPerPage(pageSize);
    setPage(0);
    dispatch(fetchCharacters({ page: 1, pageSize }));
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    paginationInfo.nextPage === null && paginationInfo.count < rowsPerPage
      ? Math.max(0, (1 + page) * rowsPerPage - rows.length)
      : 0;

  const visibleRows = useMemo(
    () => [...rows].sort(getComparator(order, orderBy)),
    [order, orderBy, page, rowsPerPage, rows],
  );

  if (loading) return <PfTableLoading />;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', pr: 4 }}>
          <FilterIcon sx={{ pr: 1, color: '#c3c3c3' }} />
          <Input
            placeholder='Search Name'
            sx={{ justifySelf: 'flex-start' }}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          {searchName.length > 0 && (
            <Tooltip title='Clear search'>
              <IconButton
                size='small'
                onClick={() => {
                  setSearchName('');
                }}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <FilterIcon sx={{ pr: 1, color: '#c3c3c3' }} />
          <Input
            placeholder='Search TV show'
            sx={{ justifySelf: 'flex-start' }}
            value={searchTvShow}
            onChange={(e) => setSearchTvShow(e.target.value)}
          />
          {searchTvShow.length > 0 && (
            <Tooltip title='Clear search'>
              <IconButton
                size='small'
                onClick={() => {
                  setSearchTvShow('');
                }}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

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
        rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
        component='div'
        count={paginationInfo.totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
