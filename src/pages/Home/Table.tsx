import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useAppSelector } from 'src/hooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

type HeadCell = {
    id: number;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
    description: string;
};

const headCells: readonly HeadCell[] = [
    {
        id: 0,
        label: 'name',
        numeric: false,
        disablePadding: true,
        description: 'Character Name',
    },
    {
        id: 1,
        label: 'tvShows',
        numeric: false,
        disablePadding: false,
        description: 'TV Shows the character has appeared in',
    },
    {
        id: 2,
        label: 'videoGames',
        numeric: false,
        disablePadding: false,
        description: 'Video Games the character has appeared in',
    },
    {
        id: 3,
        label: 'alies',
        numeric: true,
        disablePadding: false,
        description: 'Alies',
    },
    {
        id: 4,
        label: 'enemies',
        numeric: true,
        disablePadding: false,
        description: 'Enemies',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
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
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar() {
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
            ]}
        >
            <Tooltip title='Filter list'>
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}
export default function EnhancedTable() {
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

    if (loading)
        return (
            <Backdrop
                sx={{
                    color: '#515151',
                    zIndex: 10,
                    display: 'flex',
                    position: 'relative',
                    padding: '15% 0',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}
                open={true}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress color='inherit' />
                    <Typography variant='h6' align='center' sx={{ ml: 3 }}>
                        Loading data...
                    </Typography>
                </Container>
            </Backdrop>
        );

    return (
        <Box sx={{ width: '100%' }}>
            <EnhancedTableToolbar />
            <TableContainer>
                <Table sx={{ minWidth: 750, width: '100%' }} aria-labelledby='tableTitle' size={'medium'}>
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
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
}
