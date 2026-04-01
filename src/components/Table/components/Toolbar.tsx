import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';

export const PfTableToolbar = (): JSX.Element => (
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
