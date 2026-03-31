import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';

const StyledCardMedia = styled(CardMedia)(() => ({
  maxHeight: 250, 
  objectPosition: '25% 75%'
}));

export { StyledCardMedia };
