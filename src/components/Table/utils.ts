import { Order } from './types';

const descendingComparator: <T>(a: T, b: T, orderBy: keyof T) => number = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = <Key extends keyof any>(order: Order, orderBy: Key) =>
  order === 'desc'
    ? (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) =>
        descendingComparator(a, b, orderBy)
    : (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) =>
        -descendingComparator(a, b, orderBy);

export { getComparator, descendingComparator };
