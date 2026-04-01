import { MouseEvent } from 'react';
import { Character } from 'src/store/slices';

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

type TableFilterProps = {
  searchName: string;
  setSearchName: (value: string) => void;
  searchTvShow: string;
  setSearchTvShow: (value: string) => void;
};

type TableContentProps = {
  visibleRows: any[];
  order: Order;
  orderBy: string;
  emptyRows: number;
  page: number;
  handleRequestSort: (event: MouseEvent<unknown>, property: string) => void;
  handleClick: (event: MouseEvent<unknown>, row: Character) => void;
};

export type { Order, HeadCell, TableProps, TableFilterProps, TableContentProps };
