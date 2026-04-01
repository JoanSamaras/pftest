import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const StyledBackdrop = styled(Backdrop)(() => ({
  color: '#515151',
  zIndex: 10,
  display: 'flex',
  position: 'relative',
  padding: '15% 0',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
}));

const StyledBackdropContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

export { StyledBackdrop, StyledBackdropContainer };
