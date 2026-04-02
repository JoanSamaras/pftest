import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilterIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { TableFilterProps } from '../types';

export const PfTableFilters = ({
    searchName,
    setSearchName,
    searchTvShow,
    setSearchTvShow,
}: TableFilterProps) => (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', pr: 4 }}>
            <FilterIcon sx={{ pr: 1, color: '#c3c3c3' }} />
            <Input
                placeholder='Search Name'
                sx={{ justifySelf: 'flex-start' }}
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                data-testid="search-name-input"
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
                data-testid="search-tv-show-input"
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
);
