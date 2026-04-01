import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import { fetchCharacters } from 'src/store/slices/characters/api';
import { useAppDispatch, useAppSelector, useDebounce } from 'src/hooks';
import { PfTableContent, PfTableFilters, PfTableLoading } from './components';
import { getComparator } from './utils';
import { Order } from './types';
import { Character, openModal } from 'src/store/slices';

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

  const handleClick = (event: MouseEvent<unknown>, row: Character) => {
    dispatch(openModal(row));
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

  return (
    <Box sx={{ width: '100%' }}>
      <PfTableFilters
        searchName={searchName}
        setSearchName={setSearchName}
        searchTvShow={searchTvShow}
        setSearchTvShow={setSearchTvShow}
      />

      {loading ? (
        <PfTableLoading />
      ) : (
        <>
          <PfTableContent
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
            visibleRows={visibleRows}
            handleClick={handleClick}
            emptyRows={emptyRows}
            page={page}
          />

          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
            component='div'
            count={paginationInfo.totalPages * rowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};
