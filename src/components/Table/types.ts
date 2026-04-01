import { MouseEvent } from 'react';

type Order = 'asc' | 'desc';

type HeadCell = {
  id: number;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
  description: string;
  sortable: boolean;
};

type TableProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
};

export type { Order, HeadCell, TableProps };
