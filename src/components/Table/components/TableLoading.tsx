import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledBackdrop, StyledBackdropContainer } from './styles';

export const PfTableLoading = (): JSX.Element => (
  <StyledBackdrop open={true}>
    <StyledBackdropContainer>
      <CircularProgress color='inherit' />

      <Typography variant='h6' align='center' sx={{ ml: 3 }}>
        Loading data...
      </Typography>
    </StyledBackdropContainer>
  </StyledBackdrop>
);
