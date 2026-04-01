import { HeadCell } from './types';

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

export { headCells };
